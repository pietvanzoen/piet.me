const { createApi } = require('unsplash-js');
const fetch = require('node-fetch');
const Cache = require('./fs-cache');

const cache = new Cache('./unsplash-image-cache.json');

async function getUnsplashImage(photoId, { dimentions, format = 'jpg' } = {}) {
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

  const url = new URL(response.urls.raw);
  if (dimentions) {
    url.searchParams.set('w', dimentions[0]);
    url.searchParams.set('h', dimentions[1]);
  }
  url.searchParams.set('fm', format);
  url.searchParams.set('dpr', 2);
  url.searchParams.set('fit', 'crop');

  const image = {
    url: url.href,
    alt: response.alt_description,
    description: response.description,
    link: response.links.html,
    authorName: response.user.name,
    thumb: response.urls.thumb,
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
