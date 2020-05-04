import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditForm extends Component {

    constructor(props) {
        super(props)

        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeGoal = this.onChangeGoal.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeObjective = this.onChangeObjective.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            projectname: '',
            goal: '',
            desc: '',
            date: '',
            location: '',
            obj: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/forms/edit-form/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    projectname: res.data.projectname,
                    goal: res.data.goal,
                    desc: res.data.desc,
                    date: res.data.date,
                    location: res.data.location,
                    obj: res.data.obj
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeProjectName(e) {
        this.setState({ projectname: e.target.value })
    }

    onChangeGoal(e) {
        this.setState({ goal: e.target.value })
    }

    onChangeDescription(e) {
        this.setState({ desc: e.target.value })
    }

    onChangeDate(e) {
        this.setState({ date: e.target.value })
    }

    onChangeLocation(e) {
        this.setState({ location: e.target.value })
    }

    onChangeObjective(e) {
        this.setState({ obj: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const formObject = {
            projectname: this.state.projectname,
            goal: this.state.goal,
            desc: this.state.desc,
            date: this.state.date,
            location: this.state.location,
            obj: this.state.obj
        }

        axios.put('http://localhost:4000/forms/update-form/' + this.props.match.params.id, formObject)
            .then((res) => {
                console.log(res.data)
                console.log('Form updated')
            }).catch((error) => {
                console.log(error)
            })

        this.props.history.push('/show-form')
    }

    render() {
        return (
            <div className="form-wrapper">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="ProjectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control type="text" placeholder="eg. Hackathon for Students" value={this.state.projectname} onChange={this.onChangeProjectName} />
                    </Form.Group>

                    <Form.Group controlId="Goal">
                        <Form.Label>Goals Adressed</Form.Label>
                        <Form.Control type="text" placeholder="eg. Quality Education" value={this.state.goal} onChange={this.onChangeGoal} />
                    </Form.Group>

                    <Form.Group controlId="Description">
                        <Form.Label>One sentence desctiption</Form.Label>
                        <Form.Control type="text" placeholder="We would like to..." value={this.state.desc} onChange={this.onChangeDescription} />
                    </Form.Group>

                    <Form.Group controlId="Date">
                        <Form.Label>Pick available date</Form.Label>
                        <Form.Control type="text" placeholder="28th April 2020" value={this.state.date} onChange={this.onChangeDate} />
                    </Form.Group>

                    <Form.Group controlId="Location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Asia Pacific University" value={this.state.location} onChange={this.onChangeLocation} />
                    </Form.Group>

                    <Form.Group controlId="Objective">
                        <Form.Label>Objective</Form.Label>
                        <Form.Control type="text" placeholder="Our goal is..." value={this.state.obj} onChange={this.onChangeObjective} />
                    </Form.Group>

                    <Button variant="success" size="lg" block="block" type="submit">
                        Update Form
                    </Button>
                </Form>
            </div >
        )
    }
}