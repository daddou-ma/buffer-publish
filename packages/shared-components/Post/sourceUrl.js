const getFormattedSourceUrl = preformattedUrl => {
  /* create href a tag to easily grab hostname */
  const el = document.createElement('a');
  if (!preformattedUrl.includes('http')) {
    preformattedUrl = `http://${preformattedUrl}`;
  }
  el.href = preformattedUrl;
  /* finds www. or any number after example: www2. */
  const formattedUrl = el.hostname.replace(/(www[0-9]?\.)/, '');
  return formattedUrl;
};

export default getFormattedSourceUrl;
