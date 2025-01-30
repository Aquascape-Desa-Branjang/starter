const express = require("express");
const router = express.Router();
const parameterController = require("../controllers/parameterController");

if (!parameterController.addParameter) {
  console.error("Error: addParameter function is not defined in parameterController");
}

router.post("/add", parameterController.addParameter);
router.get("/", parameterController.getParameters);
router.get("/:id", parameterController.getParameter);
router.put("/:id", parameterController.editParameter);
router.delete("/:id", parameterController.deleteParameter);
router.get("/sensors", parameterController.getSensors);
router.get("/sensor", parameterController.getSensor);

module.exports = router;
