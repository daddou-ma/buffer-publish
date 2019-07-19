import React from 'react';
import PropTypes from 'prop-types';
import HashtagGroupCreator from './../HashtagGroupCreator';
import HashtagGroupManager from './../HashtagGroupManager';

const boxStyle = {
  height: 'calc(100% - 16px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0 0 16px',
};

const HashtagGroupWrapper = ({ viewMode, hashtagGroups }) => (
  <div style={boxStyle}>
    {viewMode === 'createHashtag' &&
      <HashtagGroupCreator />
    }
    {viewMode === 'manageHashtag' &&
      <HashtagGroupManager
        hashtagGroups={hashtagGroups}
      />
    }
  </div>
);

HashtagGroupWrapper.propTypes = {
  viewMode: PropTypes.string,
  hashtagGroups: PropTypes.arrayOf(PropTypes.shape({})),
};

HashtagGroupWrapper.defaultProps = {
  viewMode: 'createHashtag',
  hashtagGroups: [],
};


export default HashtagGroupWrapper;
