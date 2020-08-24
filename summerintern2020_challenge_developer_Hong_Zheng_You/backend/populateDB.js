// populates database with test users and test data
require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Project = require("./models/project");
const User = require("./models/user");

const mockText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque nisi at massa mollis pulvinar. Nam et sem cursus massa pretium fringilla in nec est. Proin in egestas dolor. Nulla ac elit interdum est mattis gravida id et sem. Etiam suscipit varius libero, non viverra dolor efficitur et. Quisque justo ex, feugiat sit amet facilisis non, accumsan sed neque. Fusce diam felis, suscipit ut iaculis quis, aliquet id mi. Cras placerat, est et maximus vestibulum, metus augue consequat erat, vitae ultricies velit felis sed sapien. Praesent et faucibus nisl, ac convallis quam. Vestibulum non nisi eget sapien pellentesque cursus non a ante. Nam ipsum quam, ultricies nec purus a, aliquet suscipit orci. Sed quis mauris ligula. Duis posuere, nisi eu blandit mattis, mi urna consequat elit, id egestas sem magna id sapien. Ut hendrerit venenatis tempus.";

generateUser = async (mockUsername, mockPassword, i) => {
    const user = new User({
        username: mockUsername,
        password: mockPassword,
        user_type: "Reviewer",
    });

    await user
        .save()
        .then(() => {
            console.log(`Successfully created user ${i}!`);
        })
        .catch((err) => {
            console.log("Error occurred");
        });
};

generateProject = async (mockProjectName, i) => {
    const project = new Project({
        name: mockProjectName,
        event: "hackathon",
        members: [
            { name: "member1", description: "I am hackerman!" },
            { name: "member2", description: "l33t coder" },
            {
                name: "member3",
                description: "followed instructions, computer exploded",
            },
        ],
        description: mockText,
        problem: mockText,
        innovation: mockText,
    });

    await project
        .save()
        .then(() => {
            console.log(`Successfully created a project ${i}`);
        })
        .catch((err) => {
            console.log("Error occurred");
        });
};

//using cloud instance of mongoDB
const db =
    process.env.DB ||
    "mongodb+srv://vincenthong:PzWjyLsflqzRtcCx@cfa.j10nv.mongodb.net/cqa?retryWrites=true&w=majority";

async function main() {
    try {
        const connection = mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        for (let model of [Project, User]) {
            try {
                await model.collection.drop();
            } catch (error) {
                console.log(error);
            }
        }

        for (i = 1; i <= 5; i++) {
            let mockUsername = "test" + i;
            let mockPassword = "test" + i;
            let mockProjectName = "project" + i;
            await generateUser(mockUsername, mockPassword, i);
            await generateProject(mockProjectName, i);
        }
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.disconnect();
    }
}

main();
