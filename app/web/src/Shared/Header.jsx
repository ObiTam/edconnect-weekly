import React from 'react';

const Header = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-md navbar-dark bg-primary">
                <a class="navbar-brand" href="index.html">Project Explorer</a>
                <div>
                    <form class="form-inline" name="searchForm">
                        <input class="form-control" type="text" value="Search Projects"/>
                        <button class="btn btn-primary btn-outline-light" type="button" value="Search" placeholder="search">Search</button>
                        <input class="btn btn-primary" type="submit" value="Submit"/>
                    </form>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" id="signup" href="register.html">Signup</a>
                            <a class="nav-link" style={{display: 'none'}} id="logout" href="index.html">Logout</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="login" href="login.html">Login</a>
                            <span class="navbar-text" id="username" style={{display: 'none'}} href="index.html">Hi</span>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;