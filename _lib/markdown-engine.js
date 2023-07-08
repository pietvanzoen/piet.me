const markdownIt = require('markdown-it');

const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
}).use(function (md) {
  // Recognize Mediawiki links ([[text]])
  md.linkify.add('[[', {
    // eslint-disable-next-line no-useless-escape
    validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
    normalize: (match) => {
      const parts = match.raw.slice(2, -2).split('|');
      parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, '');
      match.text = (parts[1] || parts[0]).trim();
      match.url = `${parts[0].trim()}`;
    },
  });

  const twitterMention = /@[a-zA-Z0-9_]*@twitter\.com/;
  md.linkify.add('@', {
    validate: (text, pos) => {
      const tail = text.slice(pos - 1);
      if (twitterMention.test(tail)) {
        return tail.match(twitterMention)[0].length - 1;
      }
      return 0;
    },
    normalize: (match) => {
      match.url = 'https://twitter.com/' + match.raw.split('@')[1];
    },
  });
});

module.exports = md;
