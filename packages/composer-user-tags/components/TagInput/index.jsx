import React, { Fragment, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@bufferapp/ui';
import Input from '@bufferapp/ui/Input';

import { ButtonWrapper, MaxCount } from './style';

const TagInput = (
  {
    translations,
    inputValue,
    setInputValue,
    disabled,
    inputDisabled,
    cancel,
    addTag,
    reachedMaxLimit,
    error,
  },
  ref
) => {
  /**
   * This strange looking `ref / useImperativeHandle` stuff just makes it so that the
   * parent component can get a ref on this TagInput component and call `ref.current.focus()` on it.
   * https://reactjs.org/docs/hooks-reference.html#useimperativehandle
   */
  const inputEl = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputEl.current) {
        inputEl.current.focus();
      }
    },
    blur: () => {
      if (inputEl.current) {
        inputEl.current.blur();
      }
    },
  }));

  if (reachedMaxLimit) {
    return (
      <MaxCount>
        <Text>{translations.maxLimitText}</Text>
      </MaxCount>
    );
  }
  return (
    <Fragment>
      <Input
        type="input"
        onChange={e => {
          setInputValue(e.target.value);
        }}
        value={inputValue}
        name="tagInput"
        label={translations.inputLabel}
        prefix={{ text: '@', paddingLeft: '25px' }}
        ref={inputEl}
        disabled={inputDisabled}
        help={error && translations.usernameError}
        hasError={error}
      />
      <ButtonWrapper>
        <Button
          type="primary"
          size="small"
          onClick={addTag}
          label={translations.inputBtnAddTag}
          disabled={disabled}
        />
        <Button
          type="text"
          size="small"
          onClick={cancel}
          label={translations.inputBtnCancel}
        />
      </ButtonWrapper>
    </Fragment>
  );
};

TagInput.propTypes = {
  inputRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  translations: PropTypes.shape({
    placeholder: PropTypes.string,
    inputLabel: PropTypes.string,
    inputBtnAddTag: PropTypes.string,
    inputBtnCancel: PropTypes.string,
    maxLimitText: PropTypes.string,
    usernameError: PropTypes.string,
  }).isRequired,
  reachedMaxLimit: PropTypes.bool.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  inputDisabled: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default React.forwardRef(TagInput);
