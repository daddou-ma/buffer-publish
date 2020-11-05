import { AttachmentTypes } from '../AppConstants';
import { MENTION_REGEX } from '../utils/draft-js-custom-plugins/mention';
import countHashtagsInText from '../lib/validation/HashtagCounter';

class Draft {
  constructor(service, editorState) {
    this.id = service.name; // Unique identifier; currently that's the service name
    this.service = service; // Service data structure in AppConstants.js
    this.editorState = editorState;
    this.urls = []; // Urls contained in the text
    this.unshortenedUrls = []; // Urls unshortened by user
    this.link = null; // Link Attachment; data structure in getNewLink()
    this.tempImage = null; // Thumbnail of media actively considered for Media Attachment
    this.images = []; // Media Attachment (type: image); data structure in getNewImage()
    this.availableImages = [];
    this.video = null; // Media Attachment (type: video); data structure in getNewVideo()
    this.attachedMediaEditingPayload = null; // Referrence to the media object being actively edited
    this.gif = null; // Media Attachment (type: gif); data structure in getNewGif()
    this.retweet = null; // Data structure in getNewRetweet()
    this.characterCount = service.charLimit === null ? null : 0; // Only updated for services w/ char limit
    this.characterCommentCount = service.commentCharLimit === null ? null : 0; // Only updated for services w/ comment char limit
    this.isEnabled = false;
    this.filesUploadProgress = new Map(); // Map of uploaderInstance <> integer(0-100)
    this.enabledAttachmentType =
      service.canHaveAttachmentType(AttachmentTypes.MEDIA) &&
      !service.canHaveAttachmentType(AttachmentTypes.LINK)
        ? AttachmentTypes.MEDIA
        : null;
    this.sourceLink = null; // Source url and page metadata; data structure in getNewSourceLink()
    this.isSaved = false;
    this.hasSavingError = false;
    this.shortLinkLongLinkMap = new Map();
    this.scheduledAt = null;
    this.isPinnedToSlot = null; // null when scheduledAt is null; true/false otherwise
    this.instagramFeedback = [];
    this.locationId = null;
    this.locationName = null;
    this.isTaggingPageLocation = null;
  }

  isEmpty() {
    return (
      this.isTextEmpty() &&
      (this.enabledAttachmentType !== AttachmentTypes.LINK ||
        this.link === null) &&
      (this.canHaveMedia() || this.images.length === 0) &&
      (this.canHaveMedia() || this.video === null) &&
      (this.canHaveMedia() || this.gif === null) &&
      (this.enabledAttachmentType !== AttachmentTypes.RETWEET ||
        this.retweet === null) &&
      this.sourceLink === null
    );
  }

  isTextEmpty() {
    return this.editorState.getCurrentContent().getPlainText().length === 0;
  }

  canHaveMedia() {
    return this.enabledAttachmentType !== AttachmentTypes.MEDIA;
  }

  hasVideoAttached() {
    return (
      this.enabledAttachmentType === AttachmentTypes.MEDIA &&
      this.video !== null
    );
  }

  getNumberOfMentionsInText() {
    const contentState = this.editorState.getCurrentContent();
    const captionText = contentState.getPlainText();
    const matchesInCaption = captionText.match(MENTION_REGEX);
    return matchesInCaption !== null ? matchesInCaption.length : 0;
  }

  getNumberOfMentionsInComment() {
    const commentText = this.commentText || '';
    const matchesInComment = commentText.match(MENTION_REGEX);
    return matchesInComment !== null ? matchesInComment.length : 0;
  }

  getNumberOfMentions() {
    return (
      this.getNumberOfMentionsInText() + this.getNumberOfMentionsInComment()
    );
  }

  getNumberOfHashtagsInText() {
    const captionText = this.editorState.getCurrentContent().getPlainText();
    return countHashtagsInText(captionText);
  }

  getNumberOfHashtagsInComment() {
    const commentText = this.commentText || '';
    return countHashtagsInText(commentText);
  }

  getNumberOfHashtags() {
    return (
      this.getNumberOfHashtagsInText() + this.getNumberOfHashtagsInComment()
    );
  }
}

export default Draft;
