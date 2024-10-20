import React from 'react';
import './Header.css';

function Header() {
    return (
        <nav className="header">
            <div className="logo"></div>
            <ul className="nav-items">
                <li><a href="#Home">Home</a></li>
                <li><a href="#project1">Key Actions</a></li>
                <li><a href="#project2">Lumina</a></li>
                <li><a href="#project3">Harrisonburg Explorer</a></li>
            </ul>
        </nav>
    );
}

export default Header;