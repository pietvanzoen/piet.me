const pluginRss = require('@11ty/eleventy-plugin-rss');
const yaml = require('js-yaml');
const md = require('./_lib/markdown-engine');
const queryString = require('query-string');
const embedTwitter = require('eleventy-plugin-embed-twitter');
const _ = require('lodash');
const localImages = require('eleventy-plugin-local-images');
const getOpenGraphData = require('./_lib/get-open-graph-data');
const dayjs = require('./_lib/dayjs');
const updatesCollection = require('./_lib/updates-collection');
const fs = require('fs');
const getUnsplashImageColor = require('./_lib/get-unsplash-image-color');
const webmentionsForUrl = require('./_lib/webmentions-for-url');
const htmlmin = require('html-minifier');
const posthtml = require('posthtml');
const uglify = require('posthtml-minify-classnames');

const now = new Date();

const IS_PRODUCTION = process.env.ELEVENTY_PRODUCTION === 'true';

module.exports = function (cfg) {
  // Plugins
  cfg.addPlugin(pluginRss);
  cfg.addPlugin(embedTwitter, {
    cacheText: IS_PRODUCTION,
  });
  if (IS_PRODUCTION) {
    cfg.addPlugin(localImages, {
      distPath: '_site',
      assetPath: '/images',
      selector: 'img',
      verbose: true,
    });
  }

  // Copy
  cfg.addPassthroughCopy('fonts');
  cfg.addPassthroughCopy('images');
  cfg.addPassthroughCopy('stylesheets/*.css*');
  cfg.addPassthroughCopy('notes/**/*.{gif,jpg,jpeg,png,m4a}');

  // Collections
  cfg.addCollection('notes', (collection) =>
    collection.getFilteredByGlob(['notes/**/*.md']).filter((item) => item.data.draft !== true && item.date <= now)
  );
  cfg.addCollection('updates', updatesCollection);
  cfg.addCollection('indexable', (collection) => collection.getAll().filter((item) => !item.data.noindex));
  cfg.addCollection('tagList', (collection) => {
    const tagsSet = new Set();
    collection.getAll().forEach((item) => {
      if (!item.data.tags) return;
      item.data.tags.filter((tag) => !['post', 'all'].includes(tag)).forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  });
  cfg.addCollection('featured', (collection) =>
    collection
      .getAllSorted()
      .filter((item) => item.data.featured)
      .reverse()
  );
  cfg.addCollection('noindex', (collection) => collection.getAll().filter((item) => item.data.noindex));
  cfg.addShortcode('query', (data) => {
    return (
      '?' +
      queryString.stringify(
        Object.keys(data).reduce((obj, key) => (key.startsWith('_') ? obj : { ...obj, [key]: data[key] }), {})
      )
    );
  });

  cfg.addNunjucksAsyncShortcode('HeroImage', async (unsplashImageId, alt = '', heroStyle) => {
    let style = '';
    const imageDimentions = [1400, heroStyle === 'ribbon' ? 450 : 900];
    const url = `https://source.unsplash.com/${unsplashImageId}/${imageDimentions.join('x')}?fm=jpg`;
    const imageColor = await getUnsplashImageColor(url, 'muted');
    if (imageColor) {
      style = ` style="background-color: ${imageColor}"`;
    }
    return `<figure class="hero-image ${heroStyle === 'ribbon' ? 'hero-ribbon' : ''}"${style}>
      <img src="${url}" alt="${alt.trim()}" />
    </figure>`;
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
  cfg.addFilter('getTwitterUserFromURL', (tweetURL) => {
    const url = new URL(tweetURL);
    return `@${url.pathname.split('/')[1]}`;
  });
  cfg.addFilter('getHost', (url) => new URL(url).host);
  cfg.addFilter('cacheBust', (url) => (IS_PRODUCTION ? `${url}?${Date.now()}` : url));
  cfg.addFilter('webmentionsForUrl', webmentionsForUrl);
  cfg.addFilter('parseLinks', (content) =>
    _.compact(
      _.uniq((content || '').match(/href="(https?:\/\/\S+)"/) || []).filter(
        (s) => !s.includes('twitter') && !s.startsWith('href')
      )
    )
  );
  cfg.addNunjucksAsyncFilter('getOpenGraphData', getOpenGraphData);
  cfg.addFilter('isFeatured', (collection) => collection.filter((page) => page.data.featured));

  cfg.addTransform('lazyImages', (content, outputPath) => {
    if (!outputPath.endsWith('.html')) return content;
    return content.replace(/<img /g, '<img loading="lazy" ');
  });

  cfg.addTransform('htmlmin', async function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath && outputPath.endsWith('.html')) {
      let html = content;

      if (IS_PRODUCTION) {
        const filteredClasses = [
          'u-photo',
          'p-note',
          'h-card',
          'p-name',
          'u-url',
          'h-entry',
          'p-name',
          'e-content',
          'dt-published',
        ];
        html = (
          await posthtml()
            .use(
              uglify({
                filter: new RegExp(filteredClasses.join('|')),
              })
            )
            .process(content)
        )?.html;
      }

      let minified = htmlmin.minify(html, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  function firstFourLines(file) {
    file.excerpt = file.content.split('\n').slice(0, 3).join(' ');
  }
  cfg.setFrontMatterParsingOptions({
    excerpt: firstFourLines,
    excerpt_separator: '<!-- excerpt -->',
    excerpt_alias: 'excerpt',
  });

  // Browsersync Overrides
  cfg.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware('*', (_, res) => {
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    dir: {
      layouts: '_layouts',
    },
  };
};
