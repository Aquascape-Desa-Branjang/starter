module.exports = async () => {
  const { nanoid } = await import('nanoid');
  const Product = require('../models/product');
  const ProductCategory = require("../models/productCategory");

  const categories = await ProductCategory.findAll();

  const products = [
    {
      product_category_ids: [categories[0].id, categories[1].id],
      images: [
        'https://example.com/images/product1-1.jpg',
        'https://example.com/images/product1-2.jpg',
      ],
      name: 'Premium Coffee Beans',
      slug: 'premium-coffee-beans',
      description: 'High-quality, freshly roasted premium coffee beans from the mountains.',
      retail_price: 150000,
      wholesale_prices: { '10': 140000, '50': 130000 }, // example bulk prices
      shopee_link: 'https://shopee.com/premium-coffee-beans',
    },
    {
      product_category_ids: [categories[3].id],
      images: [
        'https://example.com/images/product2-1.jpg',
      ],
      name: 'Organic Milk',
      slug: 'organic-milk',
      description: 'Fresh organic milk sourced from local farms.',
      retail_price: 30000,
      wholesale_prices: null,
      shopee_link: null,
    },
    {
      product_category_ids: [categories[0].id, categories[2].id],
      images: [
        'https://example.com/images/product3-1.jpg',
      ],
      name: 'Whole Wheat Bread',
      slug: 'whole-wheat-bread',
      description: 'Healthy whole wheat bread baked fresh daily.',
      retail_price: 20000,
      wholesale_prices: { '5': 18000, '20': 16000 },
      shopee_link: 'https://shopee.com/whole-wheat-bread',
    },
  ];

  for (const product of products) {
    await Product.findOrCreate({
      where: { slug: product.slug },
      defaults: {
        id: nanoid(26),
        product_category_ids: product.product_category_ids,
        images: product.images,
        name: product.name,
        slug: product.slug,
        description: product.description,
        retail_price: product.retail_price,
        wholesale_prices: product.wholesale_prices,
        shopee_link: product.shopee_link,
      },
    });
  }
};
