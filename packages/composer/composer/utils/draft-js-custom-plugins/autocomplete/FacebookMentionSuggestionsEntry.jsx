import React from 'react';
import PropTypes from 'prop-types';

const FacebookMentionSuggestionsEntry = props => {
  const { mention, theme: styles, ...parentProps } = props;

  return (
    <div {...parentProps}>
      {mention.has('avatar') && (
        <img
          src={mention.get('avatar')}
          className={styles.mentionSuggestionsEntryAvatar}
          role="presentation"
        />
      )}

      <span className={styles.mentionSuggestionsEntryText}>
        <span className={styles.mentionSuggestionsEntryName}>
          {mention.get('name')}
        </span>
        <span className={styles.mentionSuggestionsEntryCategory}>
          {mention.get('category')}
        </span>
      </span>
    </div>
  );
};

FacebookMentionSuggestionsEntry.propTypes = {
  mention: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default FacebookMentionSuggestionsEntry;
