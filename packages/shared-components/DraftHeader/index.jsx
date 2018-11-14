import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Image,
} from '@bufferapp/components';
import {
  borderWidth,
} from '@bufferapp/components/style/border';
import {
  mystic,
} from '@bufferapp/components/style/color';

const postDetailsStyle = {
  display: 'flex',
  padding: '0.5rem 1rem',
  borderBottom: `${borderWidth} solid ${mystic}`,
};

const postActionDetailsStyle = {
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
};

const avatarStyle = {
  marginRight: '0.75rem',
  display: 'flex',
}

/* eslint-disable react/prop-types */

const renderText = ({
  draftDetails,
}) =>
  <span>
    <Text
      size={'small'}
    >
      {draftDetails.creatorName + ' created this ' + draftDetails.createdAt}
    </Text>
  </span>;

/* eslint-enable react/prop-types */

const DraftHeader = ({
  draftDetails,
}) =>
  <div style={postDetailsStyle}>
    <div style={postActionDetailsStyle}>
      <span style={avatarStyle}>
        <Image
          src={draftDetails.avatarUrl}
          border={'circle'}
          height={'1.25rem'}
          width={'1.25rem'}
        />
      </span>
      {renderText({ draftDetails })}
    </div>
  </div>;

DraftHeader.propTypes = {
  draftDetails: PropTypes.shape({
    creatorName: PropTypes.string,
    avatarUrl: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

DraftHeader.defaultProps = {
};

export default DraftHeader;
