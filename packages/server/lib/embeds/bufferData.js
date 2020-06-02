const getBufferData = ({ user, profiles, organizations }) => {
  if (
    typeof user === 'undefined' &&
    typeof profiles === 'undefined' &&
    typeof organizations === 'undefined'
  ) {
    return '';
  }

  const bufferData = {};

  if (typeof user !== 'undefined') {
    bufferData.user = user;
  }
  if (typeof profiles !== 'undefined') {
    bufferData.profiles = profiles;
  }
  if (typeof organizations !== 'undefined') {
    bufferData.organizations = organizations;
  }

  return `
<script>
  try {
    window.bufferData = ${JSON.stringify(bufferData)};
  } catch(e) {}
</script>`;
};

module.exports = getBufferData;
