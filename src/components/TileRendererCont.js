import React from 'react';
import '../styles/TileRendererCont.css';

import Desert from '../images/Desert.png';

function TileRenderer() {
    return (
        <div className="project1-cont">
            <div className="project1-right-cont">
                <div className="image-container-cont">
                    <div className="border-rectangle-background-cont"></div>
                    <div className="border-rectangle-cont"></div>
                    <img className="tile-renderer-cont" src={Desert} alt="Tile Renderer" />
                </div>
            </div>
            <div className="project1-left-cont">
                <h1>Tile Renderer Continued</h1>
            </div>
        </div>
    );
}

export default TileRenderer;