import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Tooltip } from '@bufferapp/ui';
import {
  grayLight,
  redLight,
  red,
  grayDark,
  boxShadow,
  blue,
  grayDarker,
} from '@bufferapp/ui/style/colors';
import { fontFamily, fontSize, lineHeight } from '@bufferapp/ui/style/fonts';
import { borderRadius } from '@bufferapp/ui/style/borders';
import countHashtagsInText from '../../utils/HashtagCounter';

const buttonStyle = {
  display: 'flex',
  alignSelf: 'flex-end',
  margin: '0 16px',
};

const cancelButtonStyle = {
  margin: '0 10px',
};

const headerStyle = {
  margin: '0 16px',
};

const contentStyle = {
  margin: '0 16px 16px',
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
};

const textareaStyle = {
  resize: 'none',
  outline: 'none',
  fontSize,
  lineHeight: '20px',
  fontFamily,
  width: '100%',
  height: '100%',
  color: grayDarker,
  border: 'none',
};

const labelStyle = {
  margin: '16px 0 8px',
};

const inputLabelStyle = {
  margin: '0 0 8px',
};

const textareaWrapperStyle = {
  position: 'relative',
  flex: 1,
  padding: '16px 16px 52px',
  width: '100%',
  boxSizing: 'border-box',
  border: `1px solid ${grayLight}`,
  borderRadius,
};

const textareaWrapperFocusedStyle = {
  boxShadow: `0px 0px 0px 3px ${boxShadow}`,
  border: `1px solid ${blue}`,
};

const inputStyle = {
  color: grayDarker,
  padding: '13px 16px 12px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  border: `1px solid ${grayLight}`,
  margin: '8px 0px',
  borderRadius,
  fontSize,
  lineHeight,
  fontFamily,
};

const inputFocusedStyle = {
  boxShadow: `0px 0px 0px 3px ${boxShadow}`,
  border: `1px solid ${blue}`,
};

const getElementStyle = ({ state }, type) => {
  let style;
  let focusedStyle;
  let focusedState;
  switch (type) {
    case 'textareaWrapper':
      style = textareaWrapperStyle;
      focusedStyle = textareaWrapperFocusedStyle;
      focusedState = state.textareaFocused;
      break;
    case 'input':
      style = inputStyle;
      focusedStyle = inputFocusedStyle;
      focusedState = state.inputFocused;
      break;
    default:
      break;
  }

  if (focusedState) {
    style = { ...style, ...focusedStyle };
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
    textareaFocused: false,
    inputFocused: false,
    numberHashtagsLeft: HASHTAG_LIMIT,
    isSaveButtonDisabled: true,
  };

  constructor() {
    super();

    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.disableSaveButton = this.disableSaveButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.name !== this.props.name ||
      prevProps.text !== this.props.text
    ) {
      this.disableSaveButton();
    }
  }

  handleTextareaChange(event) {
    const value = event.target.value;
    this.setState({
      numberHashtagsLeft: HASHTAG_LIMIT - countHashtagsInText(value),
    });

    this.props.onChangeGroupText(value);
  }

  handleInputChange(event) {
    this.props.onChangeGroupName(event.target.value);
  }

  disableSaveButton() {
    const { numberHashtagsLeft } = this.state;
    const { name, text } = this.props;
    const isSaveButtonDisabled =
      numberHashtagsLeft < 0 || !text.trim() || !name.trim();
    this.setState({ isSaveButtonDisabled });
  }

  handleSubmit() {
    const { onSaveHashtagGroup, onCancelHashtagGroup } = this.props;
    if (onSaveHashtagGroup) {
      onSaveHashtagGroup();
    }
    onCancelHashtagGroup();
  }

  render() {
    const { name, text, onCancelHashtagGroup } = this.props;

    return (
      <Fragment>
        <div style={headerStyle}>
          <Text type="h3">Create Hashtag Group</Text>
        </div>
        <form style={contentStyle} autoComplete="off">
          <div>
            <div style={inputLabelStyle}>
              <Text htmlFor="hashtagGroupName" type="label">
                Hashtag Group Name
              </Text>
            </div>
            <input
              style={getElementStyle({ state: this.state }, 'input')}
              placeholder="Your hashtag group name"
              id="hashtagGroupName"
              maxLength="200"
              type="text"
              value={name}
              onChange={this.handleInputChange}
              onFocus={() => this.setState({ inputFocused: true })}
              onBlur={() => this.setState({ inputFocused: false })}
            />
            <div style={labelStyle}>
              <Text htmlFor="hashtagGroupContent" type="label">
                Hashtag Group Content
              </Text>
            </div>
          </div>
          <div
            style={getElementStyle({ state: this.state }, 'textareaWrapper')}
          >
            <textarea
              style={textareaStyle}
              placeholder="Your hashtags"
              id="hashtagGroupContent"
              maxLength="2000"
              value={text}
              onChange={this.handleTextareaChange}
              onFocus={() => this.setState({ textareaFocused: true })}
              onBlur={() => this.setState({ textareaFocused: false })}
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
        </form>
        <div style={buttonStyle}>
          <span style={cancelButtonStyle}>
            <Button type="text" label="Cancel" onClick={onCancelHashtagGroup} />
          </span>
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
  name: PropTypes.func.string,
  text: PropTypes.func.string,
  onChangeGroupName: PropTypes.func.isRequired,
  onChangeGroupText: PropTypes.func.isRequired,
  onCancelHashtagGroup: PropTypes.func.isRequired,
  onSaveHashtagGroup: PropTypes.func.isRequired,
};

HashtagGroupCreator.defaultProps = {
  name: null,
  text: null,
};

export default HashtagGroupCreator;
