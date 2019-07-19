import React from 'react';
import PropTypes from 'prop-types';
import HashtagGroupItem from './../HashtagGroupItem';
import countHashtagsInText from '../../utils/HashtagCounter';


const HashtagGroupList = ({
  hashtagGroups,
  onInsertHashtagGroupClick,
  onDeleteHashtagGroupClick,
}) => {
  const children = hashtagGroups.map(
    ({
      name,
      numberOfHashtags,
      text,
      id,
    }) => (
      <HashtagGroupItem
        key={id}
        name={name}
        numberOfHashtags={countHashtagsInText(text)}
        hashtags={text}
        onInsertHashtagGroupClick={onInsertHashtagGroupClick}
        onDeleteHashtagGroupClick={onDeleteHashtagGroupClick}
      />
    ),
  );
  return (
    <div>
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
