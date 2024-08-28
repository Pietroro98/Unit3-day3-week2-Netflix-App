import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = function () {
  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand href="#home" className="overb">
          <img src="logo.png" width="100" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/" className="overfooter">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/tv-shows" className="overfooter">
              TV Shows
            </Nav.Link>
            <Nav.Link as={Link} to="/movies" className="overfooter">
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/recently-added" className="overfooter">
              Recently Added
            </Nav.Link>
            <Nav.Link as={Link} to="/my-list" className="overfooter">
              My List
            </Nav.Link>
          </Nav>
          <div className="d-flex text-secondary align-items-center">
            <i className="bi bi-search px-3 overfooter"></i>
            <Nav.Link className="nav-link px-3 overfooter" href="#">
              KIDS
            </Nav.Link>
            <i className="bi bi-bell-fill px-3 overfooter"></i>
            <NavDropdown
              title={<img src="kids.png" width="70" alt="kids" />}
              id="basic-nav-dropdown"
              className="me-5"
            >
              <NavDropdown.Item href="#">Edit Profiles</NavDropdown.Item>
              <NavDropdown.Item to="/account">Account</NavDropdown.Item>
              <NavDropdown.Item href="#">Help Center</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Sign Out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavbar;
