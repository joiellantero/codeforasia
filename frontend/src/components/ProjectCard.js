import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import api from "../api/index";

class ProjectCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.project.name,
            id: this.props.project._id,
            user_id: sessionStorage.getItem("user_id"),
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
    }

    componentDidMount = () => {
        console.log(this.state.merits);
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
        });
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
                <Card style={{ width: "20rem" }}>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Button onClick={this.onDetailsButtonClick}>
                        View Details
                    </Button>
                </Card>
                <Card style={{ width: "25rem" }}>
                    <Card.Header style={{ backgroundColor: "white" }}>
                        Your Score:{this.calculateScore()}
                    </Card.Header>
                    <Card.Body>
                        <Form
                            key={this.state.id}
                            onSubmit={this.onSaveButtonClick}
                        >
                            <Form.Group>
                                <Form.Row>
                                    <Form.Label column lg={5}>
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
                                <Form.Row>
                                    <Form.Label column lg={5}>
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
                                <Form.Row>
                                    <Form.Label column lg={5}>
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
                                <Form.Row>
                                    <Form.Label column lg={5}>
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
                                <Form.Row>
                                    <Col lg={{ span: 1, offset: 6 }}>
                                        <Button type="submit">Save</Button>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default ProjectCard;
