export const getBaseURL = () => {
  return window.location.hostname === 'publish.local.buffer.com' ? 'local.buffer.com' : 'buffer.com';
};
