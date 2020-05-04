import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import FormTableRow from './FormTableRow';

export default class ShowForm extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:4000/forms/')
        .then(res => {
            this.setState({
                items: res.data
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    DataTable() {
        return this.state.items.map((res, i) => {
            return <FormTableRow obj={res} key={i} />;
        });
    }

    render() {
        return (
            <div className="table-wrapper">
                <Table stripped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Goal</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Objective</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.DataTable()}
                    </tbody>
                </Table>
            </div>
        )
    }
}