import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import "./App.css";
import api from "../api/index";
import { LoginPage, JudgeOverview, ProjectDetail } from "../components/index";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            user_id: "",
            isUser: sessionStorage.getItem("isLoggedIn"),
        };
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        {this.state.isUser === "true" ? (
                            <Redirect to="/project"></Redirect>
                        ) : (
                            <Redirect to="/login"></Redirect>
                        )}
                    </Route>
                    <Route
                        exact
                        path="/login"
                        render={(props) => <LoginPage {...props} />}
                    />
                    <Route
                        exact
                        path="/project/:id"
                        render={(props) => <ProjectDetail {...props} />}
                    />
                    <Route
                        exact
                        path="/project"
                        render={(props) => (
                            <JudgeOverview
                                {...props}
                                username={this.state.username}
                                user_id={this.state.user_id}
                            />
                        )}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
