const { join } = require('path');
module.exports = {
  absoluteUrl: ({ page, site }) => new URL(page.url, site.url).href,
  seo: {
    title: ({ title, site }) => [title, site.title].filter(Boolean).join(' - '),
  }
};
