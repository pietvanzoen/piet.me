const fs = require('fs').promises;
const glob = require('glob');
const sharp = require('sharp');
const path = require('path');

const successList = [];
const errorList = {};

glob(`_site/images/**/*.{jpg,jpeg,png}`, function (er, files) {
  if (er) {
    console.error(er);
    process.exit(1);
  }

  Promise.all(files.map((file) => resize(file))).then(() => {
    const failCount = Object.keys(errorList).length;
    console.log();
    console.log('TOTAL:', files.length);
    console.log('OKAY:', successList.length);
    console.log('FAIL:', failCount);

    if (process.env.DEBUG) {
      console.log('Successful:');
      console.log(JSON.stringify(errorList, null, 2));

      console.log('Failed:');
      console.log(JSON.stringify(errorList, null, 2));
    }
  });
});

function resize(file) {
  return sharp(file)
    .resize({ width: 1400, height: 1400, withoutEnlargement: true, fit: 'inside' })
    .rotate()
    .toFormat(path.extname(file).replace('.', ''), {
      progressive: true,
      quality: 80,
    })
    .toBuffer()
    .then((buffer) => fs.writeFile(file, buffer))
    .then(() => {
      process.stdout.write('.');
      successList.push(file);
    })
    .catch((err) => {
      process.stdout.write('x');
      errorList[file] = {
        message: err.message,
        fileName: err.fileName,
        lineNumber: err.lineNumber,
      };
    });
}
