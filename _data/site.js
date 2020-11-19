const HOSTNAME = 'piet.me';
module.exports = {
  buildTime: new Date(),
  url: `https://${HOSTNAME}`,
  hostname: HOSTNAME,
  title: 'Piet van Zoen',
  isProduction: process.env.ELEVENTY_PRODUCTION === 'true',
  menu: [
    { href: '/updates/', name: 'Updates' },
    { href: '/blog/', name: 'Posts' },
    { href: '/projects/', name: 'Projects' },
    { href: '/about/', name: 'About' },
  ],
};
