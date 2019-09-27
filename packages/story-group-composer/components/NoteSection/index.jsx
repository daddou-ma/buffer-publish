import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, TextArea } from '@bufferapp/ui';
import { gray } from '@bufferapp/ui/style/colors';
import { fontSize } from '@bufferapp/ui/style/fonts';

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
      <TextArea
        label="Note"
        maxLength="2000"
        value={note}
        placeholder={translations.notePlaceholder}
        onChange={setNote}
        id="noteText"
        fullHeight
        autoFocus
      />
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
