import notificationMessages from './notifications.json';

function replaceVariable(message, variable) {
  return message.replace(/{{__variable__}}/, variable);
}

function getNotificationMessage(type, key, variable = null) {
  const typePresent = Object.prototype.hasOwnProperty.call(
    notificationMessages,
    type
  );
  if (!typePresent) {
    return null;
  }

  const messagePresent = Object.prototype.hasOwnProperty.call(
    notificationMessages[type],
    key
  );
  if (!messagePresent) {
    return null;
  }

  const message = notificationMessages[type][key];

  if (variable) {
    return replaceVariable(message, variable);
  }

  return message;
}

export default getNotificationMessage;
