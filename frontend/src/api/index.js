import axios from "axios";

require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 8000;

function loginUser(payload) {
    return axios.request({
        method: "POST",
        url: `http://localhost:${port}/login`,
        data: payload,
    });
}
function getAllProjectsOverview(payload) {
    return axios.request({
        method: "POST",
        url: `http://localhost:${port}/project`,
        data: payload,
    });
}

function getSingleProjectDetail(id, payload) {
    return axios.request({
        method: "POST",
        url: `http://localhost:${port}/project/${id}`,
        data: payload,
    });
}

function updateSingleProjectScore(id, payload) {
    return axios.request({
        method: "POST",
        url: `http://localhost:${port}/project/update/${id}`,
        data: payload,
    });
}

const apis = {
    getAllProjectsOverview,
    loginUser,
    getSingleProjectDetail,
    updateSingleProjectScore,
};
export default apis;
