const markdownIt = require('markdown-it');
const hljs = require('highlight.js');

const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
        // eslint-disable-next-line no-empty
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  },
}).use(function (md) {
  // Recognize Mediawiki links ([[text]])
  md.linkify.add('[[', {
    // eslint-disable-next-line no-useless-escape
    validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
    normalize: (match) => {
      const parts = match.raw.slice(2, -2).split('|');
      parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, '');
      match.text = (parts[1] || parts[0]).trim();
      match.url = `/notes/${parts[0].trim()}/`;
    },
  });
});

module.exports = md;
