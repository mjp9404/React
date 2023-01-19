import React, { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import { Link } from "react-router-dom";
const Register = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        status: '1',
        company: '',
    });

    const { firstName, lastName, email, phoneNumber, password, company } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);

      
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(formData);

            const res = await axios.post('http://localhost:5000/api/users', body, config);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data)
        }

    }

    return <Fragment>
        <h3>Create New User</h3>
        <Container className="RegisterTemplate">
            <Form onSubmit={e => onSubmit(e)}>
                <Form.Group className="firstName" controlId="formBasicName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter First Name"
                        required
                        name='firstName'
                        className='form-control'
                        value={firstName}
                        onChange={e => onChange(e)} />
                </Form.Group>
                <Form.Group className="lastName" controlId="formBasicsName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Last Name"
                        required
                        name='lastName'
                        className='form-control'
                        value={lastName}
                        onChange={e => onChange(e)} />
                </Form.Group>
                <Form.Group className="mbs-3" controlId="formBasicsEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email"
                        required
                        name='email'
                        className='form-control'
                        value={email}
                        onChange={e => onChange(e)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicsPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Phone Number"
                        required
                        name='phoneNumber'
                        className='form-control'
                        value={phoneNumber}
                        onChange={e => onChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicsPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Password"
                        required
                        name='password'
                        className='form-control'
                        value={password}
                        onChange={e => onChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicsCompany">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" placeholder="Company name (optional)"
                        name='company'
                        className='form-control'
                        value={company}
                        onChange={e => onChange(e)} />
                </Form.Group>
               
                <Form.Text className="reset-sign">
                    <a href="#"><small className="reset">Forgot Password?</small></a><br></br>
                    <Link to={"/login"}><small className="signIn">Already have an account?</small></Link><br></br>
                </Form.Text>


                <Button type="submit" variant="primary" >
                    Submit
                </Button>


            </Form>
        </Container>
    </Fragment>
}
export default Register;
