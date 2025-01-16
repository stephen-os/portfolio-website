import React from 'react';
import '../styles/HarrisonburgExplorer.css';

import HarrisonburgExplorerImage from '../images/HarrisonburgExplorerImage.png';

function HarrisonburgExplorer() {
    return (
        <div className="harrisonburg-explorer" id="harrisonburg-explorer">
            <div className="harrisonburg-explorer-left">
                <div className="harrisonburg-explorer-image-container">
                    <div className="harrisonburg-explorer-border-rectangle-background"></div>
                    <div className="harrisonburg-explorer-border-rectangle"></div>
                    <img
                        className="harrisonburg-explorer-img"
                        src={HarrisonburgExplorerImage}
                        alt="Harrisonburg Explorer"
                    />
                </div>
            </div>
            <div className="harrisonburg-explorer-middle" />
            <div className="harrisonburg-explorer-right">
                <div className="harrisonburg-explorer-desc">
                    <h1>Harrisonburg Explorer: TSP Visualizer</h1>
                    <p>
                        Harrisonburg Explorer is real world traveling salesman problem (TSP) visualiser made for the Capital Region Celebration of Women in Computing (CAPWIC) 2024 Flash Talks.
                    </p>
                    <h2>Key Features:</h2>
                    <ul>
                        <li>
                            <strong>Custom Routes: </strong>
                            Make your own routes to explore the city the way you want.
                        </li>
                        <li>
                            <strong>Pre-Made Tours: </strong>
                            Choose from ready-made tours like a historical tour or a fun tour for easy exploring.
                        </li>
                        <li>
                            <strong>Pick Your Algorithm: </strong>
                            Choose how the app plans your routes:
                            <ul>
                                <li>
                                    <strong>Exact Algorithm: </strong>
                                    Finds the best possible route, but it might take a little longer.
                                </li>
                                <li>
                                    <strong>Christofides Algorithm: </strong>
                                    Finds a quick route that’s still pretty good.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>Itinerary Maker: </strong>
                            Get a detailed plan with driving distances and tour highlights.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HarrisonburgExplorer;
