import React from 'react';
import PropTypes from 'prop-types';

const TwitterHashtagAutocompleteSuggestionsEntry = props => {
  const {
    mention,
    theme: styles,
    searchValue, // eslint-disable-line no-unused-vars, react/prop-types
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <span className={styles.mentionSuggestionsEntryText}>
        <span className={styles.mentionSuggestionsEntryName}>
          {mention.get('name')}
        </span>
      </span>
    </div>
  );
};

TwitterHashtagAutocompleteSuggestionsEntry.propTypes = {
  mention: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default TwitterHashtagAutocompleteSuggestionsEntry;
