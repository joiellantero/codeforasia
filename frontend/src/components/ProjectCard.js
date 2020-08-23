import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import api from "../api/index";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProjectCard.css";

class ProjectCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.project.name,
            id: this.props.project._id,
            user_id: sessionStorage.getItem("user_id"),
            score: null,
            showModal: false,
            merits:
                this.props.project.score[0] &&
                this.props.project.score[0].merits
                    ? parseFloat(
                          this.props.project.score[0].merits.$numberDecimal
                      )
                    : null,
            relevance:
                this.props.project.score[0] &&
                this.props.project.score[0].relevance
                    ? parseFloat(
                          this.props.project.score[0].relevance.$numberDecimal
                      )
                    : null,
            originality:
                this.props.project.score[0] &&
                this.props.project.score[0].originality
                    ? parseFloat(
                          this.props.project.score[0].originality.$numberDecimal
                      )
                    : null,
            potential:
                this.props.project.score[0] &&
                this.props.project.score[0].potential
                    ? parseFloat(
                          this.props.project.score[0].potential.$numberDecimal
                      )
                    : null,
        };

        this.onDetailsButtonClick = this.onDetailsButtonClick.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOnHide = this.handleOnHide.bind(this);
    }

    componentDidMount = () => {
        const score = this.calculateScore();

        if (score && score > 0) {
            this.setState({ score: this.calculateScore() });
        }
    };

    calculateScore = () => {
        var weightedScore =
            (this.state.merits * 30) / 100 +
            (this.state.potential * 30) / 100 +
            (this.state.relevance * 30) / 100 +
            (this.state.originality * 10) / 100;

        return weightedScore.toFixed(2);
    };

    handleChange = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: parseFloat(val) });
    };

    onDetailsButtonClick = (event) => {
        event.preventDefault();
        this.props.history.push(`/project/${this.state.id}`);
    };

    onSaveButtonClick = async (event) => {
        event.preventDefault();
        const id = this.state.id;
        const payload = {
            reviewer_id: this.state.user_id,
            merits: this.state.merits,
            relevance: this.state.relevance,
            originality: this.state.originality,
            potential: this.state.potential,
        };

        await api.updateSingleProjectScore(id, payload).then((res) => {
            console.log(res);
            if (res.status == 200) {
                this.setState({
                    score: this.calculateScore(),
                    showModal: true,
                });
            }
        });
    };

    handleOnHide = () => {
        this.setState({ showModal: false });
    };

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    flexFlow: "row warp",
                    justifyContent: "center",
                }}
            >
                <Card style={{ width: "10rem" }}>
                    <Card.Title className="projectTitle">
                        {this.state.name}
                    </Card.Title>
                    <Card.Body>
                        <div>
                            <Button onClick={this.onDetailsButtonClick}>
                                View Details
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card style={{ width: "25rem" }}>
                    <Card.Header style={{ backgroundColor: "white" }}>
                        Your Score:{this.state.score ? this.state.score : "-"}
                    </Card.Header>
                    <Card.Body>
                        <Form
                            key={this.state.id}
                            onSubmit={this.onSaveButtonClick}
                        >
                            <Form.Group>
                                <Form.Row className="justify-content-around">
                                    <Form.Label column lg={8}>
                                        Problem Relevance
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
                                    <Form.Label column lg={8}>
                                        Technical Merits
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
                                    <Form.Label column lg={8}>
                                        Business Potential
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
                                    <Form.Label column lg={8}>
                                        Originality
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
                            <Form.Group>
                                <Form.Row className="justify-content-end">
                                    <Col lg={3}>
                                        <Button type="submit">Save</Button>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                        </Form>
                        <Row></Row>
                    </Card.Body>
                </Card>
                <Modal
                    size="sm"
                    show={this.state.showModal}
                    onHide={this.handleOnHide}
                >
                    <Modal.Header closeButton />
                    <Modal.Body>Successfully updated scores!</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleOnHide}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ProjectCard;
