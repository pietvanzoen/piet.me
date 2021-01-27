const HOSTNAME = 'piet.me';
module.exports = {
  buildTime: new Date(),
  url: `https://${HOSTNAME}`,
  hostname: HOSTNAME,
  title: 'Piet van Zoen',
  isProduction: process.env.ELEVENTY_PRODUCTION === 'true',
  menu: [
    { href: '/updates/', name: 'Updates' },
    { href: '/garden/', name: 'Garden' },
    { href: '/about/', name: 'About' },
  ],
};
