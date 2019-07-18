import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Tooltip } from '@bufferapp/ui';
import { grayLight, redLight, red, grayDark, boxShadow, blue } from '@bufferapp/ui/style/colors';
import { fontFamily, fontSize } from '@bufferapp/ui/style/fonts';
import { borderRadius } from '@bufferapp/ui/style/borders';
import Input from '@bufferapp/ui/Input';
import countHashtagsInText from '../../utils/HashtagCounter';

const wrapperStyle = {
  margin: '0 16px',
};

const buttonStyle = {
  display: 'flex',
  alignSelf: 'flex-end',
  margin: '0 16px',
};

const textareaStyle = {
  resize: 'none',
  outline: 'none',
  borderRadius,
  fontSize,
  lineHeight: '20px',
  fontFamily,
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
  border: `1px solid ${grayLight}`,
  borderRadius,
};

const textareaWrapperFocusStyle = {
  boxShadow: `0px 0px 0px 3px ${boxShadow}`,
  border: `1px solid ${blue}`,
};

const getTextareaWrapperStyle = ({ state }) => {
  let style = textareaWrapperStyle;
  if (state.focus) {
    style = { ...style, ...textareaWrapperFocusStyle };
  }
  return style;
};

const counterLabelStyle = hasError => ({
  position: 'absolute',
  right: '16px',
  bottom: '16px',
  fontSize: '10px',
  lineHeight: '12px',
  textAlign: 'center',
  background: hasError ? redLight : grayLight,
  color: hasError ? red : grayDark,
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
        <div style={wrapperStyle}>
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
            <div style={getTextareaWrapperStyle({ state: this.state })}>
              <textarea
                style={textareaStyle}
                placeholder="Your hashtags"
                id="hashtagGroupContent"
                name="hashtagGroupContent"
                value={this.state.textareaValue}
                onChange={this.handleTextareaChange}
                onFocus={() => this.setState({ focus: true })}
                onBlur={() => this.setState({ focus: false })}
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
