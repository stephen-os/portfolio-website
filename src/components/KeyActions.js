import React from 'react';
import '../styles/KeyActions.css';

import KeyActionsImage from '../images/KeyActions.png';

function KeyActions() {
    return (
        <div className="key-actions" id='key-actions'>
            <div className="key-actions-left">
                <div className='key-actions-desc'>
                    <h1>Key Actions: Intuitive Key Recording and Playback</h1>
                    <p>Key Actions is a powerful yet easy-to-use software designed for recording and playing back key actions with precision. Whether you're automating repetitive tasks or creating complex action sequences, Key Actions provides the tools to streamline your workflows effortlessly.</p>
                    <h2>Key Features:</h2>
                    <ul>
                        <li><strong>Flexible Recording:</strong> Record key actions and store them for later use. Users can choose specific recordings to replay with just a few clicks.</li>
                        <li><strong>Custom Delays:</strong> Insert delays between individual actions or entire recordings to fine-tune playback timing and ensure smooth execution.</li>
                        <li><strong>Sequence Creation:</strong> Combine multiple recordings into a "sequence" and play them back in a user-specified order. Sequences provide full control over the playback flow, with options to add delays between recordings.</li>
                        <li><strong>Playback Control:</strong> Seamlessly play, pause, or stop recordings and sequences as needed, allowing users to maintain flexibility during execution.</li>
                    </ul>
                    <p>Key Actions is ideal for developers, gamers, and professionals looking to enhance productivity through automation. With its user-friendly interface and robust feature set, Key Actions simplifies the process of creating and managing key recordings and sequences.</p>
                </div>
            </div>
            <div className="key-actions-middler" />
            <div className="key-actions-right">
                <div className="key-actions-image-container">
                    <div className="key-actions-border-rectangle-background"></div>
                    <div className="key-actions-border-rectangle"></div>
                    <img className="key-actions-img" src={KeyActionsImage} alt="Tile Renderer" />
                </div>
            </div>
        </div>
    );
}

export default KeyActions;
