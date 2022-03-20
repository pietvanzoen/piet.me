const ogs = require('open-graph-scraper');
const Cache = require('./fs-cache');
const openGraphCache = new Cache('./open-graph-cache.json');

module.exports = function getOpenGraphData(link = '', callback) {
  let url;
  try {
    url = new URL(link).href;
  } catch (e) {
    console.error(`Error: unable to parse url '${link}': ${e}`);
    return callback(null, null);
  }
  if (openGraphCache.has(url)) {
    console.log(`Using cached data for ${url}`);
    return callback(null, openGraphCache.get(url));
  }
  ogs({ url, followRedirect: true, ogImageFallback: true })
    .then(({ result }) => {
      console.log('Successfully fetched data for ' + url);
      try {
        openGraphCache.set(url, result);
      } catch (e) {
        console.warn(e);
      }
      callback(null, result);
    })
    .catch((err) => {
      console.error(`Warning: failed to fetch data for ${url}: ${err}`);
      try {
        openGraphCache.set(url, null);
      } catch (e) {
        console.warn(e);
      }
      callback(null, null);
    });
};
