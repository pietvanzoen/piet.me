const pluginSass = require("eleventy-plugin-sass");
const dayjs = require('dayjs');
const yaml = require('js-yaml');
const md = require('./lib/markdown-engine');
const localizeUnsplash = require('./lib/localize-unsplash-image');
const queryString = require('query-string');
const embedTwitter = require("eleventy-plugin-embed-twitter");

dayjs.extend(require('dayjs/plugin/advancedFormat'))
dayjs.extend(require('dayjs/plugin/relativeTime'))
const now = new Date()

const { ELEVENTY_PRODUCTION } = process.env;

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

  // Collections
  eleventyConfig.addCollection("blog", function(collection) {
    return collection.getFilteredByGlob("./blog/*.md").filter((item) => {
      return item.data.draft !== true && item.date <= now;
    });
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
  eleventyConfig.addNunjucksAsyncFilter('localizeUnsplash', localizeUnsplash);
  eleventyConfig.addFilter('markdown', ( contents ) => md.render(contents));
  eleventyConfig.addFilter("date", (date, format) => dayjs(date).format(format));
  eleventyConfig.addFilter("dateRelative", (date) => dayjs(date).fromNow());

  eleventyConfig.addFilter("debug", (obj) => `<pre>${JSON.stringify(obj, null, 2)}</pre>`);
  eleventyConfig.addFilter("encodeURIComponent", (str) => encodeURIComponent(str));
  eleventyConfig.addFilter("getHost", (url) => new URL(url).host);

};
