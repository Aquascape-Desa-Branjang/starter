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

        const result = {};
        about.forEach(s => {
            const plainKey = s.key.replace(/^about_/, '');
            result[plainKey] = s.value;
        });

        res.json(result);
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

        const mappedKeys = Object.keys(updates).map(k => `about_${k}`);
        const updateMap = {};
        Object.keys(updates).forEach(k => {
            updateMap[`about_${k}`] = updates[k];
        });

        const settings = await Setting.findAll({
            where: { key: { [Op.in]: mappedKeys } },
            attributes: ['id','key','value']
        });

        const foundKeys = settings.map(s => s.key);
        const notFound = mappedKeys.filter(k => !foundKeys.includes(k));
        if (notFound.length) {
            const cleaned = notFound.map(k => k.replace(/^about_/, ''));
            return res.status(404).json({ message: `Settings not found for keys: ${cleaned.join(', ')}` });
        }

        await Promise.all(settings.map(s =>
            s.update({ value: updateMap[s.key] })
        ));

        const result = {};
        settings.forEach(s => {
            const plainKey = s.key.replace(/^about_/, '');
            result[plainKey] = s.value;
        });

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
