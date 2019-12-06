import PropTypes from 'prop-types';

const notify = (...params) => {
  if (typeof console !== 'undefined') {
    console.error(...params); // eslint-disable-line
  }
};

/**
 * removeNullObjectKeys
 * Function to remove null or undefined props from segment data object
 *
 * @param props {Object} Data you want to filter down to not null properties
 * @returns {Object} mapped object with null props filtered out
 */
const removeNullObjectKeys = data => {
  const segmentData = {};

  if (data) {
    Object.keys(data)
      .filter(key => data[key] != null)
      .forEach(key => {
        segmentData[key] = data[key];
      });
  }

  return segmentData;
};

/**
 * Story Dragged
 * When did the user drag and drop a story in the storygroup?
 * More info about this event available in tracking plan repo:
 * https://github.com/bufferapp/tracking-plan/blob/master/tracking-plans/buffer-tracking-plan/events/product/publish/story-dragged.yaml
 *
 * @param [product] {string} The product for which the storygroup was created
 * @param channel {string} The channel's service, ex. "facebook"
 * @param channelId {string} The database id for the channel document
 * @param channelServiceId {string} The service's own id for this channel
 * @param clientId {string|null} What was the unique identifier of the client the user was in when they dragged the story?
 * @param clientName {string|null} Which client was the user in when they dragged the story? IE, `publishIos`, `publishWeb`, `publishAndroid`.
 *
 * @returns {{channelServiceId: *, product: *, clientId: *, clientName: *, channel: *, channelId: *}}
 */
export const dragged = ({
  product = null,
  channel = null,
  channelId = null,
  channelServiceId = null,
  clientId = null,
  clientName = null,
}) => {
  if (clientId === null && clientName === null) {
    notify('storyDrag - clientName or clientId must be supplied');
  }
  const draggedSegment = {
    product,
    channel,
    channelId,
    channelServiceId,
    clientId,
    clientName,
  };

  return removeNullObjectKeys(draggedSegment);
};

dragged.propTypes = {
  product: PropTypes.string,
  channel: PropTypes.string,
  channelId: PropTypes.string.isRequired,
  channelServiceId: PropTypes.string,
  clientId: PropTypes.string,
  clientName: PropTypes.string,
};

/**
 * Story Nonconforming Image Uploaded
 * When did the user upload an image to a story, where the image did not conform to the 9:16 ratio required by Instagram?
 * https://github.com/bufferapp/tracking-plan/blob/master/tracking-plans/buffer-tracking-plan/events/product/publish/story-nonconforming-image-uploaded.yaml
 *
 * @param storyGroupId {string|null} The unique identifier for this story group in our production database.
 * @param product {string} The product for which the story was created
 * @param channel {string} The channel's service, ex. "facebook"
 * @param channelId {string} The database id for the channel document
 * @param channelServiceId {string} The service's own id for this channel
 * @param scheduledAt {string|null} The time at which the reminder is scheduled to be sent.
 * @param cta {string|null} Which call to action did the user click to get to the Story composer?
 * @param ctaApp {string|null} Which product is the CTA located in? Examples would be either the product, like "publish" or "reply".
 * @param ctaView {string|null} What app view is the CTA located in? Examples would be, "composer" or "analyticsOverview" for Publish.
 * @param ctaLocation {string|null} {string} Where in the view is the CTA located? An example would be "menu" for the Pro trial CTA in Publish app shell menu.
 * @param ctaButton {string|null} What is the name or action of the CTA? In many cases it makes sense to describe the intended result of the CTA, like `proTrial` or `publishPro`.
 * @param ctaVersion {string|null} What is the version number of the CTA? If setting the value for the first time, set to "1".
 * @param clientId {string|null} What was the unique identifier of the client the user was in when they uploaded a nonconforming image?
 * @param clientName {string|null} Which client was the user in when they uploaded a nonconforming image? IE, `publishIos`, `publishWeb`, `publishAndroid`.
 * @param imageAspectRatio {string|null} The actual aspect ratio of the uploaded image.
 */
export const nonConfirmingImageUploaded = ({
  storyGroupId = null,
  product = null,
  channel = null,
  channelId = null,
  channelServiceId = null,
  scheduledAt = null,
  cta = null,
  ctaApp = null,
  ctaView = null,
  ctaLocation = null,
  ctaButton = null,
  ctaVersion = null,
  clientId = null,
  clientName = null,
  imageAspectRatio = null,
}) => {
  if (clientId === null && clientName === null) {
    notify(
      'StoryNonConfirmingImageUploaded - clientName or clientId must be supplied'
    );
  }
  const nonConformingImageSegment = {
    storyGroupId,
    product,
    channel,
    channelId,
    channelServiceId,
    scheduledAt,
    cta,
    ctaApp,
    ctaView,
    ctaLocation,
    ctaButton,
    ctaVersion,
    clientId,
    clientName,
    imageAspectRatio,
  };
  return removeNullObjectKeys(nonConformingImageSegment);
};

nonConfirmingImageUploaded.propTypes = {
  storyGroupId: PropTypes.string,
  product: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  channelServiceId: PropTypes.string.isRequired,
  scheduledAt: PropTypes.string,
  cta: PropTypes.string,
  ctaApp: PropTypes.string,
  ctaView: PropTypes.string,
  ctaLocation: PropTypes.string,
  ctaButton: PropTypes.string,
  ctaVersion: PropTypes.string,
  clientId: PropTypes.string,
  clientName: PropTypes.string,
  imageAspectRatio: PropTypes.string,
};
