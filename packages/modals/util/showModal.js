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

export const shouldShowWelcomeModal = () =>
  getShowModalKey() === 'welcome-modal-1';

export const shouldShowWelcomeModalPaidUsers = () =>
  getShowModalKey() === 'welcome-modal-2';

export const shouldShowInstagramDirectPostingModal = () =>
  getShowModalKey() === 'ig-direct-post-modal';

export const shouldShowUpgradeModal = () =>
  getShowModalKey().indexOf('upgrade-to-pro') === 0;

/**
 * Extracts a source from the modal key in the URL
 * 'upgrade-to-pro--profile_limit' => 'profile_limit'
 */
export const getSourceFromKey = () => {
  const key = getShowModalKey();
  return key.split('--')[1] || 'unknown';
};
