const { Op } = require('sequelize');
const Setting = require("../models/setting");

const getSettingAbout = async (req, res) => {
    try {
        const about = await Setting.findAll({
            where: {
                key: { [Op.like]: 'about\\_%' }
            },
            attributes: ['key','value'],
            order: [['key','ASC']],
        });

        if (!about) {
            return res.status(404).json({ message: 'About settings not found' });
        }

        res.json(about);
  } catch (error) {
        console.error("Error fetching About settings:", error);
        res.status(500).json({ message: "Error fetching About settings" });
  }
};

const setSettingAbout = async (req, res) => {
    try {
        const updates = req.body;
        if (typeof updates !== 'object' || Array.isArray(updates)) {
            return res.status(400).json({ message: 'Request body must be an object of key→value pairs' });
        }

        const aboutKeys = Object.keys(updates).filter(k => k.startsWith('about_'));
        if (aboutKeys.length === 0) {
            return res.status(400).json({ message: 'No valid about_* keys provided' });
        }

        const settings = await Setting.findAll({
            where: { key: { [Op.in]: aboutKeys } },
            attributes: ['id','key','value']
        });

        const foundKeys = settings.map(s => s.key);
        const notFound = aboutKeys.filter(k => !foundKeys.includes(k));
        if (notFound.length) {
            return res.status(404).json({ message: `Settings not found for keys: ${notFound.join(', ')}` });
        }

        await Promise.all(settings.map(s =>
            s.update({ value: updates[s.key] })
        ));

        const result = {};
        settings.forEach(s => result[s.key] = s.value);

        res.json({ message: 'About settings updated', updated: result });
    } catch (err) {
        console.error('Error updating about settings:', err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
  getSettingAbout,
  setSettingAbout,
};
