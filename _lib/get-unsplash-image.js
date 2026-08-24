const { createApi } = require('unsplash-js');
const fetch = require('node-fetch');
const Cache = require('./fs-cache');

const cache = new Cache('./unsplash-image-cache.json');

async function getUnsplashImage(photoId) {
  let response = cache.get(photoId);
  if (!response) {
    const unsplash = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY,
      fetch,
    });

    const resp = await unsplash.photos.get({ photoId });

    if (resp.type !== 'success') {
      console.error(resp.errors?.[0] || resp);
      throw new Error(resp.errors?.[0] || resp);
    }

    response = resp.response;
    cache.set(photoId, response);
  }

  // Images themselves are downloaded once via _scripts/download-unsplash-images.js
  // into images/cached/ — see that script if a new unsplashImageId shows up missing.
  const image = {
    url: `/images/cached/unsplash-${photoId}.jpg`,
    alt: response.alt_description,
    description: response.description,
    link: response.links.html,
    authorName: response.user.name,
    thumb: `/images/cached/unsplash-${photoId}-thumb.jpg`,
  };

  return image;
}
//
// getUnsplashImage('ZXUnL-s5aWE')
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = getUnsplashImage;
