const express = require("express");
const router = express.Router();
const {
    addParameter,
    getParameters,
    getParameter,
    editParameter,
    deleteParameter,
    getSensors,
    getSensor
} = require("../controllers/parameterController");

router.post("/add", addParameter);
router.get("/:name", getParameters);
// router.get("/:id", getParameter);
router.put("/:id", editParameter);
router.delete("/:id", deleteParameter);
router.get("/sensors", getSensors);
router.get("/sensor", getSensor);

module.exports = router;
