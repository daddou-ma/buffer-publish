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

export const shouldShowStealProfileModal = () =>
  window.location.hash.match(/#show-cant-transfer-profile\/?$/i);

export const shouldShowWelcomeModal = () =>
  getShowModalKey() === 'welcome-modal-1';

export const shouldShowWelcomeModalPaidUsers = () =>
  getShowModalKey() === 'welcome-modal-2';

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

export const getURLParameter = (name) => {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[?|&]${name}=([^&#]*)`);
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
