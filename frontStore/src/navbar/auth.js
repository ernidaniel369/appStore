import {Routes, Route, Link} from 'react-router-dom';
import Home from '../components/home';
import Dashboard from '../components/dashboard';
import AuthUser from '../components/AuthUser';
import logo from '../assets/logo.png';
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';




function Auth() {

  const {token, logout} = AuthUser();

  const logoutUser = () =>{
    if (token !== undefined){
      logout();
    }
  }
  

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark">
        <div className="container-fluid">
          <Link to="/"><img src={logo} width={130} alt="logo"/></Link>
          <ul className="navbar-nav align-items-center mx-3">
            <Nav className="ml-auto nav-link text-light fs-4 me-2">
              <NavDropdown title="Users" id="basic-nav-dropdown">
                <NavDropdown.Item href="/dashboard">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </ul>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default Auth;
