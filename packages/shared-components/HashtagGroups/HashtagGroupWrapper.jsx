import React from 'react';
import PropTypes from 'prop-types';
import CreateHashtagGroup from './CreateHashtagGroup';
import ManageHashtagGroup from './ManageHashtagGroup';

const boxStyle = {
  width: '300px', // temporary
  height: '600px', // temporary
  border: '1px solid black', // temporary
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0 16px 16px',
};

const HashtagGroupWrapper = ({ viewMode, hashtagGroups }) =>
  <div style={boxStyle}>
    {viewMode === 'createHashtag' &&
      <CreateHashtagGroup />
    }
    {viewMode === 'manageHashtag' &&
      <ManageHashtagGroup
        hashtagGroups={hashtagGroups}
      />
    }
  </div>;

HashtagGroupWrapper.propTypes = {
  viewMode: PropTypes.string,
  hashtagGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
};

HashtagGroupWrapper.defaultProps = {
  viewMode: 'createHashtag',
};


export default HashtagGroupWrapper;
