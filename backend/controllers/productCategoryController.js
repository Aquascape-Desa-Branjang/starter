const ProductCategory = require('../models/productCategory');

const getProductCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.findAll({ order: [['order', 'ASC']] });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product categories' });
  }
};

// const create = (req, res) => {
//   res.json({ message: 'Display create form for Product Category' });
// };

const store = async (req, res) => {
  try {
    const { nanoid } = await import('nanoid');

    const { order, name, slug } = req.body;
    const id = nanoid(26);

    const category = await ProductCategory.create({
      id,
      order,
      name,
      slug,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product category' });
  }
};

// const edit = async (req, res) => {
//   try {
//     const category = await ProductCategory.findByPk(req.params.id);
//     if (!category) return res.status(404).json({ error: 'Category not found' });

//     res.json(category);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch product category for editing' });
//   }
// };

const update = async (req, res) => {
  try {
    const { order, name, slug } = req.body;
    const category = await ProductCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    await category.update({ order, name, slug }); 

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product category' });
  }
};

const destroy = async (req, res) => {
  try {
    const category = await ProductCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product category' });
  }
};

module.exports = {
  getProductCategories,
//   create,
  store,
//   edit,
  update,
  delete: destroy,
};
