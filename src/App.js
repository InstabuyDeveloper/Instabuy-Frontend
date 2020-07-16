import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Login from './components/login/login';
import SignUp from './components/login/signUp';
import Home from './components/home';
function App() {

  const LoginView = () => <Login />;
  const SignUpView = () => <SignUp />;
  const home = () => <Home />

  return (
    <Router>
    <div className="App">
      <div>
        <Route exact path="/" component={LoginView} />
        <Route exact path="/sign-up" component={SignUpView} />
        <Route exact path="/home" component={home} />
      </div>
    </div>
  </Router>
  );
}

export default App;
