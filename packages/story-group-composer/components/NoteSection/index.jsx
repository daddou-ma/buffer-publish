import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, TextArea } from '@bufferapp/ui';
import { translationsPropTypes } from '../../utils/commonPropTypes';

const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 16px;
`;

const Subtext = styled(Text)`
  margin: 8px 0px;
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
      <Subtext type="p">{translations.noteSubText}</Subtext>
    </NoteWrapper>
  </Fragment>
);

NoteSection.propTypes = {
  note: PropTypes.string,
  setNote: PropTypes.func.isRequired,
  translations: translationsPropTypes, // eslint-disable-line react/require-default-props,,
};

NoteSection.defaultProps = {
  note: '',
};

export default NoteSection;
