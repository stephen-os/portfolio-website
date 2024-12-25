import React from 'react';
import '../styles/Lumina.css';

import AppScreenshot from '../images/TileRenderer.png';

function Lumina() {
    return (
        <div className="lumina" id='lumina'>
            <div className="lumina-left">
                <div className='lumina-desc'>
                    <h1>Lumina Engine: Pioneering Real-Time 3D Rendering</h1>
                    <p>Lumina is a versatile and lightweight engine designed to streamline real-time 3D rendering for developers and enthusiasts. With a focus on flexibility, Lumina empowers creators to craft visually stunning experiences with ease. Here are some key highlights:</p>
                    <ul>
                        <li><strong>Flexible Abstractions:</strong> Lumina introduces modular abstractions for managing shaders, vertex attributes, vertex arrays, and buffers, making it easy to integrate and extend components.</li>
                        <li><strong>Advanced Camera System:</strong> The engine boasts a robust camera system that supports pitch, yaw, and mouse-driven movement, ensuring immersive navigation within 3D scenes.</li>
                        <li><strong>Custom Transformations:</strong> A powerful Transform class enables precise control over position, rotation, and scale, with support for transformation matrices, facilitating complex object manipulation.</li>
                        <li><strong>ImGui Integration:</strong> Developers can leverage an intuitive ImGui-powered settings panel for real-time adjustments, streamlining the iteration process.</li>
                    </ul>
                    <p>Whether you're building a game, simulation, or interactive visualization, Lumina's architecture ensures clarity and performance at every stage of development.</p>
                </div>
            </div>
            <div className="lumina-middler" />
            <div className="lumina-right">
                <div className="lumina-image-container">
                    <div className="lumina-border-rectangle-background"></div>
                    <div className="lumina-border-rectangle"></div>
                    <img className="lumina-img" src={AppScreenshot} alt="Tile Renderer" />
                </div>
            </div>
        </div>
    );
}

export default Lumina;