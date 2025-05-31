const { Op } = require('sequelize');
const Setting = require("../models/setting");

const getSettingGeneral = async (req, res) => {
    try {
        const general = await Setting.findAll({
            where: {
                key: { [Op.like]: 'general\\_%' }
            },
            attributes: ['key','value'],
            order: [['key','ASC']],
        });

        if (!general) {
            return res.status(404).json({ message: 'General settings not found' });
        }

        res.json(general);
  } catch (error) {
        console.error("Error fetching General settings:", error);
        res.status(500).json({ message: "Error fetching General settings" });
  }
};

const setSettingGeneral = async (req, res) => {
    try {
        const updates = req.body;
        if (typeof updates !== 'object' || Array.isArray(updates)) {
            return res.status(400).json({ message: 'Request body must be an object of key→value pairs' });
        }

        const generalKeys = Object.keys(updates).filter(k => k.startsWith('general_'));
        if (generalKeys.length === 0) {
            return res.status(400).json({ message: 'No valid general_* keys provided' });
        }

        const settings = await Setting.findAll({
            where: { key: { [Op.in]: generalKeys } },
            attributes: ['id','key','value']
        });

        const foundKeys = settings.map(s => s.key);
        const notFound = generalKeys.filter(k => !foundKeys.includes(k));
        if (notFound.length) {
            return res.status(404).json({ message: `Settings not found for keys: ${notFound.join(', ')}` });
        }

        await Promise.all(settings.map(s =>
            s.update({ value: updates[s.key] })
        ));

        const result = {};
        settings.forEach(s => result[s.key] = s.value);

        res.json({ message: 'General settings updated', updated: result });
    } catch (err) {
        console.error('Error updating general settings:', err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
  getSettingGeneral,
  setSettingGeneral,
};
