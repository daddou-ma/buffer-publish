import PropTypes from 'prop-types';
import moment from 'moment-timezone';

export const selectedProfilePropTypes = PropTypes.shape({
  avatar_https: PropTypes.string,
  service: PropTypes.string,
  handle: PropTypes.string,
}).isRequired;

export const translationsPropTypes = PropTypes.shape({
  scheduleLoadingButton: PropTypes.string,
  scheduleButton: PropTypes.string,
  shareNowButton: PropTypes.string,
  previewButton: PropTypes.string,
  addNote: PropTypes.string.isRequired,
  notePlaceholder: PropTypes.string,
  noteSubText: PropTypes.string,
  saveNoteButton: PropTypes.string,
  cancelNoteButton: PropTypes.string,
  noteImageAlt: PropTypes.string,
}).isRequired;

export const carouselCardPropTypes = PropTypes.shape({
  order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  note: PropTypes.string,
  asset_url: PropTypes.string,
  thumbnail_url: PropTypes.string,
  empty: PropTypes.bool,
  progress: PropTypes.number,
});

export const storyGroupPropTypes = PropTypes.shape({
  storyDetails: PropTypes.shape({
    stories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ),
  }),
  scheduledAt: PropTypes.number,
}).isRequired;
