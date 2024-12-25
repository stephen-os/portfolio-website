import React from 'react';
import '../styles/TileRenderer.css';

import Desert from '../images/Desert.png';

function TileRenderer() {
    return (
        <div className="tile-renderer" id='tile-renderer'>
            <div className="tile-renderer-left">
                <div className="tile-renderer-image-container">
                    <div className="tile-renderer-border-rectangle-background"></div>
                    <div className="tile-renderer-border-rectangle"></div>
                    <img className="tile-renderer-img" src={Desert} alt="Tile Renderer" />
                </div>
            </div>
            <div className="tile-renderer-middler" />
            <div className="tile-renderer-right">
                <div className='tile-renderer-desc'>
                    <h1>Tile Renderer: High-Performance Rendering for 2D Grid-Based Worlds</h1>
                    <p>The Tile Renderer in your project is designed to efficiently manage and display 2D grid-based environments, such as those found in strategy games, map editors, and simulation tools. With a focus on optimization and flexibility, this renderer handles large tile maps with ease.</p>
                    <ul>
                        <li><strong>Dynamic Tile Management:</strong> Each tile is rendered as part of a grid structure, supporting dynamic updates and layering for seamless interaction and visual fidelity.</li>
                        <li><strong>Customizable Textures:</strong> Tiles can be assigned unique textures or colors, enabling endless visual customization to suit diverse use cases.</li>
                        <li><strong>Lighting and Effects:</strong> Integrated support for lighting effects and shaders ensures that the renderer delivers visually engaging results, even in large-scale maps.</li>
                        <li><strong>Memory Efficiency:</strong> By utilizing efficient buffer management, the Tile Renderer minimizes memory overhead, ensuring smooth performance on a range of systems.</li>
                    </ul>
                    <p>Designed for scalability, this renderer is the ideal solution for projects that demand precision and style in rendering 2D tiled worlds.</p>
                </div>
            </div>
        </div>
    );
}

export default TileRenderer;