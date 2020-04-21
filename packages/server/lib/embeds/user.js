/**
 * Generate a script to pass the user ID to the app.
 *
 * @param {Object} user object
 */
const getUserScript = user => `
<script type="text/javascript">
  window._user = ${JSON.stringify(user)};
</script>
`;

module.exports = getUserScript;
