import React from 'react';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <a className="navbar-brand" href="index.html">Project Explorer</a>
            <form className="form-inline" name="searchForm">
                <input className="form-control" type="text" value="Search Projects" />
                <button className="btn btn-primary btn-outline-light" type="button" value="Search" placeholder="search">Search</button>
                <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" id="signup" href="register.html">Signup</a>
                    <a className="nav-link" style={{ display: 'none' }} id="logout" href="index.html">Logout</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="login" href="login.html">Login</a>
                    <span className="navbar-text" id="username" style={{ display: 'none' }} href="index.html">Hi</span>
                </li>
            </ul>
        </nav>
    )
}

export default Header;