/**
 * See the code in `server/index.js` to see how the modal
 * to show on load is passed via a query param.
 */

const getShowModalKey = () => {
  if (window._showModal && window._showModal.key) {
    return window._showModal.key;
  }
  return '';
};

export const getShowModalValue = () => {
  if (window._showModal && window._showModal.value) {
    return window._showModal.value;
  }
  return '';
};

export const resetShowModalKey = () => {
  if (window._showModal && window._showModal.key) {
    window._showModal = null;
  }
};

export const shouldShowStealProfileModal = () =>
  getShowModalKey() === 'steal-profile-modal';

export const shouldShowInstagramFirstCommentModal = () =>
  getShowModalKey() === 'instagram-first-comment-modal';

export const shouldShowWelcomeModalPaidUsers = () =>
  getShowModalKey() === 'welcome-modal-2';

export const shouldShowInstagramDirectPostingModal = () =>
  getShowModalKey() === 'ig-direct-post-modal';

export const shouldShowSwitchPlanModal = () => {
  if (getShowModalKey().indexOf('upgrade-to-pro') === 0) return 'pro';
  if (getShowModalKey().indexOf('upgrade-to-premium') === 0) return 'premium_business';
  if (getShowModalKey().indexOf('upgrade-to-small') === 0) return 'small';

  return null;
};

/**
 * Extracts a source from the modal key in the URL
 * 'upgrade-to-pro--profile_limit' => 'profile_limit'
 */
export const getSourceFromKey = () => {
  const key = getShowModalKey();
  return key.split('--')[1] || 'unknown';
};
