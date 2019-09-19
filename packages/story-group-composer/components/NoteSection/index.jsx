import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '@bufferapp/ui';
import { grayDarker, grayLight, gray } from '@bufferapp/ui/style/colors';
import { fontFamily, fontSize, fontWeightMedium } from '@bufferapp/ui/style/fonts';
import { borderRadius } from '@bufferapp/ui/style/borders';

const Title = styled(Text)`
  margin: 0 0 8px;
  font-weight: ${fontWeightMedium};
`;

// Change textarea with BDS textarea when complete
const TextAreaWrapper = styled.div`
  position: relative;
  flex: 1;
  padding: 16px 16px 52px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${grayLight};
  border-radius: ${borderRadius};
`;

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

const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 16px;
`;

const SubtextWrapper = styled.span`
  color: ${gray};
  margin: 8px 0px;
  font-size: ${fontSize};
`;

const NoteSection = ({ note, setNote, translations }) => (
  <Fragment>
    <NoteWrapper>
      <Title type="p">Note</Title>
      <TextAreaWrapper>
        <textarea
          style={textareaStyle}
          maxLength="2000"
          type="input"
          value={note}
          onChange={setNote}
          placeholder={translations.notePlaceholder}
          autoFocus
        />
      </TextAreaWrapper>
      <SubtextWrapper>
        <Text>
          {translations.noteSubText}
        </Text>
      </SubtextWrapper>
    </NoteWrapper>
  </Fragment>
);

NoteSection.propTypes = {
  note: PropTypes.string,
  setNote: PropTypes.func.isRequired,
  translations: PropTypes.shape({
    notePlaceholder: PropTypes.string,
    noteSubText: PropTypes.string,
  }).isRequired,
};

NoteSection.defaultProps = {
  note: '',
};

export default NoteSection;
