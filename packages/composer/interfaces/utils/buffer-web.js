/* globals buffer Backbone */

/**
 * Utils used by scripts outside the MC bundle, i.e. in Buffer's dashboard.
 * The purpose of these scripts is mostly to handle MC's iframe and send data to MC.
 * See README at the root of /multiple-composers for higher-level architecture info.
 */

const bufferOriginRegex = /https?:\/\/(?:[^.]+\.)?buffer(?:app)?\.com/;
const bufferOrigins = new Map([
  ['local', 'https://local.buffer.com'],
  [
    'production',
    bufferOriginRegex.test(window.location.origin)
      ? window.location.origin
      : 'https://buffer.com',
  ],
]);

const getElRefOffset = (el, dir = 'top', ref = document.body) => {
  const offsetPosMethodName = dir !== 'left' ? 'offsetTop' : 'offsetLeft';
  let offset = el[offsetPosMethodName];

  while ((el = el.offsetParent) !== ref) {
    // eslint-disable-line
    offset += el[offsetPosMethodName];
  }

  return offset;
};

let resolveIframePromise;
let rejectIframePromise;
let isIframeVisible = false;
let environment;
let onDraftsSaved;
let placeholder;
let prevOpenProfilesIds;

const mcIframe = new Promise((resolve, reject) => {
  resolveIframePromise = resolve;
  rejectIframePromise = reject;
})
  .then(v => {
    mcIframe.resolved = true;
    return v;
  })
  .catch(r => {
    mcIframe.resolved = true;
    throw r;
  });

/**
 * Initialize MC from outside its iframe.
 *
 * Takes a bunch of data that serves to initialize MC in the proper state:
 *
 * @param {string} env - the environment from which data is imported (one of
 *                       DataImportEnvironments in AppContants)
 * @param {object} data - collection of data pieces with which to initialize MC
 * @param {array} data.profiles - collection of profiles to show in the profile selector,
 *                                including profiles to be selected by default
 * @param {object} data.bufferGlobal - the `buffer` global found in most environments, will
 *                                     be serialized to retrieve additional small pieces of data
 * @param {object} [data.update={}] - update object, if MC is to be prefilled with update data
 * @param {string} [data.subprofileId=null] - id of a subprofile to auto-select
 * @param {number} [data.scheduledAt=null] - timestamp to be used as the prefilled scheduled time
 * @param {boolean} [data.isPinnedToSlot=null] - is this update pinned to a schedule slot?
 * @param {object} [options={}] - options to govern the frame's and MC's behavior
 * @param {object} [options.domNode=null] - any DOM element that MC should be positioned on top of;
 *                                          if not provided, MC will be positioned like a modal
 * @param {object} [options.canSelectProfiles=true] - should profiles be visible and selectable?
 * @param {object} [options.preserveStateOnClose=false] - should composer state be preserved when closing w/o saving?
 * @param {object} [options.saveButtons] - what save options should be available; defaults to
 *                                         ['ADD_TO_QUEUE','SHARE_NEXT','SHARE_NOW','SCHEDULE_POST']
 * @param {object} [options.onSave] - callback function to execute when updates are saved
 */
const init = ({
  env,
  data: {
    profiles,
    bufferGlobal,
    update = {},
    subprofileId = null,
    scheduledAt = null,
    isPinnedToSlot = null,
  },
  options: {
    domNode = null,
    canSelectProfiles,
    preserveStateOnClose = false,
    saveButtons,
    onSave = () => {},
  } = {},
}) => {
  onDraftsSaved = onSave;

  const shouldAttachToDomNode = domNode !== null;

  const windowPosition = shouldAttachToDomNode
    ? {
        top: getElRefOffset(domNode, 'top'),
        left: getElRefOffset(domNode, 'left'),
      }
    : {
        top:
          (window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop) + 50,
      };

  const openProfilesIds = getOpenProfilesIdsFromBufferGlobal(bufferGlobal);
  const resetSelectedProfiles =
    prevOpenProfilesIds !== undefined &&
    (openProfilesIds.length !== prevOpenProfilesIds.length ||
      prevOpenProfilesIds.some(id => !openProfilesIds.includes(id)));
  prevOpenProfilesIds = openProfilesIds;

  const {
    userData,
    metaData,
    csrfToken,
    imageDimensionsKey,
  } = extractSerializablePropsFromBufferGlobal(env, bufferGlobal);

  environment = metaData.environment;

  if (!mcIframe.resolved) {
    placeholder = document.createElement('div');
    document.body.appendChild(placeholder);
    placeholder.innerHTML = `
      <style>
        #composer-placeholder {
          position: absolute;
          top: ${windowPosition.top}px;
          left: ${shouldAttachToDomNode ? `${windowPosition.left}px` : '50%'};
          transform: ${shouldAttachToDomNode ? 'none' : 'translateX(-50%)'};
          z-index: 100;
          background: #fff;
          width: 686px;
          border: 1px solid #d5dce3;
          border-radius: 3px;
          background: #fff;
          box-shadow: 0 1px 2px 0 rgba(0,0,0,.28);
          padding: 20px;
          box-sizing: border-box;
        }

        #composer-placeholder > div {
          position: relative;
          width: 610px;
          height: 40px;
          margin-left: 34px;
          border: 1px solid #eef1f4;
          border-radius: 3px;
          box-sizing: border-box;
          animation: fadeInOut 0.75s ease-in alternate infinite;
        }

        #composer-placeholder > div:nth-child(2) {
          animation-delay: 0.125s;
        }

        #composer-placeholder > div:nth-child(3) {
          animation-delay: 0.25s;
        }

        #composer-placeholder > div:not(:last-child) {
          margin-bottom: 10px;
        }

        #composer-placeholder > div::before {
          content: "";
          position: absolute;
          top: 10px;
          left: -34px;
          width: 20px;
          height: 20px;
          background: #eef1f4;
          border-radius: 50%;
        }

        #composer-placeholder > div::after {
          content: "";
          position: absolute;
          top: 9px;
          right: 9px;
          bottom: 9px;
          left: 9px;
          background: #eef1f4;
          border-radius: 3px;
        }

        @keyframes fadeInOut {
          from { opacity: 0.75; }
          to { opacity: 0.35; }
        }
      </style>
      <div id="composer-placeholder" onclick="event.stopPropagation()">
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }

  mcIframe.then(iframe => {
    // When composer is loaded, remove placeholder slightly after composer
    // becomes visible to make sure there's a smooth visual transition
    // between the two states
    if (placeholder !== undefined) {
      setTimeout(() => {
        document.body.removeChild(placeholder);
        placeholder = undefined;
      }, 500);
    }

    iframe.contentWindow.postMessage(
      {
        type: 'init',
        env,
        data: {
          profiles,
          userData,
          metaData,
          csrfToken,
          imageDimensionsKey,
          update,
          subprofileId,
          scheduledAt,
          isPinnedToSlot,
        },
        options: {
          canSelectProfiles,
          preserveStateOnClose,
          resetSelectedProfiles,
          saveButtons,
          position: windowPosition,
        },
      },
      bufferOrigins.get(environment)
    );

    iframe.style.display = 'block';
    isIframeVisible = true;
  });
};

const hide = ({
  preserveStateOnClose = false,
  stopPropagation = false,
} = {}) => {
  // If the loading placeholder is visible, close it
  if (placeholder !== undefined) {
    document.body.removeChild(placeholder);
    placeholder = undefined;
  }

  mcIframe.then(iframe => {
    if (!isIframeVisible) return;

    if (!preserveStateOnClose && !stopPropagation) {
      iframe.contentWindow.postMessage(
        {
          type: 'reset-and-hide',
        },
        bufferOrigins.get(environment)
      );
    }

    iframe.style.display = 'none';
    isIframeVisible = false;
  });
};

const onIframeMessage = e => {
  const isBufferOrigin = bufferOriginRegex.test(e.origin);
  if (!isBufferOrigin) return;

  switch (e.data.type) {
    // If users mousedown inside the editor, select some text and then mouseup
    // outside the app's window, this action will also trigger a click, which would
    // hide the composer. We double-check a click doesn't follow the action
    // of selecting text before hiding the composer.
    case 'backdrop-click': {
      mcIframe.then(iframe => {
        const isClickFollowingSelection =
          iframe.contentWindow.getSelection().toString().length > 0;
        if (!isClickFollowingSelection) {
          const { preserveStateOnClose } = e.data;
          hide({ preserveStateOnClose });
        }
      });
      break;
    }

    case 'drafts-saved': {
      const { preserveStateOnClose } = e.data;
      if (!preserveStateOnClose) hide();

      onDraftsSaved();
      // eslint-disable-next-line no-new
      new buffer.View.Notice({
        model: new Backbone.Model({ message: e.data.message }),
      });
      break;
    }

    case 'click-switch-plan-modal': {
      if (buffer.AppDispatcher) {
        buffer.AppDispatcher.handleViewAction({
          actionType: buffer.ModalActionTypes.OPEN_MODAL,
          name: 'ModalUpgradeToAwesome',
          /* Hard code 'queue_limit' here for now since that's the only one we use */
          props: { utm: 'queue_limit' },
        });
      }
      break;
    }

    case 'composer-was-reset-and-hidden':
      // Only hide "locally", since we're reacting to a "reset" event already
      hide({ stopPropagation: true });
      break;

    default:
      break;
  }
};

// Setup MC iframe by inserting it into the DOM and waiting for it to load
const setup = () => {
  const frameId = 'multiple-composers-iframe';

  if (document.getElementById(frameId) !== null) {
    rejectIframePromise(
      "Can't setup Multiple Composers iframe: frame already setup"
    );
  }

  const iframe = document.createElement('iframe');
  iframe.id = frameId;
  iframe.src = '/add?app=WEB';
  iframe.style.display = 'none';
  iframe.style.position = 'absolute';
  iframe.style.top = 0;
  iframe.style.left = 0;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
  // In buffer-web, the highest z-index used is 9999, except 999999 for notifications
  iframe.style.zIndex = 99999;

  iframe.addEventListener('load', () => resolveIframePromise(iframe));
  iframe.addEventListener('error', rejectIframePromise);

  window.addEventListener('message', onIframeMessage);

  document.body.appendChild(iframe);
};

/**
 * The buffer global has a complex data structure which makes it unserializable.
 * This method extracts serializable versions of the values we're interested in
 * so that we're able to send them over postMessage. Those values are formatted
 * later in DataImportUtils.js
 */
function extractSerializablePropsFromBufferGlobal(env, bufferGlobal) {
  const unfilteredUserData = bufferGlobal.data.user.toJSON();

  return {
    userData: {
      id: unfilteredUserData._id,
      s3_upload_signature: unfilteredUserData.s3_upload_signature,
      uses_24h_time: unfilteredUserData.twentyfour_hour_time,
      week_starts_monday: unfilteredUserData.week_starts_monday,
      has_ig_direct_flip: unfilteredUserData.features.includes(
        'instagram_direct_posting'
      ),
      profile_groups: unfilteredUserData.profile_groups,
      is_free_user: bufferGlobal.data.user.isFree(),
      has_simplified_free_plan_ux: bufferGlobal.data.user.hasSimplifiedFreePlanUX(),
      skip_empty_text_alert: bufferGlobal.data.user.hasReadMessage(
        'remember_confirm_saving_modal'
      ),
      // Same logic as user_model.php#onBusinessPlan()
      is_business_user:
        unfilteredUserData.features.includes('improved_analytics') ||
        (unfilteredUserData.plan_code >= 10 &&
          unfilteredUserData.plan_code <= 19),
      hasIGLocationTaggingFeature: unfilteredUserData.features.includes(
        'instagram-location-tagging'
      ),
      hasIGDirectVideoFlip: bufferGlobal.data.user.hasFeature(
        'ig_direct_video_posting'
      ),
    },
    metaData: {
      application: bufferGlobal.application,
      environment: bufferGlobal.environment,
      should_enable_fb_autocomplete: bufferGlobal.data.user.hasFeature(
        'mc_facebook_autocomplete'
      ),
      enable_twitter_march_18_changes: bufferGlobal.data.user.hasFeature(
        'twitter-march-18-changes'
      ),
      should_use_new_twitter_autocomplete: bufferGlobal.data.enabled_application_modes.includes(
        'web-twitter-typeahead-autocomplete'
      ),
      should_show_rollout_tooltip: bufferGlobal.data.user.hasExperiment(
        'mc-dashboard_phase_5',
        'enabled'
      ),
      disable_telemetry: false, // Only used in Firefox extension for now
    },
    csrfToken: bufferGlobal.csrf,
    imageDimensionsKey: bufferGlobal.data.imagedimensions_key,
  };
}

function getOpenProfilesIdsFromBufferGlobal(bufferGlobal) {
  const profiles = bufferGlobal.data.profiles.toJSON();
  const openProfiles = profiles.filter(profile => profile.open === true);

  return openProfiles.map(profile => profile.id);
}

export { setup, init, hide };
