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

        res.json(home);
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

        const homeKeys = Object.keys(updates).filter(k => k.startsWith('home_'));
        if (homeKeys.length === 0) {
            return res.status(400).json({ message: 'No valid home_* keys provided' });
        }

        const settings = await Setting.findAll({
            where: { key: { [Op.in]: homeKeys } },
            attributes: ['id','key','value']
        });

        const foundKeys = settings.map(s => s.key);
        const notFound = homeKeys.filter(k => !foundKeys.includes(k));
        if (notFound.length) {
            return res.status(404).json({ message: `Settings not found for keys: ${notFound.join(', ')}` });
        }

        await Promise.all(settings.map(s =>
            s.update({ value: updates[s.key] })
        ));

        const result = {};
        settings.forEach(s => result[s.key] = s.value);

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
