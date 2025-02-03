const displayItem = require('../models/displayItem');
const {io} = require('../lib/socket');
const Parameter = require("../models/parameter");

const addDisplayItem = async (req, res) => {
    try {
        const response = await displayItem.create(req.body)
        res.status(201).json(response)
    } catch (error) {
        console.error("Error saving display item:", error);
        res.status(500).json({error: error.message})
    }
}

const getDisplayItems = async (req, res) => {
    try {
        const displayItems = await displayItem.find({})
        res.status(200).json(displayItems)
    } catch (error) {
        console.error("Error fetching display items:", error);
        res.status(500).json({error: error.message})
    }
}

const getDisplayItem = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await displayItem.findById(id);
        res.json(response);
    } catch (error) {
        console.error("Error fetching display item:", error);
        res.status(500).json({ message: "Error fetching display item" });
    }
};

const updateDisplayItem = async (req, res) => {
    try {
        const { id } = req.params
        const { sensor, device, parameter, displayName, unit  } = req.body;
        const response = await displayItem.findByIdAndUpdate(id, {sensor, device, parameter, displayName, unit}, {new: true, runValidators: true})

        if(!response) {
            return res.status(404).send({message: 'Display item not found'})
        }

        res.status(200).json(response)
    } catch (error) {
        console.error("Error updating display item: ", error)
        res.status(500).json({message: "Error updating display item"})
    }
}

const deleteDisplayItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDisplayItem = await displayItem.findByIdAndDelete(id);

        if (!deletedDisplayItem) {
            return res.status(404).json({ message: "Display item not found." });
        }

        res.json({ message: "Display item successfully deleted!" });
    } catch (error) {
        console.error("Error deleting display item:", error);
        res.status(500).json({ message: "Error deleting display item" });
    }
};

module.exports = {
    addDisplayItem,
    getDisplayItems,
    getDisplayItem,
    deleteDisplayItem,
    updateDisplayItem
}
