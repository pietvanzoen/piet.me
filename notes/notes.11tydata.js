const startCase = require('lodash/startCase');
const globalComputed = require('../_data/eleventyComputed');

// eslint-disable-next-line no-useless-escape
const linkRegex = /[^!]\[[\w\s\d]+\]\(((?:\/|[^https?:\/\/])[-_\w\d.\/?=#]+)\)/gm;

module.exports = {
  layout: 'note.njk',
  type: 'note',
  meta: {
    type: 'article',
  },
  eleventyComputed: {
    ...globalComputed,
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      if (data.slug) return `${data.slug}/index.html`;
      return `notes/${data.page.fileSlug}/index.html`;
    },
    title: (data) => data.title || startCase(data.page.fileSlug),
    backlinks: (data) => {
      const notes = data.collections.notes;
      const currentFileURL = (data.page.url || '').replace(/\/$/, '');

      const links = notes.reduce((backlinks, note) => {
        const noteContent = note.template.frontMatter.content;

        if (getLocalLinkUrls(noteContent).includes(currentFileURL)) {
          return backlinks.concat({
            url: note.url,
            title: note.data.title,
          });
        }
        return backlinks;
      }, []);
      return links;
    },
  },
};

function getLocalLinkUrls(content) {
  return Array.from(content.matchAll(linkRegex) || []).map(([, url]) => url);
}
