const ProductCategory = require('../models/productCategory');
const Product = require('../models/product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['order', 'ASC']] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const create = async (req, res) => {
    try {
      const categories = await ProductCategory.findAll();
        res.status(201).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get categories' });
    }
};

const store = async (req, res) => {
  try {
    const { nanoid } = await import('nanoid');

    const { product_category_ids, images, name, slug, description, retail_price, wholesale_prices, shopee_link } = req.body;
    const id = nanoid(26);

    const product = await Product.create({
      id,
      product_category_ids,
      images,
      name,
      slug,
      description,
      retail_price,
      wholesale_prices,
      shopee_link
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

const edit = async (req, res) => {
  try {
        const categories = await ProductCategory.findAll();
        const product = await Product.findByPk(req.params.id);
        res.status(201).json([categories, product]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get categories and product' });
    }
};

const update = async (req, res) => {
  try {
    const { product_category_ids, images, name, slug, description, retail_price, wholesale_prices, shopee_link } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update({ product_category_ids, images, name, slug, description, retail_price, wholesale_prices, shopee_link }); 

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const destroy = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy();
    res.json({ message: 'product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  getProducts,
  create,
  store,
  edit,
  update,
  delete: destroy,
};
