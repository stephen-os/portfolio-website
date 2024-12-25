import React from 'react';
import '../styles/Header.css';

function Header() {
    return (
        <nav className="header">
            <div className="logo"></div>
            <ul className="nav-items">
                <li><a href="#Home">About</a></li>
                <li><a href="#lumina">Lumina</a></li>
                <li><a href="#tile-renderer">Tile Renderer</a></li>
                <li><a href="#key-actions">Key Actions</a></li>
                <li><a href="#harrisonburg-explorer">Harrisonburg Explorer</a></li>
            </ul>
        </nav>
    );
}

export default Header;