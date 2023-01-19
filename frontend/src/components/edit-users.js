import React, { Fragment, useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const EditUser = () => {

  const { id } = useParams();
  const count = 0;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    status:'',
    role:'',
    company:'',
});

useEffect(() => {
  const config = {
      headers:{
          'Content-Type':'application/json',
      }
  }
  axios.get('http://localhost:5000/api/profile/'+ id, config)
  .then(response => {
//       setFormData(response.data)
  })
}, [count]);

const { firstName, lastName, email, phoneNumber, password, status, role, company } = formData;

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async e => {
    e.preventDefault();
    // console.log(formData);

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(formData);
        const res = await axios.post('http://localhost:5000/api/admins/update/'+id, body, config);
        console.log(res.data);
    } catch (err) {
        console.error(err.response.data)
    }

  }

  return (
    <Fragment>
    <h3>Update User</h3>
    <Container className="RegisterTemplate">
        <Form onSubmit={e => onSubmit(e)}>
            <Form.Group className="firstName" controlId="formBasicName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="name" placeholder="Enter First Name"
                    // required
                    name='firstName'
                    className='form-control'
                    value={firstName}
                    onChange={e => onChange(e)} />
            </Form.Group>
            <Form.Group className="lastName" controlId="formBasicsName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="name" placeholder="Enter Last Name"
                    // required
                    name='lastName'
                    className='form-control'
                    value={lastName}
                    onChange={e => onChange(e)} />
            </Form.Group>
            <Form.Group className="mbs-3" controlId="formBasicsEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter email"
                    // required
                    name='email'
                    className='form-control'
                    value={email}
                    onChange={e => onChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicsPassword">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone Number"
                    // required
                    name='phoneNumber'
                    className='form-control'
                    value={phoneNumber}
                    onChange={e => onChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicsPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Password"
                    // required
                    name='password'
                    className='form-control'
                    value={password}
                    onChange={e => onChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicsPassword">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" placeholder="Status"
                    // required
                    name='status'
                    className='form-control'
                    value={status}
                    onChange={e => onChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicsPassword">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" placeholder="Role"
                    // required
                    name='role'
                    className='form-control'
                    value={role}
                    onChange={e => onChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicsPassword">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Company (Optional)"
                    // required
                    name='company'
                    className='form-control'
                    value={company}
                    onChange={e => onChange(e)} />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicsPassword">
                        <Form.Label>Company</Form.Label>
                        <Form.Control type="text" placeholder="Optional" 
                        //  required
                         className='form-control'
                         value={company}
                         onChange={onNewCompany}/>
                    </Form.Group> */}
        

            <Button type="submit" variant="primary" >
                Submit
            </Button>


        </Form>
    </Container>
</Fragment>
  );
} 
export default EditUser;
