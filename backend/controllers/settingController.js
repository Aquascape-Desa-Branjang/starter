const Setting = require("../models/setting");

// Mendapatkan semua akun
const getSettings = async (req, res) => {
    try {
        const settings = await Setting.findAll({
            attributes: ['id', 'key', 'value'],
            order: [['key', 'ASC']],
        });
        res.json(settings);
    } catch (error) {
        console.error("Error fetching accounts:", error);
        res.status(500).json({ message: "Error fetching accounts" });
    }
};

// Mendapatkan akun berdasar ID
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
        console.error("Error fetching accounts:", error);
        res.status(500).json({ message: "Error fetching accounts" });
  }
};

// Mengedit akun berdasarkan ID
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
        console.error("Error updating account:", error);
        res.status(500).json({ message: "Error updating account" });
    }
};

module.exports = {
  getSettings,
  getSetting,
  editSetting,
};
