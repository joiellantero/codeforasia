import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import api from "../api/index";
import "./LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
    };

    handleLogin = async (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        const payload = { username, password };
        await api.loginUser(payload).then((res) => {
            // quick hack. Should use something like cookies with proper flags for security.
            if (res.data.isUser) {
                // sessionStorage only store values as string
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("username", res.data.username);
                sessionStorage.setItem("user_id", res.data.id);
                this.props.history.push("/project");
            } else {
                sessionStorage.setItem("isLoggedIn", "false");
            }
        });
    };

    render() {
        return (
            <Container>
                <Row className="justify-content-center loginTitle">
                    <h1>Code For Asia</h1>
                </Row>
                <Row className="justify-content-center align-items-center">
                    <Col lg={3}>
                        <Form onSubmit={this.handleLogin}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    name="username"
                                    onChange={this.handleChange}
                                    placeholder="Username"
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    onChange={this.handleChange}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LoginPage;
