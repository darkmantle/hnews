import React from 'react';
import logo from "../../assets/Logo.png";
import "./index.scss";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" data-testid="navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">What we do</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Our staff</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Contact us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
