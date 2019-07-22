const trackEvent = ({ eventName, payload }, callbacks) => {
  if (window.analytics) {
    window.analytics.track(
      eventName,
      Object.assign({
        product: window.PRODUCT_TRACKING_KEY,
      }, payload), callbacks);
  }
};

export default trackEvent;
