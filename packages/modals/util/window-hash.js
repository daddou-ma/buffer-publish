const UPGRADE_TO_PRO_HASH = '#upgrade-to-pro';

export const shouldShowModal = () => {
  return window.location.hash.indexOf(UPGRADE_TO_PRO_HASH) === 0;
}

/**
 * Gets the source from the hash in the URL.
 * '#upgrade-to-pro--profile_limit' => 'profile_limit'
 */
export const getSourceFromHash = () => {
  const hash = window.location.hash || '';
  return hash.split('--')[1] || 'unknown';
};
