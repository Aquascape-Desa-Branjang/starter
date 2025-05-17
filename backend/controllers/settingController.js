const Setting = require("../models/setting");

const getSettings = async (req, res) => {
    try {
        const settings = await Setting.findAll({
            attributes: ['id', 'key', 'value'],
            order: [['key', 'ASC']],
        });
        res.json(settings);
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ message: "Error fetching settings" });
    }
};

const getSetting = async (req, res) => {
    try {
        const { id } = req.params;
        const setting = await Setting.findByPk(id, {
            attributes: ['id', 'key', 'value'],
        });

        if (!setting) {
            return res.status(404).json({ message: 'Setting not found' });
        }

        res.json(setting);
  } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ message: "Error fetching settings" });
  }
};

const editSetting = async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;
      
        if (typeof value !== 'string') {
            return res.status(400).json({ message: '`value` must be a string' });
        }

        const setting = await Setting.findByPk(id);
        
        if (!setting) {
          return res.status(404).json({ message: 'Setting not found' });
        }

        setting.value = value;
        await setting.save();

        res.json({ message: 'Setting updated successfully', value: setting.value });
    } catch (error) {
        console.error("Error updating setting:", error);
        res.status(500).json({ message: "Error updating setting" });
    }
};

module.exports = {
  getSettings,
  getSetting,
  editSetting,
};
