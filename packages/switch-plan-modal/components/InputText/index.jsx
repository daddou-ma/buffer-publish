import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '@bufferapp/ui';
import { fontFamily, fontSize } from '@bufferapp/ui/style/fonts';

import { borderRadius } from '@bufferapp/ui/style/borders';
import { redDark, blue, gray } from '@bufferapp/ui/style/colors';

export const ExtraSmallText = styled(Text)`
  font-size: 0.5rem;
`;

const formLabelStyle = {
  display: 'block',
  padding: '0 0 0.25rem 0',
};

const ERROR = 'Required field';

const getBorderColor = (focused, hasError) => {
  if (focused) return blue;
  if (hasError) return redDark;

  return gray;
};

const getInputStyle = (focused, hasError, backgroundStyle) => ({
  fontFamily,
  fontSize,
  padding: '0.5rem',
  borderRadius,
  border: `1px solid ${getBorderColor(focused, hasError)}`,
  width: '100%',
  boxSizing: 'border-box',
  outline: 0,
  background: backgroundStyle || '#fff',
});

class InputText extends React.Component {
  constructor() {
    super();
    this.state = {
      focused: false,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  render() {
    const { focused } = this.state;
    const {
      id,
      label,
      autoComplete,
      note,
      backgroundStyle,
      store,
      hasError,
    } = this.props;

    return (
      <div>
        <label htmlFor={id} style={formLabelStyle}>
          <Text type="label">{label}</Text>
        </label>
        <input
          id={id}
          type="text"
          style={getInputStyle(focused, hasError, backgroundStyle)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoComplete={autoComplete}
          onKeyUp={ev => store(id, ev.target.value.trim())}
        />
        {note && <ExtraSmallText type="label">{note}</ExtraSmallText>}
        {hasError && (
          <div>
            <Text hasError type="help">
              {ERROR}
            </Text>
          </div>
        )}
      </div>
    );
  }
}

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  note: PropTypes.string,
  backgroundStyle: PropTypes.string,
  store: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
};

InputText.defaultProps = {
  autoComplete: 'off',
  note: null,
  backgroundStyle: null,
  hasError: false,
};

export default InputText;
