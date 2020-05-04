import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class FormTableRow extends Component {

    constructor(props) {
        super(props)
        this.deleteForm = this.deleteForm.bind(this);
    }

    deleteForm() {
        axios.delete('http://localhost:4000/forms/delete-form/' + this.props.obj._id)
            .then((res) => {
                console.log('Form successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.projectname}</td>
                <td>{this.props.obj.goal}</td>
                <td>{this.props.obj.desc}</td>
                <td>{this.props.obj.date}</td>
                <td>{this.props.obj.location}</td>
                <td>{this.props.obj.obj}</td>
                <td>
                    <Link className="edit-link" to={"/edit-form/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteForm} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}