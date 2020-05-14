const getBufferData = ({ user, profiles }) => {
  if (typeof user === 'undefined' && typeof profiles === 'undefined') {
    return '';
  }

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
