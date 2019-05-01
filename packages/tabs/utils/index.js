import { getURL } from '@bufferapp/publish-formatters';

const openCalendarWindow = (profileId) => {
  window.location.href = `${getURL.getBaseURL()}/app/profile/${profileId}/buffer/queue/calendar/week/?content_only=true`;
};

const openBillingWindow = () => {
  window.location.href = `${getURL.getBaseURL()}/app/account/receipts?content_only=true`;
};

export { openCalendarWindow, openBillingWindow };
