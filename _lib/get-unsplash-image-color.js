const axios = require('axios');
const debug = require('debug')('unsplash');
const Cache = require('./fs-cache');

const cache = new Cache('./unsplash-color-cache.json');

module.exports = async function getUnsplashImageColor(url, type = 'muted_dark') {
  if (!url.includes('unsplash')) return null;
  const key = url + type;
  if (cache.has(key)) {
    debug(`Using cached color for ${key}`);
    return cache.get(key);
  }
  try {
    const { location } = await getHeaders(url);
    const colorsAPIUrl = new URL(location);
    colorsAPIUrl.search = new URLSearchParams({
      palette: 'json',
    });
    debug(`Fetching color ${type} for ${url}`);
    const response = await axios(colorsAPIUrl.href);
    const color = response?.data?.dominant_colors[type].hex || '';
    cache.set(key, color);
    return color;
  } catch (e) {
    debug(`Error: could not fetch colors for ${url}. ${e}`);
    cache.set(key, undefined);
    return null;
  }
};

async function getHeaders(url) {
  const parsedURL = new URL(url);
  parsedURL.search = '';
  const response = await axios({
    url: stripSearch(url),
    method: 'HEAD',
    maxRedirects: 0,
    validateStatus: (status) => status < 400,
  });
  return response.headers;
}

function stripSearch(url) {
  const parsed = new URL(url);
  parsed.search = '';
  return parsed.href;
}
