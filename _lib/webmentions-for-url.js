module.exports = (webmentions, url) =>
  webmentions
    .filter((entry) => entry['wm-target'] === url)
    .sort((a, b) => new Date(b['wm-received']) - new Date(a['wm-received']));
