const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    event: {
        type: String,
        required: true,
    }, // e.g. hackathon name
    media: String, // photo or video
    description: String,
    problem: String,
    innovation: String,
    technologies: [String],
    audiences: String,
    capability: String,
    link: String,
    reviewers: [
        {
            reviewer_id: {
                type: Types.ObjectID,
            },
            relevance: {
                type: Types.Decimal128,
            },
            merits: {
                type: Types.Decimal128,
            },
            potential: {
                type: Types.Decimal128,
            },
            originality: {
                type: Types.Decimal128,
            },
        },
    ],
});

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;
