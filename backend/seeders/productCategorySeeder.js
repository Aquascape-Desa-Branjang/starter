module.exports = async () => {
    const { nanoid } = await import('nanoid');
  const ProductCategory = require("../models/productCategory");

  const categories = [
    { order: 1, name: 'Beverages', slug: 'beverages' },
    { order: 2, name: 'Snacks', slug: 'snacks' },
    { order: 3, name: 'Dairy', slug: 'dairy' },
    { order: 4, name: 'Bakery', slug: 'bakery' },
  ];

  for (const category of categories) {
    await ProductCategory.findOrCreate({
      where: { slug: category.slug },
      defaults: {
        id: nanoid(26),
        order: category.order,
        name: category.name,
        slug: category.slug,
      },
    });
  }
};
