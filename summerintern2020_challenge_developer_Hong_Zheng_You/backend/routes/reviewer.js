const express = require("express");
const controller = require("../controllers/reviewer");
const router = express.Router();

router.post("/login", controller.loginUser);
router.post("/project", controller.getAllProjectsOverview);
router.post("/project/:id", controller.getSingleProjectDetail);
router.post("/project/update/:id", controller.updateSingleProjectScore);

module.exports = router;
