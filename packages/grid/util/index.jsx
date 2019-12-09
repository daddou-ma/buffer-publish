export const getBaseURL = () => {
  return window.location.hostname === 'publish.local.buffer.com'
    ? 'local.buffer.com'
    : 'buffer.com';
};

export const openPreviewPage = url => {
  window.open(url, '_blank');
};

export const isValidURL = str => {
  const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return regexp.test(str);
};

export const urlHasProtocol = url =>
  url.indexOf('https://') !== -1 || url.indexOf('http://') !== -1;

export const getChannelProperties = channel => ({
  channelId: channel.id,
  channelServiceId: channel.serviceId,
  channelUsername: channel.serviceUsername,
});
