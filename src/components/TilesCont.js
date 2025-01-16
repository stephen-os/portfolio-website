import React from 'react';
import '../styles/TilesCont.css';

import Desert from '../images/Desert.png';
import Forest from '../images/Forest.png';

function TilesCont() {
    return (
        <div className="tiles-cont" id='tiles-cont'>
            <div className="tiles-cont-left">
                <div className="tiles-cont-image-container">
                    <div className="tiles-cont-border-rectangle-background"></div>
                    <div className="tiles-cont-border-rectangle"></div>
                    <img className="tiles-cont-img" src={Desert} alt="Platformer desert level made with Tiles." />
                </div>
            </div>
            <div className="tiles-cont-middler" />
            <div className="tiles-cont-right">
                <div className="tiles-cont-left">
                    <div className="tiles-cont-image-container">
                        <div className="tiles-cont-border-rectangle-background"></div>
                        <div className="tiles-cont-border-rectangle"></div>
                        <img className="tiles-cont-img" src={Forest} alt="RPG adventure level made with Tiles." />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TilesCont;