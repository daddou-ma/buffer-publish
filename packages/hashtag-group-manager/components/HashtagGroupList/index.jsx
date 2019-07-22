import React from 'react';
import PropTypes from 'prop-types';
import HashtagGroupItem from './../HashtagGroupItem';
import countHashtagsInText from '../../utils/HashtagCounter';

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
      text,
      id,
    }) => (
      <HashtagGroupItem
        key={id}
        name={name}
        numberOfHashtags={countHashtagsInText(text).toString()}
        hashtags={text}
        onInsertHashtagGroupClick={() => onInsertHashtagGroupClick(text)}
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
      text: PropTypes.string.isRequired,
      id: PropTypes.string,
    }),
  ).isRequired,
  onDeleteHashtagGroupClick: PropTypes.func.isRequired,
  onInsertHashtagGroupClick: PropTypes.func.isRequired,
};

export default HashtagGroupList;
