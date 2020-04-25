/**
 * Component that displays a composer
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import ReactDOMServer from 'react-dom/server';
import uniqBy from 'lodash.uniqby';
import { MediaTypes } from '@bufferapp/publish-constants';
import AppActionCreators from '../action-creators/AppActionCreators';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import NotificationActionCreators from '../action-creators/NotificationActionCreators';
import Editor from './Editor';
import NotificationContainer from './NotificationContainer';
import CharacterCount from './CharacterCount';
import LinkAttachment from './LinkAttachment';
import MediaAttachment from './MediaAttachment';
import RetweetAttachment from './RetweetAttachment';
import SuggestedMediaBox from './SuggestedMediaBox';
import AttachmentGlance from './AttachmentGlance';
import ComposerProfileTooltip from './ComposerProfileTooltip';
import PinterestComposerBar from './PinterestComposerBar';
import LocationComposerBar from './LocationComposerBar';
import ShopgridComposerBar from './ShopgridComposerBar';
import FirstCommentComposerBar from './FirstCommentComposerBar';
import TooltipList from './styled/TooltipList';
import Button from './styled/Button';
import {
  AttachmentTypes,
  NotificationScopes,
  ErrorTypes,
  QueueingTypes,
} from '../AppConstants';
import InstagramFeedback from './InstagramFeedback';
import InstagramThumbnailButton from './InstagramThumbnailButton';
import { isIE } from '../utils/DOMUtils';
import { isManagerOrContributorForAnyProfile } from '../utils/profile-filtering';

import styles from './css/Composer.css';

class Composer extends React.Component {
  static propTypes = {
    appState: PropTypes.shape({
      draftSaveQueueingType: PropTypes.string,
      isOmniboxEnabled: PropTypes.bool,
      composersWhichHaveBeenCollapsed: PropTypes.instanceOf(Set),
      whatPreventsSaving: PropTypes.arrayOf(
        PropTypes.shape({
          composerId: PropTypes.string,
          code: PropTypes.string,
          message: PropTypes.string,
        })
      ),
    }).isRequired,
    draft: PropTypes.shape({
      id: PropTypes.string,
      instagramFeedback: PropTypes.array,
      isEnabled: PropTypes.bool,
      isSaved: PropTypes.bool,
      hasSavingError: PropTypes.bool,
      link: PropTypes.shape({
        availableThumbnails: PropTypes.array,
        thumbnail: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
      sourceLink: PropTypes.shape({
        availableImages: PropTypes.string,
        url: PropTypes.string,
      }),
      enabledAttachmentType: PropTypes.string,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        })
      ),
      video: PropTypes.shape({
        url: PropTypes.string,
        thumbnail: PropTypes.string,
      }),
      gif: PropTypes.shape({
        url: PropTypes.string,
        stillGifUrl: PropTypes.string,
      }),
      service: PropTypes.shape({
        canHaveMediaAttachmentType: PropTypes.func,
        canHaveSomeAttachmentType: PropTypes.func,
        shouldShowDuplicateContentWarning: PropTypes.bool,
        isOmni: PropTypes.bool,
        name: PropTypes.string,
        charLimit: PropTypes.number,
        usesImageFirstLayout: PropTypes.bool,
        commentCharLimit: PropTypes.number,
        maxAttachableImagesCount: PropTypes.number,
      }),
      retweet: PropTypes.shape({
        avatarUrl: PropTypes.string,
      }),
      characterCount: PropTypes.number,
      tempImage: PropTypes.string,
      filesUploadProgress: PropTypes.instanceOf(Map),
    }).isRequired,
    enabledDrafts: PropTypes.arrayOf(
      PropTypes.shape({
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
          })
        ),
        video: PropTypes.shape({
          url: PropTypes.string,
          thumbnail: PropTypes.string,
        }),
        gif: PropTypes.shape({
          url: PropTypes.string,
          stillGifUrl: PropTypes.string,
        }),
      })
    ).isRequired,
    draftsSharedData: PropTypes.shape({
      uploadedVideos: PropTypes.array,
      uploadedImages: PropTypes.array,
      uploadedGifs: PropTypes.array,
    }).isRequired,
    visibleNotifications: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string,
        scope: PropTypes.string,
        data: PropTypes.shape({
          id: PropTypes.string,
        }),
      })
    ).isRequired,
    areAllDraftsSaved: PropTypes.bool.isRequired,
    shouldEnableFacebookAutocomplete: PropTypes.bool.isRequired,
    shouldShowInlineSubprofileDropdown: PropTypes.bool.isRequired,
    forceEditorFocus: PropTypes.bool.isRequired,
    profiles: PropTypes.arrayOf(PropTypes.shape({})),
    expandedComposerId: PropTypes.string,
    selectedProfiles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        instagramDirectEnabled: PropTypes.bool,
        shouldShowGridPreview: PropTypes.bool,
        service: PropTypes.shape({
          canHaveMediaAttachmentType: PropTypes.func,
          canHaveSomeAttachmentType: PropTypes.func,
          shouldShowDuplicateContentWarning: PropTypes.bool,
          isOmni: PropTypes.bool,
          name: PropTypes.string,
          charLimit: PropTypes.number,
          usesImageFirstLayout: PropTypes.bool,
          commentCharLimit: PropTypes.number,
          maxAttachableImagesCount: PropTypes.number,
        }),
      })
    ),
    children: PropTypes.node,
    composerPosition: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
    }),
    hasIGLocationTaggingFeature: PropTypes.bool,
    canStartProTrial: PropTypes.bool,
    isOnProTrial: PropTypes.bool,
    hasIGDirectVideoFlip: PropTypes.bool,
    hasShopgridFlip: PropTypes.bool,
    isProAndUpOrTeamMember: PropTypes.bool,
    isFreeUser: PropTypes.bool.isRequired,
    isBusinessUser: PropTypes.bool.isRequired,
    draftMode: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    composerPosition: null,
    hasIGLocationTaggingFeature: false,
    canStartProTrial: false,
    isOnProTrial: false,
    hasIGDirectVideoFlip: false,
    isProAndUpOrTeamMember: false,
    hasShopgridFlip: false,
    profiles: [],
    expandedComposerId: null,
    selectedProfiles: [],
    draftMode: false,
  };

  constructor(props) {
    super(props);
    this.onCommentClick = this.onCommentClick.bind(this);
    this.onToggleSidebarVisibility = this.onToggleSidebarVisibility.bind(this);
  }

  state = {
    didRenderOnce: false,
    shouldAutoFocusEditor: false,
    hasCheckedForFacebookPermission: false,
  };

  componentWillReceiveProps(nextProps) {
    /**
     * Auto-focus editor upon expanding composer. A composer can be considered
     * as expanding:
     * - When it was previously collapsed, and user expanded it
     * - When the app hasn't loaded, and the composer is auto-expanded on load
     */
    const willBeExpanded = nextProps.expandedComposerId === this.props.draft.id;
    const isExpanded = this.isExpanded() && this.state.didRenderOnce;
    const shouldAutoFocusEditor =
      (!isExpanded && willBeExpanded) || nextProps.forceEditorFocus;
    this.setState({ didRenderOnce: true, shouldAutoFocusEditor });

    if (nextProps.forceEditorFocus) AppActionCreators.stopForcingEditorFocus();
  }

  onComposerClick = e => {
    if (this.isDisplayedBehind()) {
      e.preventDefault();
      this.expand();
    }
  };

  onNetworkIconClick = e => {
    e.preventDefault();
    this.toggleExpandedState();
  };

  // Ensure other parts of the app ignore click events coming from inside the composer
  // (e.g. when collapsing an expanded composer when a click is registered outside).
  // Don't prevent default for file input clicks or links, but prevent them from bubbling up,
  // so that the default browser action (file selection) still happens.
  onUpdateZoneClick = e => {
    if (!this.isExpanded()) return;

    const isFileInputTargeted =
      e.target.tagName === 'INPUT' && e.target.getAttribute('type') === 'file';
    const isLinkTargeted = e.target.tagName === 'A';

    if (isFileInputTargeted || isLinkTargeted) e.stopPropagation();
    else e.preventDefault();
  };

  onLinkAttachmentSwitchClick = () => {
    ComposerActionCreators.toggleAttachment(
      this.props.draft.id,
      AttachmentTypes.LINK
    );
  };

  onRetweetAttachmentSwitchClick = () => {
    ComposerActionCreators.toggleAttachment(
      this.props.draft.id,
      AttachmentTypes.RETWEET
    );
  };

  onToggleSidebarVisibility = (e, composerSidebarVisible) => {
    e.preventDefault();
    ComposerActionCreators.updateToggleSidebarVisibility(
      this.props.draft.id,
      composerSidebarVisible
    );
  };

  onMediaAttachmentSwitchClick = () => {
    const replacedAttachment =
      this.isLinkAttachmentEnabled() && this.hasLinkAttachment()
        ? AttachmentTypes.LINK
        : this.isRetweetAttachmentEnabled() && this.hasRetweetAttachment()
        ? AttachmentTypes.RETWEET
        : 'no_previous_attachment';

    ComposerActionCreators.toggleAttachment(
      this.props.draft.id,
      AttachmentTypes.MEDIA
    );
  };

  onEditorFocus = () => this.expand();

  getSuggestedMedia = shouldFilterOutAttachedMedia => {
    const { draft, enabledDrafts, draftsSharedData } = this.props;
    const otherEnabledDrafts = enabledDrafts.filter(
      enabledDraft => enabledDraft.id !== draft.id
    );
    const { availableImages } = draft;
    const availableLinkThumbnails =
      draft.link !== null && draft.link.availableThumbnails !== null
        ? draft.link.availableThumbnails
        : [];
    const availableSourceLinkImages =
      draft.sourceLink !== null ? draft.sourceLink.availableImages : [];

    let suggestedMedia = Array.prototype.concat.call(
      // Other enabled drafts' attached videos
      otherEnabledDrafts.reduce(
        (attachedVideos, otherDraft) =>
          otherDraft.video !== null
            ? attachedVideos.concat(otherDraft.video)
            : attachedVideos,
        []
      ),
      // Other enabled drafts' attached images
      ...otherEnabledDrafts.map(otherDraft => otherDraft.images),
      // Other enabled drafts' attached gifs (if service supports gifs)
      draft.service.canHaveMediaAttachmentType(MediaTypes.GIF)
        ? otherEnabledDrafts.reduce(
            (attachedGifs, otherDraft) =>
              otherDraft.gif !== null
                ? attachedGifs.concat(otherDraft.gif)
                : attachedGifs,
            []
          )
        : [],
      draftsSharedData.uploadedVideos, // All uploaded videos
      draftsSharedData.uploadedImages, // All uploaded images
      // All uploaded gifs (if service supports gifs)
      draft.service.canHaveMediaAttachmentType(MediaTypes.GIF)
        ? draftsSharedData.uploadedGifs
        : [],
      availableImages, // This draft's available images
      availableLinkThumbnails, // This draft's link attachment's available thumbnails
      availableSourceLinkImages // Images found on this draft's source url page
    );

    if (shouldFilterOutAttachedMedia) {
      suggestedMedia = suggestedMedia.filter(
        suggestedItem =>
          !draft.images.find(image => suggestedItem.url === image.url) &&
          !(draft.video && draft.video.url === suggestedItem.url) &&
          !(draft.gif && draft.gif.url === suggestedItem.url)
      );
    }

    // Deduplicate suggested media
    return uniqBy(suggestedMedia, e => e.url);
  };

  getAttachmentThumbnails = () => {
    let thumbnails = null;
    const { draft } = this.props;
    const attachmentType = this.props.draft.enabledAttachmentType;
    if (attachmentType === AttachmentTypes.MEDIA && draft.video !== null) {
      thumbnails = [draft.video.thumbnail];
    } else if (attachmentType === AttachmentTypes.MEDIA && draft.gif !== null) {
      if (draft.gif.stillGifUrl !== null) thumbnails = [draft.gif.stillGifUrl];
    } else if (
      attachmentType === AttachmentTypes.MEDIA &&
      draft.images.length > 0
    ) {
      thumbnails = draft.images.map(image => image.url);
    } else if (
      attachmentType === AttachmentTypes.LINK &&
      draft.link.thumbnail !== null
    ) {
      thumbnails = [draft.link.thumbnail.url];
    } else if (
      attachmentType === AttachmentTypes.RETWEET &&
      draft.retweet !== null
    ) {
      thumbnails = [draft.retweet.avatarUrl];
    }
    return thumbnails;
  };

  getComposerFeedbackMessages = () => {
    // Message codes for which feedback shouldn't be displayed inside the composer
    const whatPreventsSavingIgnoredCodes = [1];

    return this.props.appState.whatPreventsSaving.filter(
      what =>
        what.composerId === this.props.draft.id &&
        !whatPreventsSavingIgnoredCodes.includes(what.code)
    );
  };

  getOmniboxNoticeTooltipMarkup = () => {
    const messages = this.props.visibleNotifications.reduce(
      (notifMessages, notif) =>
        notif.scope === NotificationScopes.MC_OMNIBOX_EDIT_NOTICE &&
        notif.data.id === this.props.draft.id
          ? notifMessages.concat(notif.message)
          : notifMessages,
      []
    );

    if (messages.length < 1) {
      return null;
    }

    return ReactDOMServer.renderToStaticMarkup(
      <TooltipList messages={messages} />
    );
  };

  getAlertIconTooltipMarkup = () => {
    const messages = this.props.appState.whatPreventsSaving.reduce(
      (alertMessages, what) =>
        what.composerId === this.props.draft.id
          ? alertMessages.concat(what.message)
          : alertMessages,
      []
    );

    if (messages.length < 1) {
      return null;
    }

    return ReactDOMServer.renderToStaticMarkup(
      <TooltipList messages={messages} />
    );
  };

  getSelectedProfilesForService = () =>
    this.props.selectedProfiles.filter(
      profile => profile.service.name === this.props.draft.id
    );

  getSelectedProfilesTooltipMarkup = () => {
    const selectedProfilesForService = this.getSelectedProfilesForService();
    return ReactDOMServer.renderToStaticMarkup(
      <ComposerProfileTooltip
        selectedProfilesForService={selectedProfilesForService}
        key={this.props.draft.id}
      />
    );
  };

  hasComposerAlerts = () =>
    this.props.appState.whatPreventsSaving.filter(
      what => what.composerId === this.props.draft.id
    ).length > 0;

  hasOmniboxNotices = () =>
    this.props.visibleNotifications.some(
      notif =>
        notif.scope === NotificationScopes.MC_OMNIBOX_EDIT_NOTICE &&
        notif.data.id === this.props.draft.id
    );

  isEnabled = () =>
    this.props.draft.isEnabled || this.props.draft.service.isOmni;

  isExpanded = () => this.props.expandedComposerId === this.props.draft.id;

  isLinkAttachmentEnabled = () =>
    this.props.draft.enabledAttachmentType === AttachmentTypes.LINK;

  isMediaAttachmentEnabled = () =>
    this.props.draft.enabledAttachmentType === AttachmentTypes.MEDIA;

  isRetweetAttachmentEnabled = () =>
    this.props.draft.enabledAttachmentType === AttachmentTypes.RETWEET;

  hasLinkAttachment = () => this.props.draft.link !== null;

  hasMediaAttachment = () =>
    this.props.draft.images.length > 0 ||
    this.props.draft.video !== null ||
    this.props.draft.gif !== null;

  hasRetweetAttachment = () => this.props.draft.retweet !== null;

  hasAttachment = () =>
    (this.isLinkAttachmentEnabled() && this.hasLinkAttachment()) ||
    (this.isMediaAttachmentEnabled() && this.hasMediaAttachment()) ||
    (this.isRetweetAttachmentEnabled() && this.hasRetweetAttachment());

  shouldShowMediaAttachmentSwitch = () =>
    !this.isMediaAttachmentEnabled() &&
    !this.isRetweetAttachmentEnabled() &&
    this.props.draft.service.canHaveSomeAttachmentType([
      AttachmentTypes.LINK,
      AttachmentTypes.RETWEET,
    ]);

  shouldShowLinkAttachmentSwitch = () =>
    this.isMediaAttachmentEnabled() && this.hasLinkAttachment();

  shouldShowRetweetAttachmentSwitch = () =>
    this.isMediaAttachmentEnabled() && this.hasRetweetAttachment();

  // Determine if that composer is displayed as "behind" another active composer
  isDisplayedBehind = () =>
    this.props.expandedComposerId !== null && !this.isExpanded();

  isInstagram = () => this.props.draft.service.name === 'instagram';

  hasVideo = () => this.props.draft.video !== null;

  getSelectedInstagramProfiles = () =>
    this.props.selectedProfiles.filter(
      profile => profile.service.name === 'instagram'
    );

  getSelectedInstagramProfileId = () => {
    const selectedInstagramDirectProfiles = this.getSelectedInstagramProfiles();
    const hasInstagramSelected = selectedInstagramDirectProfiles.length > 0;
    return hasInstagramSelected ? selectedInstagramDirectProfiles[0].id : null;
  };

  isInstagramContributor = () => {
    const selectedInstagramProfile = this.getSelectedInstagramProfiles();
    const hasInstagramSelected =
      selectedInstagramProfile && selectedInstagramProfile.length === 1;
    return (
      hasInstagramSelected &&
      selectedInstagramProfile[0] &&
      selectedInstagramProfile[0].isContributor
    );
  };

  isInstagramManager = () => {
    const selectedInstagramProfile = this.getSelectedInstagramProfiles();
    const hasInstagramSelected =
      selectedInstagramProfile && selectedInstagramProfile.length === 1;

    return (
      hasInstagramSelected &&
      selectedInstagramProfile[0] &&
      selectedInstagramProfile[0].isManager &&
      selectedInstagramProfile[0].isBusinessProfile
    );
  };

  hasIGDirectPostingEnabled = () => {
    const selectedInstagramProfile = this.getSelectedInstagramProfiles();
    const hasInstagramSelected =
      selectedInstagramProfile && selectedInstagramProfile.length === 1;
    return (
      hasInstagramSelected &&
      selectedInstagramProfile[0] &&
      selectedInstagramProfile[0].instagramDirectEnabled
    );
  };

  hasAttachmentSwitch = () =>
    this.shouldShowRetweetAttachmentSwitch() ||
    this.shouldShowLinkAttachmentSwitch() ||
    this.shouldShowMediaAttachmentSwitch();

  expand = () => {
    if (this.isExpanded()) return;

    ComposerActionCreators.expand(this.props.draft.id);
  };

  collapse = () => {
    ComposerActionCreators.collapse(this.props.draft.id);
  };

  toggleExpandedState = () =>
    this.isExpanded() ? this.collapse() : this.expand();

  removeNotice = ev => {
    ev.stopPropagation();
    NotificationActionCreators.removeComposerOmniboxNotices(
      this.props.draft.id
    );
    ReactTooltip.hide(this.noticeTooltip);
  };

  onCommentChange = e => {
    ComposerActionCreators.updateDraftComment(
      this.props.draft.id,
      e.target.value
    );
    ComposerActionCreators.updateDraftCommentCharacterCount(
      this.props.draft.id
    );
  };

  /**
   * @todo: It might make more sense to refactor this method into the
   * `FirstCommentComposerSection` component.
   */
  onCommentClick = (e, profileIsProOrBusiness) => {
    e.preventDefault();
    const { hasCheckedForFacebookPermission } = this.state;
    if (profileIsProOrBusiness) {
      /** This will trigger, if necessary, a modal to re-auth facebook for the commenting permission */
      if (!hasCheckedForFacebookPermission) {
        AppActionCreators.triggerInteraction({
          message: {
            id: this.props.draft.id,
            ids: this.props.selectedProfiles.map(profile => profile.id),
            action: 'COMMENT_ENABLED',
          },
        });
        this.setState({ hasCheckedForFacebookPermission: true });
      }
    }
    // Show upgrade modal if they are on the Free plan
    else {
      const { canStartProTrial } = this.props;
      if (canStartProTrial) {
        AppActionCreators.triggerInteraction({
          message: {
            action: 'SHOW_IG_FIRST_COMMENT_PRO_TRIAL_MODAL',
          },
        });
      } else {
        AppActionCreators.triggerInteraction({
          message: {
            action: 'SHOW_PRO_UPGRADE_MODAL',
          },
        });
      }
    }
  };

  renderCharacterCount(
    draft,
    characterCountClassName,
    shouldShowCharacterCount
  ) {
    const shouldShowHashtagCount =
      this.isExpanded() &&
      draft.service.name === 'instagram' &&
      draft.service.maxHashtags !== null &&
      draft.service.maxHashtags - draft.getNumberOfHashtags() <= 10;

    return (
      <div className={characterCountClassName}>
        {shouldShowCharacterCount && (
          <CharacterCount
            count={draft.characterCount}
            maxCount={draft.service.charLimit}
            className={styles.characterCountBox}
          />
        )}
        {shouldShowHashtagCount && (
          <CharacterCount
            count={draft.getNumberOfHashtags()}
            maxCount={draft.service.maxHashtags}
            className={styles.characterCountBox}
            type="hashtag"
          />
        )}
      </div>
    );
  }

  render() {
    if (!this.isEnabled()) return <div />;

    const {
      draft,
      profiles,
      visibleNotifications,
      appState,
      areAllDraftsSaved,
      shouldEnableFacebookAutocomplete,
      children,
      shouldShowInlineSubprofileDropdown,
      composerPosition,
      hasIGLocationTaggingFeature,
      hasIGDirectVideoFlip,
      isProAndUpOrTeamMember,
      hasShopgridFlip,
      draftMode,
    } = this.props;

    const composerFeedbackMessages = this.getComposerFeedbackMessages();
    const shouldShowRetweetAttachment =
      this.isRetweetAttachmentEnabled() && this.hasRetweetAttachment();

    const hasComposerBeenCollapsed = appState.composersWhichHaveBeenCollapsed.has(
      draft.id
    );
    const isLocked = draft.isSaved;

    const editorPlaceholder = () => {
      if (shouldShowRetweetAttachment) return 'Add a comment…';
      return undefined;
    };

    const savedComposer = draft.isSaved;
    const attachmentGlanceHasNoThumbnail =
      this.getAttachmentThumbnails() === null;
    const hasOmniboxNotices = this.hasOmniboxNotices();
    const hasComposerAlerts = this.hasComposerAlerts();

    const shouldShowAlertIcons =
      hasComposerAlerts &&
      appState.isOmniboxEnabled === false &&
      hasComposerBeenCollapsed;

    const shouldShowOmniboxNotices =
      hasOmniboxNotices && !shouldShowAlertIcons && !this.isExpanded();

    const updateZoneClassName = [
      savedComposer
        ? styles.savedUpdateZone
        : this.isExpanded()
        ? styles.expandedUpdateZone
        : styles.updateZone,
      this.hasAttachment() && !this.isExpanded()
        ? styles.updateZoneWithAttachmentGlance
        : '',
      this.hasAttachment() &&
      !this.isExpanded() &&
      attachmentGlanceHasNoThumbnail
        ? styles.updateZoneAttachmentGlanceNoThumbnail
        : '',
      !this.isExpanded() && (shouldShowOmniboxNotices || shouldShowAlertIcons)
        ? styles.updateZoneWithNotice
        : null,
      draft.hasSavingError ? styles.editableErrorUpdateZone : '',
      this.isDisplayedBehind() && isLocked
        ? styles.lockedDisplayedBehindAnotherZone
        : this.isDisplayedBehind()
        ? styles.displayedBehindAnotherUpdateZone
        : '',
    ].join(' ');

    const composerClassName = [
      this.isDisplayedBehind()
        ? styles.composerDisplayedBehindAnother
        : styles.composer,
      isLocked ? styles.lockedComposer : '',
      draft.service.isOmni ? styles.omnibox : '',
      'js-disable-dragging',
    ].join(' ');

    const attachmentSwitchIconClassName = [
      styles.attachmentSwitchIcon,
      'bi bi-image',
    ].join(' ');

    const linkAttachmentSwitchIconClassName = [
      styles.attachmentSwitchIcon,
      'bi  bi-link',
    ].join(' ');

    const mediaAttachmentSwitchCopy =
      this.isLinkAttachmentEnabled() && this.hasLinkAttachment()
        ? 'Replace link attachment with image or video'
        : !this.isMediaAttachmentEnabled()
        ? 'Add image or video'
        : '';

    const composerHiddenTitle = `${draft.service.name} composer`;

    const noticeClassNames = {
      container: styles.composerInfoMessageContainer,
      notification: styles.composerInfoMessage,
      notificationCloseButton: styles.composerInfoMessageCloseButton,
    };

    const inlineErrorClassNames = {
      notification: styles.inlineError,
    };

    const savedComposerFeedbackClassNames = [
      styles.savedComposerFeedback,
      'bi bi-checkmark',
    ].join(' ');

    const composerNotPrefilledNoticeScope = `${NotificationScopes.COMPOSER_NOTICE_NOT_PREFILLED}-${draft.service.name}`;
    const hasComposerNotPrefilledNotice = visibleNotifications.some(
      n => n.scope === composerNotPrefilledNoticeScope
    );
    const hasComposerFbAutocompleteDisabledNotice = visibleNotifications.some(
      n =>
        n.scope === NotificationScopes.COMPOSER_FACEBOOK_AUTOCOMPLETE_DISABLED
    );

    const hasTwitterDuplicateWarningNotice = visibleNotifications.some(
      n => n.scope === NotificationScopes.TWITTER_DUPLICATE_CONTENT_WARNING
    );

    let shouldShowComposerFeedbackMessages =
      this.isExpanded() &&
      composerFeedbackMessages.length > 0 &&
      hasComposerBeenCollapsed &&
      !appState.isOmniboxEnabled &&
      !hasComposerNotPrefilledNotice;

    /**
     * HACK: Remove this when we no longer need to prevent videos
     * outside the correct aspect ratio for IG from being added to
     * the queue.
     *
     * Explanation: `shouldShowComposerFeedbackMessages` above is
     * false sometimes to prevent showing users messages like "please
     * enter text" when they have only just opened the composer, but
     * that also prevents in many cases the warning about incorrect
     * video aspect ratios from showing, so here we hack that to show.
     * This will all be removed shortly once we start allowing these
     * videos and send them as reminders instead.
     */
    if (
      composerFeedbackMessages.length > 0 &&
      this.isExpanded() &&
      this.isInstagram() &&
      this.hasVideo()
    ) {
      shouldShowComposerFeedbackMessages = true;
      // Uncomment below to add FAQ link after the 'aspect ratio' notice text inline
      // (still needs styling)
      // composerFeedbackMessages = composerFeedbackMessages.map((item) => {
      //   if (item.message.indexOf('Sorry, your video needs to be between the aspect ratios') === 0) {
      //     return {
      //       ...item,
      //       extra: (<a href="https://google.com">Wow!</a>),
      //     };
      //   }
      //   return item;
      // });
    }

    const shouldShowInstagramFeedback =
      this.isInstagram() && draft.instagramFeedback.length > 0;

    const shouldShowComposerNotPrefilledNotice =
      this.isExpanded() && hasComposerNotPrefilledNotice;
    const showComposerFbAutocompleteDisabledNotice =
      this.isExpanded() && hasComposerFbAutocompleteDisabledNotice;

    const { isFreeUser } = this.props;
    const profileIsBusiness = isManagerOrContributorForAnyProfile({
      profiles: this.props.selectedProfiles,
      service: 'instagram',
    });
    const profileIsProOrBusiness = !isFreeUser || profileIsBusiness;

    const shouldDisplayEditThumbnailBtn =
      this.isInstagram() &&
      this.hasVideo() &&
      this.isExpanded() &&
      this.hasIGDirectPostingEnabled() &&
      hasIGDirectVideoFlip &&
      profileIsProOrBusiness &&
      composerFeedbackMessages.length < 1 && // don't allow user to edit thumbnail if can't add to queue
      draft.instagramFeedback.length < 1 && // don't allow user to edit thumbnail if post is reminder
      !appState.isOmniboxEnabled &&
      !isIE(); // not compatible with IE for first version

    const areAllSelectedProfilesIG = () => {
      const notInstagram = this.props.selectedProfiles.some(
        profile => profile.service.name !== 'instagram'
      );

      return !notInstagram || appState.expandedComposerId === 'instagram';
    };

    const shouldDisplayFirstCommentSection = () => {
      const {
        selectedProfiles: allSelectedProfiles,
        canStartProTrial,
      } = this.props;
      const hasSelectedSomeInstagramDirectProfiles = allSelectedProfiles.some(
        profile => profile.instagramDirectEnabled
      );
      return (
        areAllSelectedProfilesIG() &&
        (hasSelectedSomeInstagramDirectProfiles &&
          this.isInstagram() &&
          (profileIsProOrBusiness || canStartProTrial) &&
          this.isExpanded() &&
          !appState.isOmniboxEnabled)
      );
    };

    const shouldShowTwitterDuplicateContentWarningNotice =
      this.isExpanded() &&
      hasTwitterDuplicateWarningNotice &&
      draft.service.shouldShowDuplicateContentWarning;

    const addedToQueueCopyMap = new Map([
      [QueueingTypes.QUEUE, 'Added to queue!'],
      [QueueingTypes.NEXT, 'Added to queue!'],
      [QueueingTypes.NOW, 'Shared!'],
      [QueueingTypes.CUSTOM, 'Scheduled!'],
      [QueueingTypes.SAVE, 'Saved!'],
      [QueueingTypes.SAVE_AND_APPROVE, 'Saved!'],
    ]);

    const shouldShowCharacterCount =
      this.isExpanded() &&
      draft.service.charLimit !== null &&
      draft.service.charLimit - draft.characterCount <= 280;

    const shouldShowCommentCharacterCount =
      this.isExpanded() &&
      draft.service.commentCharLimit !== null &&
      draft.service.commentCharLimit - draft.characterCommentCount <= 280;

    const usesImageFirstLayout =
      draft.service.usesImageFirstLayout && draft.images.length === 0;
    const hasSuggestedMedia = this.getSuggestedMedia(true).length > 0;
    const suggestedMediaBoxClassName = [
      usesImageFirstLayout
        ? styles.imageFirstSuggestedMediaBox
        : !this.hasAttachmentSwitch()
        ? styles.suggestedMediaBoxAlignedBottom
        : '',
    ].join(' ');

    const mediaAttachmentClassName = usesImageFirstLayout
      ? styles.imageFirstMediaAttachment
      : hasSuggestedMedia
      ? styles.mediaAttachmentWithSuggestedMedia
      : '';

    const composerFooterClassName = usesImageFirstLayout
      ? styles.imageFirstFooter
      : styles.composerFooter;

    const selectedProfiles = this.getSelectedProfilesForService();
    const numSelectedProfiles = selectedProfiles.length;

    // allow if draft feedback states that an account is set up for reminders
    const feedbackNotEnabled =
      draft.instagramFeedback.length === 1 &&
      draft.instagramFeedback.some(feedback => feedback.code === 'NOT_ENABLED');

    const canAddUserTag =
      isProAndUpOrTeamMember &&
      this.isInstagram() &&
      selectedProfiles.some(profile => profile.instagramDirectEnabled) &&
      /* don't allow user to add tag if post is a reminder though its ok if more than one
      ig profile is selected and one doesnt have direct scheduling enabled */
      (draft.instagramFeedback.length < 1 || feedbackNotEnabled);

    const composerMediaAttachment = (
      <MediaAttachment
        draft={draft}
        draftId={draft.id}
        tempImage={draft.tempImage}
        images={draft.images}
        video={draft.video}
        gif={draft.gif}
        service={draft.service}
        maxAttachableImagesCount={draft.service.maxAttachableImagesCount}
        filesUploadProgress={draft.filesUploadProgress}
        visibleNotifications={this.props.visibleNotifications}
        className={mediaAttachmentClassName}
        usesImageFirstLayout={usesImageFirstLayout}
        composerPosition={composerPosition}
        canAddUserTag={canAddUserTag}
      />
    );

    const composerEditor = (
      <Editor
        draft={draft}
        profiles={profiles}
        onFocus={this.onEditorFocus}
        placeholder={editorPlaceholder()}
        isComposerExpanded={this.isExpanded()}
        shouldAutoFocus={this.state.shouldAutoFocusEditor}
        hasAttachmentGlance={this.hasAttachment()}
        hasLinkAttachment={this.isLinkAttachmentEnabled()}
        attachmentGlanceHasNoThumbnail={attachmentGlanceHasNoThumbnail}
        usesImageFirstLayout={usesImageFirstLayout}
        shouldEnableFacebookAutocomplete={shouldEnableFacebookAutocomplete}
        visibleNotifications={this.props.visibleNotifications}
        forceDecoratorsRerender={draft.forceDecoratorsRerender}
      />
    );

    const instagramThumbnailButton = (
      <InstagramThumbnailButton
        draftId={draft.id}
        video={draft.video}
        composerPosition={composerPosition}
      />
    );

    const composerSuggestedMediaBox = (
      <SuggestedMediaBox
        draftId={draft.id}
        suggestedMedia={this.getSuggestedMedia(true)}
        className={suggestedMediaBoxClassName}
      />
    );

    const shouldShowMediaAttachment =
      this.isExpanded() && this.isMediaAttachmentEnabled();
    const shouldShowSuggestedMediaBox =
      this.isExpanded() && this.isMediaAttachmentEnabled() && hasSuggestedMedia;

    const networkIconTooltipContent = this.getSelectedProfilesTooltipMarkup();

    const sourceUrl = draft.sourceLink !== null ? draft.sourceLink.url : null;
    const locationName = draft.locationName !== null ? draft.locationName : '';

    const socialNetworkIconClassName = [
      isLocked ? styles.lockedNetworkIcon : styles[`${draft.service.name}Icon`],
      numSelectedProfiles > 1 ? styles.iconWithProfileCount : '',
      `bi bi-circle-${draft.service.name}`,
    ].join(' ');

    const shouldDisplayCharCountAboveAttachment =
      shouldShowSuggestedMediaBox ||
      (this.isLinkAttachmentEnabled() && this.hasLinkAttachment()) ||
      (this.isRetweetAttachmentEnabled() && this.hasRetweetAttachment());

    const characterCountClassName = shouldDisplayCharCountAboveAttachment
      ? styles.aboveAttachmentCharCount
      : !shouldShowMediaAttachment
      ? styles.charCountNoMediaAttachment
      : styles.characterCountWrapper;

    return (
      <div className={composerClassName} onClick={this.onComposerClick}>
        <div
          className={socialNetworkIconClassName}
          onClick={this.onNetworkIconClick}
          data-profile-count={numSelectedProfiles}
          data-tip={networkIconTooltipContent}
          data-html
        />
        <div
          tabIndex="0"
          className={styles.hiddenA11yText}
          aria-label={composerHiddenTitle}
        />

        <div onClick={this.onUpdateZoneClick} className={updateZoneClassName}>
          {savedComposer && !areAllDraftsSaved && (
            <div className={savedComposerFeedbackClassNames}>
              {addedToQueueCopyMap.get(appState.draftSaveQueueingType)}
            </div>
          )}
          {shouldShowOmniboxNotices && (
            <div
              data-tip={this.getOmniboxNoticeTooltipMarkup()}
              data-html
              className={['bi bi-notification', styles.noticeIcon].join(' ')}
              ref={node => {
                this.noticeTooltip = node;
              }}
            >
              <Button
                onClick={this.removeNotice}
                className={[
                  'bi bi-notification-close',
                  styles.removeNoticeIcon,
                ].join(' ')}
              />
            </div>
          )}
          {shouldShowAlertIcons && !this.isExpanded() && (
            <div
              data-tip={this.getAlertIconTooltipMarkup()}
              data-html
              className={['bi bi-warning', styles.alertIcon].join(' ')}
            />
          )}

          {shouldShowComposerFeedbackMessages &&
            composerFeedbackMessages.map(what => (
              <div
                className={styles.composerFeedbackMessage}
                key={`${draft.id}-${what.message}`}
              >
                {what.message}
                {what.extra && what.extra}
              </div>
            ))}

          {shouldShowComposerNotPrefilledNotice && (
            <NotificationContainer
              visibleNotifications={visibleNotifications}
              scope={composerNotPrefilledNoticeScope}
              classNames={noticeClassNames}
              showCloseIcon
            />
          )}

          {shouldShowTwitterDuplicateContentWarningNotice && (
            <NotificationContainer
              visibleNotifications={visibleNotifications}
              scope={NotificationScopes.TWITTER_DUPLICATE_CONTENT_WARNING}
              classNames={noticeClassNames}
              showCloseIcon
            />
          )}

          {showComposerFbAutocompleteDisabledNotice && (
            <NotificationContainer
              visibleNotifications={visibleNotifications}
              scope={NotificationScopes.COMPOSER_FACEBOOK_AUTOCOMPLETE_DISABLED}
              classNames={noticeClassNames}
              showCloseIcon
            />
          )}

          {!usesImageFirstLayout && (
            <div className={styles.editorMediaContainer}>
              {composerEditor}

              {this.renderCharacterCount(
                draft,
                characterCountClassName,
                shouldShowCharacterCount
              )}

              {shouldShowMediaAttachment && (
                <div className={styles.mediaWrapper}>
                  {composerMediaAttachment}
                  {shouldDisplayEditThumbnailBtn && instagramThumbnailButton}
                  {shouldShowSuggestedMediaBox && composerSuggestedMediaBox}
                </div>
              )}
            </div>
          )}

          {usesImageFirstLayout && (
            <div className={styles.imageFirstContainer}>
              <div className={styles.imageFirstWrapper}>
                {shouldShowMediaAttachment && composerMediaAttachment}
                {composerEditor}
              </div>

              {this.renderCharacterCount(
                draft,
                styles.imageFirstCharacterCount,
                shouldShowCharacterCount
              )}

              {shouldDisplayEditThumbnailBtn && instagramThumbnailButton}
              {shouldShowSuggestedMediaBox && composerSuggestedMediaBox}
            </div>
          )}

          {this.isExpanded() &&
            this.isLinkAttachmentEnabled() &&
            this.hasLinkAttachment() && (
              <LinkAttachment
                link={draft.link}
                draftId={draft.id}
                service={draft.service}
                visibleNotifications={this.props.visibleNotifications}
                filesUploadProgress={draft.filesUploadProgress}
                appState={appState}
                selectedProfiles={selectedProfiles}
              />
            )}

          {this.isExpanded() && shouldShowRetweetAttachment && (
            <RetweetAttachment retweet={draft.retweet} draftId={draft.id} />
          )}

          {this.isExpanded() && (
            <div className={composerFooterClassName}>
              {this.shouldShowMediaAttachmentSwitch() && (
                <Button
                  onClick={this.onMediaAttachmentSwitchClick}
                  className={styles.attachmentSwitch}
                >
                  <i className={attachmentSwitchIconClassName} />
                  {mediaAttachmentSwitchCopy}
                </Button>
              )}

              {this.shouldShowLinkAttachmentSwitch() && (
                <Button
                  onClick={this.onLinkAttachmentSwitchClick}
                  className={styles.attachmentSwitch}
                >
                  <i className={linkAttachmentSwitchIconClassName} />
                  Replace with link attachment
                </Button>
              )}

              {this.shouldShowRetweetAttachmentSwitch() && (
                <Button
                  onClick={this.onRetweetAttachmentSwitchClick}
                  className={styles.attachmentSwitch}
                >
                  <i className={attachmentSwitchIconClassName} />
                  Replace with retweet
                </Button>
              )}

              <PinterestComposerBar
                serviceName={this.props.draft.service.name}
                profiles={profiles}
                draftId={draft.id}
                sourceUrl={sourceUrl}
                shouldShowInlineSubprofileDropdown={
                  shouldShowInlineSubprofileDropdown
                }
                visibleNotifications={visibleNotifications}
              />

              {shouldDisplayFirstCommentSection() && (
                <FirstCommentComposerBar
                  draft={draft}
                  onToggleSidebarVisibility={this.onToggleSidebarVisibility}
                  onCommentChange={this.onCommentChange}
                  onCommentClick={e =>
                    this.onCommentClick(e, profileIsProOrBusiness)
                  }
                  shouldDisplayProTag={!profileIsProOrBusiness}
                  shouldDisplayHashtagManager={profileIsBusiness}
                  shouldShowCommentCharacterCount={
                    shouldShowCommentCharacterCount
                  }
                />
              )}

              <ShopgridComposerBar
                isInstagram={this.isInstagram()}
                selectedInstagramProfiles={this.getSelectedInstagramProfiles()}
                hasShopgridFlip={hasShopgridFlip}
                isBusinessUser={this.props.isBusinessUser}
                draft={draft}
                draftId={draft.id}
                shopgridLink={draft.shopgridLink}
              />

              <LocationComposerBar
                withMediaAttachment={!usesImageFirstLayout}
                selectedProfiles={selectedProfiles}
                isInstagram={this.isInstagram()}
                hasIGLocationTaggingFeature={hasIGLocationTaggingFeature}
                hasIGDirectVideoFlip={hasIGDirectVideoFlip}
                hasVideo={this.hasVideo()}
                draftId={draft.id}
                locationName={locationName}
                instagramProfileId={this.getSelectedInstagramProfileId()}
                places={draft.places}
                locationId={draft.locationId}
              />
            </div>
          )}

          {shouldShowInstagramFeedback && this.isExpanded() && (
            <InstagramFeedback feedback={draft.instagramFeedback} />
          )}

          {this.hasAttachment() && !this.isExpanded() && (
            <AttachmentGlance
              draft={draft}
              attachmentType={this.props.draft.enabledAttachmentType}
              attachmentThumbnails={this.getAttachmentThumbnails()}
            />
          )}

          <NotificationContainer
            visibleNotifications={visibleNotifications}
            scope={`${NotificationScopes.PROFILE_QUEUE_LIMIT}-${draft.service.name}`}
            classNames={noticeClassNames}
          />

          <NotificationContainer
            visibleNotifications={visibleNotifications}
            scope={`${NotificationScopes.UPDATE_SAVING}-${ErrorTypes.INLINE}-${draft.service.name}`}
            classNames={inlineErrorClassNames}
          />

          {children}
        </div>
      </div>
    );
  }
}

export default Composer;
