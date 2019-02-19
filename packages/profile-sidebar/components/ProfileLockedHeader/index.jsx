import React from 'react';
import PropTypes from 'prop-types';
import { Text, QuestionIcon, IconArrowPopover } from '@bufferapp/components';

const lockedAccountHeaderStyle = {
  margin: '1rem 0 0.5rem 0',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
};

const ProfileLockedHeader = ({ translations, profileLimit }) => (
  <div style={lockedAccountHeaderStyle}>
    <Text size={'small'}>{translations.lockedList}</Text>
    <div style={{ position: 'absolute', marginLeft: '13rem' }}>
      <IconArrowPopover
        icon={<QuestionIcon />}
        position="above"
        shadow
        oneLine={false}
        width="320px"
        label={translations.lockedList}
      >
        <div style={{ padding: '.5rem .25rem' }}>
          {translations.lockedListTooltip1 +
            profileLimit +
            translations.lockedListTooltip2}
        </div>
      </IconArrowPopover>
    </div>
  </div>
);

ProfileLockedHeader.propTypes = {
  translations: PropTypes.shape({
    connectButton: PropTypes.string,
    lockedList: PropTypes.string,
    lockedListTooltip: PropTypes.string,
  }).isRequired,
  profileLimit: PropTypes.number.isRequired,
};

export default ProfileLockedHeader;
