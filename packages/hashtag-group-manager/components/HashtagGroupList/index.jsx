import React from 'react';
import PropTypes from 'prop-types';
import HashtagGroupItem from './../HashtagGroupItem';

const contentStyle = {
  flex: '1',
  overflow: 'scroll',
  paddingBottom: '16px',
};

const HashtagGroupList = ({
  hashtagGroups,
  onInsertHashtagGroupClick,
  onDeleteHashtagGroupClick,
}) => {
  const children = hashtagGroups.map(
    ({
      name,
      numberOfHashtags,
      hashtags,
      id,
    }) => (
      <HashtagGroupItem
        key={id}
        name={name}
        numberOfHashtags={numberOfHashtags}
        hashtags={hashtags}
        onInsertHashtagGroupClick={onInsertHashtagGroupClick}
        onDeleteHashtagGroupClick={onDeleteHashtagGroupClick}
      />
    ),
  );
  return (
    <div style={contentStyle}>
      {children}
    </div>
  );
};

HashtagGroupList.propTypes = {
  hashtagGroups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      numberOfHashtags: PropTypes.string.isRequired,
      hashtags: PropTypes.string.isRequired,
      id: PropTypes.string,
    }),
  ).isRequired,
  onDeleteHashtagGroupClick: PropTypes.func.isRequired,
  onInsertHashtagGroupClick: PropTypes.func.isRequired,
};

export default HashtagGroupList;
