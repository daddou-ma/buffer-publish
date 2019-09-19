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
