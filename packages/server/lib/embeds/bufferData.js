const getBufferData = ({ user, profiles }) => {
  if (typeof user === 'undefined' && typeof profiles === 'undefined') {
    return '';
  }

  // mitigation for cache attack via cloudflare - https://buffer.atlassian.net/browse/PUB-2743
  user = undefined;

  const bufferData = {};

  if (typeof user !== 'undefined') {
    bufferData.user = user;
  }
  if (typeof profiles !== 'undefined') {
    bufferData.profiles = profiles;
  }

  return `
<script>
  try {
    window.bufferData = ${JSON.stringify(bufferData)};
  } catch(e) {}
</script>`;
};

module.exports = getBufferData;
