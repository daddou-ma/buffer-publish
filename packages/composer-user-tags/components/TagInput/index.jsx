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
    addTag,
    reachedMaxLimit,
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
      />
      <ButtonWrapper>
        <Button
          type="primary"
          size="small"
          onClick={addTag}
          label={translations.inputBtnLabel}
          disabled={disabled}
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
    inputBtnLabel: PropTypes.string,
    maxLimitText: PropTypes.string,
  }).isRequired,
  reachedMaxLimit: PropTypes.bool.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  inputDisabled: PropTypes.bool.isRequired,
};

export default React.forwardRef(TagInput);
