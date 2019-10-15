import PropTypes from 'prop-types';

export const storyPropTypes = PropTypes.shape({
  note: PropTypes.string,
  type: PropTypes.oneOf(['image', 'video', 'gif']),
  order: PropTypes.number,
  asset_url: PropTypes.string,
  thumbnail_url: PropTypes.string,
}).isRequired;

export const userPropTypes = PropTypes.shape({
  avatarUrl: PropTypes.string.isRequired,
  handle: PropTypes.string,
}).isRequired;

export const translationsPropTypes = PropTypes.shape({
  notePlaceholder: PropTypes.string.isRequired,
  cancel: PropTypes.string.isRequired,
  saveNote: PropTypes.string.isRequired,
  addNote: PropTypes.string.isRequired,
  editNote: PropTypes.string.isRequired,
  noteExplanation: PropTypes.string.isRequired,
}).isRequired;
