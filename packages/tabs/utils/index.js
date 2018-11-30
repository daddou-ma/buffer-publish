const openPopup = (url, title, w, h) => {
  const left = (screen.width / 2) - (w / 2);
  const top = (screen.height / 2) - (h / 2);
  const newWindow = window.open(url, title, `scrollbars=yes, width=${w}, height=${h}, top=${top} left=${left}`);

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
};

const getBaseURL = () => {
  return window.location.hostname === 'publish.local.buffer.com' ? 'https://local.buffer.com' : 'https://buffer.com';
};

const openCalendarWindow = (profileId) => {
  const calendarURL = `${getBaseURL()}/app/profile/${profileId}/buffer/queue/calendar/week/?calendar_only=true`;
  openPopup(calendarURL, 'CalendarView', 800, 950);
};

export default openCalendarWindow;
