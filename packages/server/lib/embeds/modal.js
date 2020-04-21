const serialize = require('serialize-javascript');

const showModalScript = (key, val) => {
  if (!key) {
    return '';
  }

  let value = '';

  if (val) {
    value = `value: ${serialize(val, { isJSON: true })}`;
  }

  return `
    <script type="text/javascript">
        window._showModal = {
          key: ${serialize(key, { isJSON: true })},
          ${value}
        };
    </script>
  `;
};

module.exports = showModalScript;
