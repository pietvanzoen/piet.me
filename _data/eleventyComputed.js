const dayjs = require('../_lib/dayjs');
module.exports = {
  pageAbsoluteUrl: ({ page, site }) => new URL(page.url, site.url).href,
  seo: {
    title: (data) => {
      if (isUpdate(data)) {
        data.title = dayjs(data.date).format('Do MMM YYYY HH:mm');
      }
      return [data.title, data.site.title].filter(Boolean).join(' - ');
    },
    description: ({ excerpt, description, site }) => description || excerpt || site.description || '',
    type: ({ meta }) => meta?.type || 'website',
    image: ({ meta, unsplashImageId, site }) => {
      if (unsplashImageId) {
        return {
          url: `https://source.unsplash.com/${unsplashImageId}/400x400`,
          width: 400,
          height: 400,
        };
      }
      if (!meta?.image?.url) {
        return null;
      }
      if (!meta.image.url.startsWith('http')) {
        meta.image.url = site.url + meta.image.url;
      }
      return meta.image;
    },
  },
};

function isUpdate(data) {
  return data.page.inputPath.includes('updates/');
}
