import React from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function Login() {
    return (

        <Container className="LoginTemplate">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Text className="reset-sign">
            <a href="#"><small className="reset">Forgot Password?</small></a><br></br>
            <Link to={"/"}><small className="signup">Not a user yet? Sign Up!</small></Link><br></br>
          </Form.Text> 
         <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Container>
    );
  }
  
  export default Login;
