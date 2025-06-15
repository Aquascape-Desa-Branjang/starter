const News = require('../models/news');

const getNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const create = async (req, res) => {
    try {
        res.status(201).json({ message: "create news" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const store = async (req, res) => {
  try {
    const { nanoid } = await import('nanoid');

    const { cover, title, slug, description } = req.body;
    const id = nanoid(26);

    const news = await News.create({
      id,
      cover, 
      title, 
      slug, 
      description
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const edit = async (req, res) => {
  try {
        const news = await News.findByPk(req.params.id);
        res.status(201).json({news: news});
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const update = async (req, res) => {
  try {
    const { cover, title, slug, description } = req.body;
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: 'News not found' });

    await news.update({ cover, title, slug, description }); 

    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const destroy = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: 'News not found' });

    await news.destroy();
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getNews,
  create,
  store,
  edit,
  update,
  delete: destroy,
};
