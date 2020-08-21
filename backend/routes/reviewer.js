const express = require("express");
const controller = require("../controllers/reviewer");
const router = express.Router();

router.get("/project/:id", controller.getSingleProjectDetail);
router.get("/project", controller.getAllProjectsOverview);
router.post("/project/:id", controller.updateSingleProjectScore);

module.exports = router;
