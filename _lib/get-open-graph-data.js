const ogs = require('open-graph-scraper');
const Cache = require('./fs-cache');
const openGraphCache = new Cache('./open-graph-cache.json');
const debug = require('debug')('open-graph');

module.exports = function getOpenGraphData(link = '', callback) {
  let url;
  try {
    url = new URL(link).href;
  } catch (e) {
    debug(`Error: unable to parse url '${link}': ${e}`);
    return callback(null, null);
  }
  if (openGraphCache.has(url)) {
    debug(`Using cached data for ${url}`);
    return callback(null, openGraphCache.get(url));
  }
  ogs({ url, followRedirect: true, ogImageFallback: true })
    .then(({ result }) => {
      debug('Successfully fetched data for ' + url);
      try {
        openGraphCache.set(url, result);
      } catch (e) {
        debug(e);
      }
      callback(null, result);
    })
    .catch((err) => {
      debug(`Warning: failed to fetch data for ${url}: ${err}`);
      try {
        openGraphCache.set(url, null);
      } catch (e) {
        debug(e);
      }
      callback(null, null);
    });
};
