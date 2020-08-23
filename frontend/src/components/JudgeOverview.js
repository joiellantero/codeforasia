import React from "react";
import api from "../api/index";
import { Redirect } from "react-router-dom";
import { ProjectCard } from "./index";
import "./JudgeOverview.css";

class JudgeOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: sessionStorage.getItem("username"),
            user_id: sessionStorage.getItem("user_id"),
            isLoggedIn: sessionStorage.getItem("isLoggedIn"),
            projects: [],
        };
    }

    componentDidMount = async () => {
        const payload = {
            reviewer_id: this.state.user_id,
        };

        await api.getAllProjectsOverview(payload).then((res) => {
            console.log(res.data);
            this.setState({
                projects: res.data,
            });
            console.log(this.state);
        });
    };

    render() {
        return (
            <div>
                {this.state.isLoggedIn === "true" ? (
                    <div className="overview">
                        <div>
                            <header className="overviewHeader">
                                <h1>Welcome, {this.state.username} !</h1>
                            </header>
                        </div>

                        <div className="overviewSubtitle">
                            <p>Please review these project submissions.</p>
                        </div>

                        <div>
                            {this.state.projects.map((project) => (
                                <div>
                                    <ProjectCard
                                        {...this.props}
                                        project={project}
                                    />
                                    <br />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <Redirect to="/login" />
                )}
            </div>
        );
    }
}

export default JudgeOverview;
