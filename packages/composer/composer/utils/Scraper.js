/* globals Bugsnag */
/**
 * Scrape urls to retrieve information about them.
 *
 * Returns a Promise that resolves with the JSON response from the appropriate
 * Scraper.urls entry as an object literal.
 *
 * Results are cached, and a same request done simultaneously will be
 * queued to return the same info as the already-running request.
 */

import Request from '@bufferapp/buffer-js-request';

class Scraper {
  static urls = new Map([
    ['local', 'https://scraper.local.buffer.com'],
    ['production', 'https://scraper.buffer.com'],
  ]);

  static pendingRequests = new Map(); // Stores pending scraper promises
  static cache = new Map(); // Stores results

  static encodeUrl(url) {
    // Ensure the url is encoded, but not double encoded
    try {
      return encodeURI(decodeURI(url));
    } catch (err) {
      return url;
    }
  }

  static scrape(url, environment = 'production') {
    // If the result is cached, return it right away
    if (this.cache.has(url)) return Promise.resolve(this.cache.get(url));

    // If a request about the same url is already running, return a
    // Promise that'll resolve with that request's data
    if (this.pendingRequests.has(url)) {
      return Promise.resolve(this.pendingRequests.get(url));
    }

    const encoded = this.encodeUrl(url);

    const request = Request.get(Scraper.urls.get(environment), { url: encoded })
      .then(response => {
        if (response.status >= 500 && environment === 'production') {
          window.bugsnagClient.notify(
            new Error('Scraper returned 5xx error code'),
            {
              metaData: {
                Scraper: {
                  url: encoded,
                  responseCode: response.status,
                },
              },
            }
          );
        }
        return response;
      })
      .then(response => response.json())
      .then(urlData => {
        this.cache.set(url, urlData);
        this.pendingRequests.delete(url);

        return urlData;
      });

    this.pendingRequests.set(url, request);

    return request;
  }
}

export default Scraper;
