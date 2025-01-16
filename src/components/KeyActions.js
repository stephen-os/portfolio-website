import React from 'react';
import '../styles/KeyActions.css';

import KeyActionsImage from '../images/KeyActions.png';

function KeyActions() {
    return (
        <div className="key-actions" id="key-actions">
            <div className="key-actions-left">
                <div className="key-actions-desc">
                    <h1>Key Actions: Macro Builder</h1>
                    <p>
                        Key Actions is a user-friendly application for recording and playing back keystrokes and mouse movements with ease.
                    </p>
                    <h2>Key Features:</h2>
                    <ul>
                        <li>
                            <strong>Recording: </strong>
                            Name your recordings, toggle mouse recording on or off, and set a delay before recording starts to give you time to prepare. Configure start and stop settings for seamless control.
                        </li>
                        <li>
                            <strong>Playback: </strong>
                            Select recordings directly within the app for playback. Customize playback with options to set a delay before starting, define loop counts, and adjust delays between loops.
                        </li>
                        <li>
                            <strong>Sequences: </strong>
                            Create custom recordings by combining existing ones. Add delays between recordings in a sequence, and play sequences just like regular recordings.
                        </li>
                        <li>
                            <strong>Serialization: </strong>
                            Save and manage recordings and sequences directly within the app. Specify custom directories for recording and playback storage.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="key-actions-middle" />
            <div className="key-actions-right">
                <div className="key-actions-image-container">
                    <div className="key-actions-border-rectangle-background"></div>
                    <div className="key-actions-border-rectangle"></div>
                    <img
                        className="key-actions-img"
                        src={KeyActionsImage}
                        alt="Key Actions Interface"
                    />
                </div>
            </div>
        </div>
    );
}

export default KeyActions;