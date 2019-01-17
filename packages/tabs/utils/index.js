const getBaseURL = () => {
  return window.location.hostname === 'publish.local.buffer.com' ? 'https://local.buffer.com' : 'https://buffer.com';
};

const openCalendarWindow = (profileId) => {
  window.location.href = `${getBaseURL()}/app/profile/${profileId}/buffer/queue/calendar/week/?content_only=true`;
};

export default openCalendarWindow;
