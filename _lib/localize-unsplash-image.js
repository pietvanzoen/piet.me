const fs = require('fs');
const debug = require('debug')('unsplash');
const axios = require('axios');
const { join } = require('path');

module.exports = function localizeUnsplashImage(id, dimentions, callback) {
  const imgSrcPath = `/images/cached/${id}-${dimentions}.jpg`;
  const destPath = join('_site', imgSrcPath);
  if (fs.existsSync(destPath)) {
    debug(`Using cached file ${destPath}`);
    return callback(null, imgSrcPath);
  }

  const url = `https://source.unsplash.com/${id}/${dimentions}?fm=jpg`;
  debug(`Downloading ${url} to ${destPath}`);
  downloadFile(url, destPath)
    .then(() => {
      callback(null, imgSrcPath);
    })
    .catch((err) => {
      callback(err);
    });
};

async function downloadFile(url, path) {
  const writer = fs.createWriteStream(path);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}
