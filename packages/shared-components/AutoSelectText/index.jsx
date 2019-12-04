import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from '@bufferapp/components';

class AutoSelectText extends Component {
  constructor() {
    super();
    this.textRef = React.createRef();
  }

  handleClick() {
    // select all text
    window.getSelection().selectAllChildren(this.textRef.current);
    // copy the text to the clipboard
    if (this.props.copyToClipboard) {
      document.execCommand('copy');
    }
    // trigger a function to indicate text has been selected
    if (this.props.onSelect) {
      this.props.onSelect(this.textRef.current.innerText);
    }
  }

  render() {
    return (
      <Button onClick={() => this.handleClick()} noStyle fillContainer>
        <Card color={'off-white'} noPadding>
          <div
            style={{
              padding: '1rem',
            }}
          >
            <code
              style={{
                fontSize: '16px',
                userSelect: 'all',
                fontWeight: 'bold',
              }}
              ref={this.textRef}
            >
              {this.props.children}
            </code>
          </div>
        </Card>
      </Button>
    );
  }
}

AutoSelectText.propTypes = {
  children: PropTypes.string,
  copyToClipboard: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default AutoSelectText;
