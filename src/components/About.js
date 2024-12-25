import React from 'react';
import '../styles/About.css';

import Selfy from '../images/Selfy.jpg';

function About() {
    return (
        <div className="about" id="About">
            <div className="about-left">
                <div className="about-image-container">
                    <div className="about-border-rectangle-background"></div>
                    <div className="about-border-rectangle-cont"></div>
                    <img className="about-img" src={Selfy} alt="Tile Renderer" />
                </div>
            </div>
            <div className="about-middler"></div>
            <div className="about-right">
                <div className='about-desc'>
                    <h1>Hello, World!</h1>
                    <h2>My name is Stephen and I am a software developer.</h2>
                    <h2>Below are a few of my personal projects.</h2>
                    <h2>Enjoy!</h2>
                </div>
            </div>
        </div>
    );
}

export default About;