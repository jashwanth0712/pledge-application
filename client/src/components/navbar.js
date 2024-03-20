import React from 'react';
import logo1 from '../navbar1.png';
import logo2 from '../navbar2.png';
import logo3 from '../navbar3.png';
import logo4 from '../navbar4.png';
import "./navbar.css";
function Navbar() {
    return (
        <div className="navbar">
            <img src={logo1} style={{scale:"0.5"}} alt="Logo 1" className="logo" />
            <img src={logo2} alt="Logo 2" className="logo" />
            <img src={logo3} alt="Logo 2" className="logo" />
            <img src={logo4} alt="Logo 2" className="logo" />
            <div className='line'></div>
            <div className="title">
                <p> भारत सरकार/Government Of India</p>
                <p>पर्यावरण, वन और जलवायु परिवर्तन मंत्रालय / Ministry of Environment, Forest & Climate Change</p>
                <p>राष्ट्रीय प्राकृतिक विज्ञान संग्रहालय/National Museum of Natural History</p>
            </div>
        </div>
    );
}

export default Navbar;
