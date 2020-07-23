import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import './App.scss';
import Login from './components/login/login';
import SignUp from './components/login/signUp';
import Home from './components/home';
import RegistrarProducto from './components/producto/RegistrarProducto';
function App() {

  const LoginView = () => <Login />;
  const SignUpView = () => <SignUp />;
  const home = () => <Home />
  const registrarProducto = () => <RegistrarProducto />

  return (
    <Router>
    <div className="App">
      <div>
        <Route exact path="/" component={LoginView} />
        <Route exact path="/sign-up" component={SignUpView} />
        <Route exact path="/home" component={home} />
        <Route exact path="/registrarProducto" component={registrarProducto} />
      </div>
    </div>
  </Router>
  );
}

export default App;
