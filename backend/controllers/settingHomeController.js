const { Op } = require('sequelize');
const Setting = require("../models/setting");

const getSettingHome = async (req, res) => {
    try {
        const home = await Setting.findAll({
            where: {
                key: { [Op.like]: 'home\\_%' }
            },
            attributes: ['key','value'],
            order: [['key','ASC']],
        });

        if (!home) {
            return res.status(404).json({ message: 'Home settings not found' });
        }

        const result = {};
        home.forEach(s => {
            const plainKey = s.key.replace(/^home_/, '');
            result[plainKey] = s.value;
        });

        res.json(result);
  } catch (error) {
        console.error("Error fetching Home settings:", error);
        res.status(500).json({ message: "Error fetching Home settings" });
  }
};

const setSettingHome = async (req, res) => {
    try {
        const updates = req.body;
        if (typeof updates !== 'object' || Array.isArray(updates)) {
            return res.status(400).json({ message: 'Request body must be an object of key→value pairs' });
        }

        const mappedKeys = Object.keys(updates).map(k => `home_${k}`);
        const updateMap = {};
        Object.keys(updates).forEach(k => {
            updateMap[`home_${k}`] = updates[k];
        });

        const settings = await Setting.findAll({
            where: { key: { [Op.in]: mappedKeys } },
            attributes: ['id','key','value']
        });

        const foundKeys = settings.map(s => s.key);
        const notFound = mappedKeys.filter(k => !foundKeys.includes(k));
        if (notFound.length) {
            const cleaned = notFound.map(k => k.replace(/^home_/, ''));
            return res.status(404).json({ message: `Settings not found for keys: ${cleaned.join(', ')}` });
        }

        await Promise.all(settings.map(s =>
            s.update({ value: updateMap[s.key] })
        ));

        const result = {};
        settings.forEach(s => {
            const plainKey = s.key.replace(/^home_/, '');
            result[plainKey] = s.value;
        });

        res.json({ message: 'Home settings updated', updated: result });
    } catch (err) {
        console.error('Error updating home settings:', err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
  getSettingHome,
  setSettingHome,
};
