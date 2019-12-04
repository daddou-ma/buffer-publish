import React from 'react';
import PropTypes from 'prop-types';

const TwitterMentionSuggestionsEntry = props => {
  const {
    mention,
    theme: styles,
    searchValue, // eslint-disable-line no-unused-vars, react/prop-types
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      {mention.has('avatar') && (
        <img
          src={mention.get('avatar')}
          className={styles.mentionSuggestionsEntryAvatar}
          alt=""
        />
      )}

      <span className={styles.mentionSuggestionsEntryText}>
        <span className={styles.mentionSuggestionsEntryName}>
          {mention.get('fullName')}{' '}
        </span>
        {mention.get('name')}
      </span>
    </div>
  );
};

TwitterMentionSuggestionsEntry.propTypes = {
  mention: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default TwitterMentionSuggestionsEntry;
