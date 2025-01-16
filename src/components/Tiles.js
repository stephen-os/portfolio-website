import React from 'react';
import '../styles/Tiles.css';

import AppScreenshot from '../images/TilesScreenshot.png';

function Tiles() {
    return (
        <div className="tiles" id="tiles">
            <div className="tiles-left">
                <div className="tiles-desc">
                    <h1>Tiles: A Simple Tilemap Editor</h1>
                    <p>
                        Tiles is a lightweight, intuitive tilemap editor designed for creating seamless 2D worlds with ease.
                    </p>
                    <h2>Key Features:</h2>
                    <ul>
                        <li>
                            <strong>Layer-Based Workflow: </strong>
                            Organize tiles into layers to add depth and detail by overlaying tiles. Layers can be toggled for visibility, allowing focused editing.
                        </li>
                        <li>
                            <strong>Tools: </strong>
                            Includes tools for resizing, filling, and erasing tiles, giving users flexibility and control.
                        </li>
                        <li>
                            <strong>Serialization: </strong>
                            Save and load projects effortlessly for future edits with robust file support.
                        </li>
                        <li>
                            <strong>Export Options: </strong>
                            Specify tile resolution and export your creation as a PNG for easy sharing and integration.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="tiles-divider"></div>
            <div className="tiles-right">
                <div className="tiles-image-container">
                    <div className="tiles-border-rectangle-background"></div>
                    <div className="tiles-border-rectangle"></div>
                    <img
                        className="tiles-img"
                        src={AppScreenshot}
                        alt="Tilemap Editor Screenshot"
                    />
                </div>
            </div>
        </div>
    );
}

export default Tiles;
