const serialize = require('serialize-javascript');

const notificationScript = notification => {
  if (!notification) {
    return '';
  }

  let variable = '';

  if (notification.variable) {
    variable = `variable: ${serialize(notification.variable, {
      isJSON: true,
    })}`;
  }

  return `
    <script type="text/javascript">
        window._notification = {
          type: ${serialize(notification.type, { isJSON: true })},
          key: ${serialize(notification.key, { isJSON: true })},
          ${variable}
        };
    </script>
  `;
};

module.exports = notificationScript;
