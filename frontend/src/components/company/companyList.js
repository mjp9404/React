import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import CreateCompany from "./create-company";

const Company = props => {
    if (props.user.role === 0)
        return (
            <tr>
                <td><b>{props.company._id}</b></td>
                <td><b>{props.company.companyName}</b></td>
                <td>
                    <Link to={"/company-edit/" + props.company._id}>edit</Link>
                </td>
                <td>
                <a href="#" onClick={() => { props.deleteUser(props.company._id) }}>delete</a>
                </td>
            </tr>);
    return (
        <tr>
            <td><b>{props.company.companyName}</b></td>
            <td>
            </td>
        </tr>);
}

export default class CompanyList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companies: []
        };
    }

    componentDidMount() {
        const config = {
            headers: {
                'x-auth-token': this.props.user.token
            }
        }
        axios.get('http://localhost:5000/api/companies/', config)
            .then(res => {
                this.setState({ companies: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    companyList() {
        return this.state.companies.map(currentCompany => {
            return <Company company={currentCompany} key={currentCompany._id} user={this.props.user} />
        })
    }

    render() {
        return (
            <div>
                <h3>Company List</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>ID</th>
                            <th>Company Name</th>
                            <th>Edit Company Name</th>
                            <th>Delete Company Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.companyList()}
                    </tbody>
                </table>
                <CreateCompany user={this.props.user} />
            </div>
        )
    }
}