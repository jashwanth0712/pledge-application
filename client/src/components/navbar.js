import React from 'react';
import logo1 from '../logo1.png';
import logo2 from '../logo2.png';
import "./navbar.css";
function Navbar() {
    return (
        <div className="navbar">
            <img src={logo1} alt="Logo 1" className="logo" />
            <div className="title">
                <p>GOVERNMENT OF TAMILNADU</p>
                <p>PROJECT NILIGIRI THAR</p>
            </div>
            <img src={logo2} alt="Logo 2" className="logo" />
        </div>
    );
}

export default Navbar;
