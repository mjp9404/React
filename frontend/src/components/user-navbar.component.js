import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container} from "react-bootstrap";

export default class MyNavbar extends Component {
    render() {
        return (
            <Navbar className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Container>
                    <Nav>
                        <Navbar.Brand>
                            <Link to ="/" className='navbar-brand'>HOME nVentory</Link>
                        </Navbar.Brand>
                        <Nav>
                            <Link to={"/categories"} className='nav-link'>Categories</Link>
                        </Nav>
                    </Nav>

                    <Nav className="justify-content-end">
                        <Nav>
                            <Link to="/" className='nav-link'>Register</Link>
                        </Nav>
                        <Nav>
                            <Link to="/Login" className='nav-link'>Log In</Link>
                        </Nav>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}