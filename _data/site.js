const HOSTNAME = 'piet.me';
module.exports = {
  buildTime: new Date(),
  url: `https://${HOSTNAME}`,
  hostname: HOSTNAME,
  title: 'Piet van Zoen',
  isProduction: process.env.ELEVENTY_PRODUCTION === 'true',
  menu: [
    { href: '/', name: 'Home' },
    { href: '/notes/', name: 'Notes' },
    { href: '/updates/', name: 'Updates' },
    { href: '/now/', name: 'Now' },
    { href: '/about/', name: 'About' },
  ],
};
