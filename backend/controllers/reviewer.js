const Project = require("../models/project");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

getAllProjectsOverview = async (req, res) => {
    // TODO: replace with with JWT so we can use req.user.id or similar
    const { reviewer_id } = req.body;

    projects = await Project.aggregate([
        { $match: {} },
        {
            $set: {
                convertedId: { $toObjectId: reviewer_id }, // cast to ObjectId else cannot compare
            },
        },
        {
            $project: {
                name: 1,
                // in the reviewers subarray, return the scores for a particular reviewer id
                score: {
                    $filter: {
                        input: "$reviewers",
                        as: "reviewer",
                        cond: {
                            $in: ["$convertedId", ["$$reviewer.reviewer_id"]],
                        },
                    },
                },
            },
        },
    ]);

    try {
        console.log(projects);
        res.json(projects);
    } catch (err) {
        console.log(err);
    }
};

getSingleProjectDetail = async (req, res) => {
    const { reviewer_id } = req.body;
    const { id } = req.params;
    projects = await Project.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
            $set: {
                convertedId: { $toObjectId: reviewer_id }, // cast to ObjectId else cannot compare
            },
        },
        {
            $set: {
                score: {
                    $filter: {
                        input: "$reviewers",
                        as: "reviewer",
                        cond: {
                            $in: ["$convertedId", ["$$reviewer.reviewer_id"]],
                        },
                    },
                },
            },
        },
        {
            $project: {
                reviewers: 0,
            },
        },
    ]);

    try {
        console.log(projects);
        res.json(projects);
    } catch (err) {
        console.log(err);
    }
};

updateSingleProjectScore = async (req, res) => {
    const { id } = req.params;
    const { reviewer_id, relevance, merits, potential, originality } = req.body;
    const project = await Project.findById(id);

    var newScore = {};
    var exists = 0; // check if reviewer already judged a particular project
    console.log(relevance);
    console.log(merits);

    for (const oldScore of project.reviewers) {
        if (oldScore.reviewer_id == reviewer_id) {
            newScore = {
                relevance: relevance ? relevance : oldScore.relevance,
                merits: merits ? merits : oldScore.merits,
                potential: potential ? potential : oldScore.potential,
                originality: originality ? originality : oldScore.originality,
            };
            Object.assign(oldScore, newScore);
            exists = 1;
            break;
        }
    }

    if (!exists) {
        // REMIND: validate and sanitize at client side e.g. all 4 criteria must have decimal/int input even if
        // mongoDB already has internal validator using Decimal128
        project.reviewers.push({
            reviewer_id: reviewer_id,
            relevance: relevance ? relevance : null,
            merits: merits ? merits : null,
            potential: potential ? potential : null,
            originality: originality ? originality : null,
        });
    }

    project.save();

    res.json(project);
};

module.exports = {
    getAllProjectsOverview,
    getSingleProjectDetail,
    updateSingleProjectScore,
};
