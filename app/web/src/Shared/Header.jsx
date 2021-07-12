import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    FormControl,
    Button
} from 'react-bootstrap'

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark" style={{padding: '0.5rem'}}>
            <NavbarBrand href="index.html">Project Explorer</NavbarBrand>
            <Nav>
                <FormControl type="text" placeholder="Search Projects" inline />
                <Button variant="outline-light" inline>Search</Button>
                <Button inline >Submit</Button>
            </Nav>
            <Nav style={{ marginLeft: 'auto' }}>
                <Nav.Link id="signup" href="register.html">Signup</Nav.Link>
                <Nav.Link style={{ display: 'none' }} id="logout" href="index.html">Logout</Nav.Link>
                <Nav.Link id="login" href="login.html">Login</Nav.Link>
                <Nav.Item className="navbar-text" id="username" style={{ display: 'none' }} href="index.html">Hi</Nav.Item>
            </ Nav>
        </Navbar>
    )
}

export default Header;