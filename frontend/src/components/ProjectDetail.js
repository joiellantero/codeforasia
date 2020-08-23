import React from "react";
import api from "../api/index";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: sessionStorage.getItem("user_id"),
            isLoggedIn: sessionStorage.getItem("isLoggedIn"),
            project: null,
            merits: null,
            relevance: null,
            potential: null,
            originality: null,
            showModal: false,
        };

        this.onScoreButtonClick = this.onScoreButtonClick.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const payload = {
            reviewer_id: this.state.user_id,
        };

        await api.getSingleProjectDetail(id, payload).then((res) => {
            console.log(res.data[0]);

            if (res.data[0]) {
                this.setState({
                    project: res.data[0],
                    merits:
                        res.data[0].score[0] && res.data[0].score[0].merits
                            ? parseFloat(
                                  res.data[0].score[0].merits.$numberDecimal
                              )
                            : null,
                    relevance:
                        res.data[0].score[0] && res.data[0].score[0].relevance
                            ? parseFloat(
                                  res.data[0].score[0].relevance.$numberDecimal
                              )
                            : null,
                    originality:
                        res.data[0].score[0] && res.data[0].score[0].originality
                            ? parseFloat(
                                  res.data[0].score[0].originality
                                      .$numberDecimal
                              )
                            : null,
                    potential:
                        res.data[0].score[0] && res.data[0].score[0].potential
                            ? parseFloat(
                                  res.data[0].score[0].potential.$numberDecimal
                              )
                            : null,
                });
            }
        });
    };

    onScoreButtonClick = (event) => {
        event.preventDefault();
        this.setState({ showModal: true });
    };

    onSaveButtonClick = async (event) => {
        console.log("ProjectDetail.js");
        event.preventDefault();
        const id = this.props.match.params.id;
        const payload = {
            reviewer_id: this.state.user_id,
            merits: this.state.merits,
            relevance: this.state.relevance,
            originality: this.state.originality,
            potential: this.state.potential,
        };

        await api.updateSingleProjectScore(id, payload).then((res) => {
            console.log(res);
            this.setState({ showModal: false });
        });
    };

    handleModalClose = () => {
        this.setState({ showModal: false });
    };

    handleChange = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: parseFloat(val) });
    };

    render() {
        return (
            <Container>
                <Row
                    style={{ paddingBottom: "10px" }}
                    className="justify-content-center"
                >
                    <Col md={6}>
                        {this.state.isLoggedIn === "true" &&
                            this.state.project && (
                                <div>
                                    <h1 style={{ textAlign: "center" }}>
                                        {this.state.project.name}
                                    </h1>
                                </div>
                            )}
                    </Col>
                </Row>

                <Row>
                    <Col lg={8}>
                        <Row>
                            <div
                                style={{
                                    backgroundColor: "grey",
                                    height: "20rem",
                                    width: "50rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <p>Photo or Video</p>
                            </div>
                        </Row>

                        <Row
                            style={{ paddingTop: "5px" }}
                            className="justify-content-end"
                        >
                            <Button onClick={this.onScoreButtonClick}>
                                Score
                            </Button>
                        </Row>
                    </Col>

                    <Col lg={4}>
                        <div>
                            <p>
                                SUBMITTED TO: <br />{" "}
                                {this.state.project && this.state.project.event}
                            </p>
                        </div>
                        <div>
                            <p>SUBMITTED BY:</p>
                        </div>
                    </Col>
                </Row>

                <Modal
                    centered
                    show={this.state.showModal}
                    onHide={this.handleModalClose}
                >
                    <Modal.Header closeButton>Score this project</Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Row className="justify-content-around">
                                    <Form.Label
                                        column
                                        lg={4}
                                        className="d-none d-lg-block"
                                    >
                                        Criteria
                                    </Form.Label>
                                    <Form.Label
                                        column
                                        lg={2}
                                        className="d-none d-lg-block"
                                    >
                                        Criteria Value
                                    </Form.Label>
                                    <Form.Label
                                        column
                                        lg={3}
                                        className="d-none d-lg-block"
                                    >
                                        Score
                                    </Form.Label>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Row className="justify-content-around">
                                    <Form.Label column lg={4}>
                                        Problem Relevance
                                    </Form.Label>
                                    <Form.Label
                                        column
                                        lg={2}
                                        className="d-none d-lg-block"
                                    >
                                        30%
                                    </Form.Label>
                                    <Col lg={3}>
                                        <Form.Control
                                            required
                                            name="relevance"
                                            type="number"
                                            placeholder="e.g. 3"
                                            min={0}
                                            step={0.1}
                                            defaultValue={this.state.relevance}
                                            onChange={this.handleChange}
                                        ></Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Row className="justify-content-around">
                                    <Form.Label column lg={4}>
                                        Technical Merits
                                    </Form.Label>
                                    <Form.Label
                                        column
                                        lg={2}
                                        className="d-none d-lg-block"
                                    >
                                        30%
                                    </Form.Label>
                                    <Col lg={3}>
                                        <Form.Control
                                            required
                                            name="merits"
                                            type="number"
                                            placeholder="e.g. 3"
                                            min={0}
                                            step={0.1}
                                            defaultValue={this.state.merits}
                                            onChange={this.handleChange}
                                        ></Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Row className="justify-content-around">
                                    <Form.Label column lg={4}>
                                        Business Potential
                                    </Form.Label>
                                    <Form.Label
                                        column
                                        lg={2}
                                        className="d-none d-lg-block"
                                    >
                                        30%
                                    </Form.Label>
                                    <Col lg={3}>
                                        <Form.Control
                                            required
                                            name="potential"
                                            type="number"
                                            placeholder="e.g. 3"
                                            min={0}
                                            step={0.1}
                                            defaultValue={this.state.potential}
                                            onChange={this.handleChange}
                                        ></Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Row className="justify-content-around">
                                    <Form.Label column lg={4}>
                                        Originality
                                    </Form.Label>
                                    <Form.Label
                                        column
                                        lg={2}
                                        className="d-none d-lg-block"
                                    >
                                        10%
                                    </Form.Label>
                                    <Col lg={3}>
                                        <Form.Control
                                            required
                                            name="originality"
                                            type="numbers"
                                            placeholder="e.g. 3"
                                            min={0}
                                            step={0.1}
                                            defaultValue={
                                                this.state.originality
                                            }
                                            onChange={this.handleChange}
                                        ></Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" onClick={this.onSaveButtonClick}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Row>
                    <h2>Description</h2>
                </Row>
                <Row>
                    <p>{this.state.project.description}</p>
                </Row>
                <Row>
                    <h2>Problem</h2>
                </Row>
                <Row>
                    <p>{this.state.project.problem}</p>
                </Row>
                <Row>
                    <h2>Innovation</h2>
                </Row>
                <Row>
                    <p>{this.state.project.innovation}</p>
                </Row>

                <Row>
                    {this.state.isLoggedIn === "true" &&
                        !this.state.project && (
                            <div>This project does not exists.</div>
                        )}
                    {this.state.isLoggedIn === "false" && (
                        <Redirect to="/login" />
                    )}
                </Row>
            </Container>
        );
    }
}

export default ProjectDetail;
