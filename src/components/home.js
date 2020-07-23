import React, { Component } from 'react';

import { Navbar, NavDropdown, Nav  } from 'react-bootstrap';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home">INSTABUY</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <NavDropdown title="Usuario" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/sign-up">Registrar Usuario</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </NavDropdown>
                    <NavDropdown title="Producto" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/registrarProducto">Registrar Producto</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link eventKey={2} href="/">
                        LOGIN
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

        )
    }

}

export default Home;


