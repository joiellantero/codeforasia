const express = require("express");
const Project = require("../models/project");
const User = require("../models/user");
const router = express.Router();

//debug: add single project entry manually

router.post("/add/project", (req, res, next) => {
    const { name, event, reviewers } = req.body;

    const project = new Project({
        name: name,
        event: event,
        reviewers: reviewers,
    });

    project
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: project._id,
                msg: "Successfully created",
            });
        })
        .catch((err) => {
            return res.status(400).json({
                error,
                msg: "Error occurred",
            });
        });
});

// debug: add single user of type Reviewer/Organizer

router.post("/add/user/:type", (req, res) => {
    const { username, password } = req.body;

    const user = new User({
        username: username,
        password: password,
        user_type: req.params.type == 0 ? "Reviewer" : "Organizer",
        scores: [],
    });

    user.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                msg: "Successfully created",
            });
        })
        .catch((err) => {
            return res.status(400).json({ error, msg: "Error occurred" });
        });
});

// debug: update project score by a reviewer

module.exports = router;
