const pluginSass = require("eleventy-plugin-sass");
const dayjs = require('dayjs');
const yaml = require('js-yaml');
const md = require('./lib/markdown-engine');
const queryString = require('query-string');
const embedTwitter = require("eleventy-plugin-embed-twitter");
const ogs = require('open-graph-scraper');
const _ = require('lodash');
const Cache = require('./lib/fs-cache');
const localImages = require('eleventy-plugin-local-images');

dayjs.extend(require('dayjs/plugin/advancedFormat'))
dayjs.extend(require('dayjs/plugin/relativeTime'))
const now = new Date()

const { ELEVENTY_PRODUCTION } = process.env;

const openGraphCache = new Cache('./open-graph-cache.json');

module.exports = function (eleventyConfig) {

  // Plugins
  eleventyConfig.addPlugin(pluginSass);
  eleventyConfig.addPlugin(embedTwitter, {
    cacheText: ELEVENTY_PRODUCTION === 'true',
  });

  // Copy
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPlugin(localImages, {
    distPath: '_site',
    assetPath: '/images',
    selector: 'img',
    verbose: true
  });

  // Collections
  eleventyConfig.addCollection("blog", function(collection) {
    return collection.getFilteredByGlob("./blog/*.md").filter((item) => {
      return item.data.draft !== true && item.date <= now;
    });
  });
  eleventyConfig.addCollection("updates", function updates(collection) {
    return collection.getFilteredByGlob("./updates/*.md").reduce((items, item) => {
      if (item.url.includes('README')) return items;
      item.data.alsoOn = _.compact([_.first(item.data.twitter), _.first(item.data.mastodon)]);
      item.template.frontMatter.content = item.template.frontMatter.content.replace(/\/media\//g, '/images/media/');
      return items.concat(item);
    }, []).reverse();
  });

  eleventyConfig.addShortcode("query", function(data) {
    const queryData = Object.keys(data).reduce((obj, key) => {
      return key.startsWith('__') ? obj : { ...obj, [key]: data[key] };
    }, {});
    return `?${queryString.stringify(queryData)}`;
  });

  // Extentions / Libraries
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.safeLoad(contents));

  // Filters
  eleventyConfig.addFilter('markdown', ( contents ) => md.render(contents));
  eleventyConfig.addFilter("date", (date, format) => dayjs(date).format(format));
  eleventyConfig.addFilter("dateRelative", (date) => dayjs(date).fromNow());

  eleventyConfig.addFilter("debug", (obj) => `<pre style="overflow-x: auto;"><code>${JSON.stringify(obj, null, 2)}</code></pre>`);
  eleventyConfig.addFilter("encodeURIComponent", (str) => encodeURIComponent(str));
  eleventyConfig.addFilter("getHost", (url) => new URL(url).host);
  eleventyConfig.addFilter('cacheBust', (url) => !ELEVENTY_PRODUCTION ? url : `${url}?${Date.now()}`)
  eleventyConfig.addFilter('parseLinks', (content) => {
      return _.compact(_.uniq(((content || '').match(/href="(https?:\/\/\S+)"/) || [])).filter(s => !s.includes('twitter') && !s.startsWith('href')));
  });
  eleventyConfig.addNunjucksAsyncFilter('getOpenGraphData', (link = '', callback) => {
    let url;
    try {
      url = new URL(link).href;
    } catch(e) {
      console.error(`Error: unable to parse url '${link}':`, e);
      return callback(null, null);
    }
    if (openGraphCache.has(url)) {
      console.log(`Using cached data for ${url}`);
      return callback(null, openGraphCache.get(url));
    }
    ogs({ url, followRedirect: true, ogImageFallback: true })
    .then(({ result }) => {
      console.log("Successfully fetched data for " + url)
      openGraphCache.set(url, result);
      callback(null, result);
    }).catch((err) => {
      console.error(`Warning: failed to fetch data for ${url}:`, err);
      openGraphCache.set(url, null);
      callback(null, null);
    })
  });

};
