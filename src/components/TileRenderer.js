import React from 'react';
import '../styles/TileRenderer.css';

import TileRendererImg from '../images/TileRenderer.png';

function TileRenderer() {
    return (
        <div className="project1" id="project1">
            <div className="project1-left">
                <h1>Tile Renderer</h1>
            </div>
            <div className="project1-right">
                <div className="image-container">
                    <div className="border-rectangle-background"></div>
                    <div className="border-rectangle"></div>
                    <img className="tile-renderer" src={TileRendererImg} alt="Tile Renderer" />
                </div>
            </div>
        </div>
    );
}

export default TileRenderer;