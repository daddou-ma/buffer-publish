import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Tooltip } from '@bufferapp/ui';
import Input from '@bufferapp/ui/Input';
import countHashtagsInText from '../../utils/HashtagCounter';

const buttonStyle = {
  display: 'flex',
  alignSelf: 'flex-end',
};

const textareaStyle = {
  resize: 'none',
  outline: 'none',
  borderRadius: '4px',
  fontSize: '14px',
  lineHeight: '20px',
  fontFamily: 'Roboto',
  width: '100%',
  boxSizing: 'border-box',
  border: 'none',
  height: '270px',
  padding: '0 16px',
};

const textareaLabelStyle = {
  margin: '16px 0 8px',
};

const textareaWrapperStyle = {
  position: 'relative',
  overflow: 'auto',
  padding: '16px 0 52px',
  width: '100%',
  boxSizing: 'border-box',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
};

const counterLabelStyle = hasError => ({
  position: 'absolute',
  right: '16px',
  bottom: '16px',
  fontSize: '10px',
  lineHeight: '12px',
  textAlign: 'center',
  background: hasError ? '#FDF2F4' : '#E0E0E0',
  color: hasError ? '#9D2637' : '#636363',
  borderRadius: '2px',
  padding: '4px',
});

const HASHTAG_LIMIT = 30;

class HashtagGroupCreator extends Component {
  state = {
    textareaValue: '',
    inputValue: '',
    numberHashtagsLeft: HASHTAG_LIMIT,
    isSaveButtonDisabled: true,
  }

  handleTextareaChange = (event) => {
    const value = event.target.value;
    this.setState({
      textareaValue: value,
      numberHashtagsLeft: HASHTAG_LIMIT - countHashtagsInText(value),
    }, this.disableSaveButton);
  }

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    }, this.disableSaveButton);
  }

  disableSaveButton = () => {
    const { numberHashtagsLeft, textareaValue, inputValue } = this.state;
    const isSaveButtonDisabled = numberHashtagsLeft < 0 ||
      !textareaValue.trim() ||
      !inputValue.trim();
    this.setState({ isSaveButtonDisabled });
  }

  handleSubmit = () => {
    const { onSaveHashtagGroup } = this.props;
    const { inputValue, textareaValue } = this.state;
    if (onSaveHashtagGroup) {
      onSaveHashtagGroup({ inputValue, textareaValue });
    }
  }

  render() {
    const {
      onCancelHashtagGroup,
    } = this.props;

    return (
      <Fragment>
        <div>
          <Text type="h3">Create Hashtag Group</Text>
          <div>
            <Input
              onChange={this.handleInputChange}
              name="hashtagGroupName"
              label="Hashtag Group Name"
              placeholder="Your hashtag group name"
              size="tall"
            />
            <div style={textareaLabelStyle}>
              <Text
                htmlFor="hashtagGroupContent"
                type="label"
              >
                Hashtag Group Content
              </Text>
            </div>
            <div style={textareaWrapperStyle}>
              <textarea
                style={textareaStyle}
                placeholder="Your hashtags"
                id="hashtagGroupContent"
                name="hashtagGroupContent"
                value={this.state.textareaValue}
                onChange={this.handleTextareaChange}
              />
              <div style={counterLabelStyle(this.state.numberHashtagsLeft < 0)}>
                <Tooltip
                  label="Instagram will reject posts containing over 30 hashtags"
                  position="top"
                >
                  <Text># Remaining: {this.state.numberHashtagsLeft}</Text>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div style={buttonStyle}>
          <Button
            type="text"
            label="Cancel"
            onClick={onCancelHashtagGroup}
          />
          <Button
            type="secondary"
            label="Save Hashtag Group"
            disabled={this.state.isSaveButtonDisabled}
            onClick={this.handleSubmit}
          />
        </div>
      </Fragment>
    );
  }
}

HashtagGroupCreator.propTypes = {
  onCancelHashtagGroup: PropTypes.func.isRequired,
  onSaveHashtagGroup: PropTypes.func.isRequired,
};

export default HashtagGroupCreator;
