import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@bufferapp/ui';
import Input from '@bufferapp/ui/Input';

import { ButtonWrapper, MaxCount } from './style';

const TagInput = ({
  translations,
  inputValue,
  setInputValue,
  disabled,
  addTag,
  reachedMaxLimit,
}) => {
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
        placeholder={translations.placeholder}
        value={inputValue}
        name="tagInput"
        label={translations.inputLabel}
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
};

export default TagInput;
