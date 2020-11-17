module.exports = {
  absoluteUrl: ({ page, site }) => new URL(page.url, site.url).href,
  seo: {
    siteTitle: ({ site }) => site.title,
    title: ({ title, site }) => [title, site.title].filter(Boolean).join(' - '),
    description: ({ excerpt, description, site }) => description || excerpt || site.description || '',
    type: ({ meta }) => meta?.type || 'website',
    image: ({ meta, unsplashImageId }) => {
      if (unsplashImageId) {
        return {
          url: `https://source.unsplash.com/${unsplashImageId}/400x400`,
          width: 400,
          height: 400,
        };
      }
      return meta?.image || null;
    },
  },
};
