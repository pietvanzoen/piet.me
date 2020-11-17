const _ = require('lodash');

module.exports = function updates(collection) {
  return collection
    .getFilteredByGlob('./updates/*.md')
    .reduce((items, item) => {
      if (item.url.includes('README')) return items;
      item.data.alsoOn = _.compact([_.first(item.data.twitter), _.first(item.data.mastodon)]);
      item.template.frontMatter.content = item.template.frontMatter.content.replace(/\/media\//g, '/images/media/');
      return items.concat(item);
    }, [])
    .reverse();
};
