module.exports = async () => {
  const { nanoid } = await import('nanoid');
  const News = require('../models/news');

  const newsItems = [
    {
      cover: 'https://example.com/images/news1.jpg',
      title: 'Company Launches New Product Line',
      slug: 'company-launches-new-product-line',
      description: 'Our company proudly announces the launch of an innovative new product line designed to revolutionize the industry.',
    },
    {
      cover: 'https://example.com/images/news2.jpg',
      title: 'Annual Company Retreat Highlights',
      slug: 'annual-company-retreat-highlights',
      description: 'A look back at our exciting annual company retreat filled with team-building, workshops, and fun activities.',
    },
    {
      cover: 'https://example.com/images/news3.jpg',
      title: 'Sustainability Initiatives in 2025',
      slug: 'sustainability-initiatives-2025',
      description: 'We are taking bold steps toward sustainability. Here\'s how we plan to reduce our carbon footprint in the upcoming year.',
    },
  ];

  for (const item of newsItems) {
    await News.findOrCreate({
      where: { slug: item.slug },
      defaults: {
        id: nanoid(26),
        cover: item.cover,
        title: item.title,
        slug: item.slug,
        description: item.description,
      },
    });
  }
};
