import React, { Component } from 'react';

import { Navbar, NavDropdown, Nav, Form, Container, Row, Col, Button } from 'react-bootstrap';
import 'rc-input-number/assets/index.css';
import InputNumber from 'rc-input-number';

import Swal from 'sweetalert2';
import axios from 'axios';

import SockJsClient from 'react-stomp';



class RegistrarProducto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre : "",
            descripcion: "",
            precioBase: 0.0,
            imagen: "",
            sala: "",
            msg: ""
        }
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.registrarProducto = this.registrarProducto.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleChangeMsg = this.handleChangeMsg.bind(this);

    }
    componentDidMount(){
        
    }

    async registrarProducto(){
        this.sendMessage(this.state.sala); // enviar al websocket la sala

        console.log("Me hicieron click.");
        console.log("descripcion", this.state.descripcion);
        console.log("precioBase", this.state.precioBase);
        console.log("imagen", this.state.imagen);
        console.log("sala", this.state.sala);
        if (
            this.state.nombre === "" ||
            this.state.descripcion === "" ||
            this.state.imagen === "" ||
            this.state.sala === "" ||
            this.state.precioBase === 0.0
        ){
            Swal.fire("Campos Vacios!", "Por favor, Llene todos los campos.", "error");
        }else{
            let res = await axios.post('https://instabuy-backend.herokuapp.com/productos/register/', {
                nombre : this.state.nombre,
                descripcion :  this.state.descripcion,
                precioBase : this.state.precioBase,
                imagen : this.state.imagen
              })
            .then(function (response) {
              console.log(response.status);
              console.log(response.data);
                if(response.status===201){
                  
                    Swal.fire("Registro Exitoso!", "El producto, se guardo en la base de datos.", "success");


                }else{
                  Swal.fire("fallo en el servidor", "error servidor: " + response.status, "error");
                }
            },
            )
            .catch(function (error) {
              console.log(error);
              Swal.fire("no hay conexion en el api", "servicio REST no esta en funcionamiento", "error");
            });
            
        }
        
    }

    sendMessage = (msg) => {
        this.clientRef.sendMessage('/createsala.'+this.state.sala, msg);
      }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    onChange = (v) => {
        console.log('onChange:', v);
        this.setState({
            precioBase: v,
        });
      }

    handleChangeMsg(e) {
        this.setState({ msg : e });
    }
    
    render() {
        return (
            <div>
            <div>
                <SockJsClient url='https://instabuy-backend.herokuapp.com/stompendpoint' topics={['/topic/all']}
                    onMessage={(msg) => { this.handleChangeMsg(msg); }}
                    ref={ (client) => { this.clientRef = client }} />
                
                <div>
                    
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
                </div>
                

                

                <div>
                    <br/>
                    <h1>REGISTRAR PRODUCTO</h1>
                    
                    <br/>
                </div>
                <div>
                    <Container fluid="md" className="register-container">
                    <Row>
                    <Col>
                    <Form> 
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control   type="text"
                                            name="nombre"
                                            value={this.state.nombre}
                                            onChange={this.handleChange}
                                            />
                        </Form.Group>
            
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Sala</Form.Label>
                            <Form.Control   type="text"
                                            name="sala"
                                            value={this.state.sala}
                                            onChange={this.handleChange}
                                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Precio Base</Form.Label>
                            <div>
                                <InputNumber
                                    aria-label="decimal values"
                                    min={0.1}
                                    name = "precioBase"
                                    max={100000000}
                                    step={100.0}    
                                    value={this.state.precioBase}
                                    style={{ width: 500 }}
                                    readOnly={false}
                                    onChange={this.onChange}
                                    disabled={false}
                                />
                            </div>
                        </Form.Group>
                    
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control   type="text"
                                            name="imagen"
                                            value={this.state.imagen}
                                            onChange={this.handleChange}
                                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control   type="text"
                                            name="descripcion"
                                            value={this.state.descripcion}
                                            onChange={this.handleChange}
                                            />
                        </Form.Group>
                    </Form>
                    <br/>
                        <Button variant="primary" size="lg" onClick={this.registrarProducto}>
                            REGISTRAR
                        </Button>
                    </Col>
                    </Row>
                    </Container>
                    </div>
                </div>
            </div>
        )
    }

}

export default RegistrarProducto;
