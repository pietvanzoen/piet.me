const pluginSass = require('eleventy-plugin-sass');
const yaml = require('js-yaml');
const md = require('./_lib/markdown-engine');
const queryString = require('query-string');
const embedTwitter = require('eleventy-plugin-embed-twitter');
const _ = require('lodash');
const localImages = require('eleventy-plugin-local-images');
const getOpenGraphData = require('./_lib/get-open-graph-data');
const dayjs = require('./_lib/dayjs');
const updatesCollection = require('./_lib/updates-collection');

const now = new Date();

const { ELEVENTY_PRODUCTION } = process.env;

module.exports = function (cfg) {
  // Plugins
  cfg.addPlugin(pluginSass);
  cfg.addPlugin(embedTwitter, {
    cacheText: ELEVENTY_PRODUCTION === 'true',
  });
  cfg.addPlugin(localImages, {
    distPath: '_site',
    assetPath: '/images',
    selector: 'img',
    verbose: true,
  });

  // Copy
  cfg.addPassthroughCopy('fonts');
  cfg.addPassthroughCopy('images');

  // Collections
  cfg.addCollection('blog', (collection) =>
    collection.getFilteredByGlob('./blog/*.md').filter((item) => item.data.draft !== true && item.date <= now)
  );
  cfg.addCollection('updates', updatesCollection);
  cfg.addShortcode('query', (data) => {
    return (
      '?' +
      queryString.stringify(
        Object.keys(data).reduce((obj, key) => (key.startsWith('_') ? obj : { ...obj, [key]: data[key] }), {})
      )
    );
  });

  // Extentions / Libraries
  cfg.setLibrary('md', md);
  cfg.addDataExtension('yaml', yaml.safeLoad);

  // Filters
  cfg.addFilter('markdown', (contents) => md.render(contents));
  cfg.addFilter('date', (date, format) => dayjs(date).format(format));
  cfg.addFilter('dateRelative', (date) => dayjs(date).fromNow());
  cfg.addFilter('debug', (obj) => `<pre style="overflow-x: auto;"><code>${JSON.stringify(obj, null, 2)}</code></pre>`);
  cfg.addFilter('encodeURIComponent', (str) => encodeURIComponent(str));
  cfg.addFilter('getHost', (url) => new URL(url).host);
  cfg.addFilter('cacheBust', (url) => (!ELEVENTY_PRODUCTION ? url : `${url}?${Date.now()}`));
  cfg.addFilter('parseLinks', (content) =>
    _.compact(
      _.uniq((content || '').match(/href="(https?:\/\/\S+)"/) || []).filter(
        (s) => !s.includes('twitter') && !s.startsWith('href')
      )
    )
  );
  cfg.addNunjucksAsyncFilter('getOpenGraphData', getOpenGraphData);

  return {
    dir: {
      layouts: '_layouts',
    },
  };
};
