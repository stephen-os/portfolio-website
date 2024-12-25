import React from 'react';
import '../styles/HarrisonburgExplorer.css';

import HarrisonburgExplorerImage from '../images/HarrisonburgExplorerImage.png';

function HarrisonburgExplorer() {
    return (
        <div className="harrisonburg-explorer" id='harrisonburg-explorer'>
            <div className="harrisonburg-explorer-left">
                <div className="harrisonburg-explorer-image-container">
                    <div className="harrisonburg-explorer-border-rectangle-background"></div>
                    <div className="harrisonburg-explorer-border-rectangle"></div>
                    <img className="harrisonburg-explorer-img" src={HarrisonburgExplorerImage} alt="Tile Renderer" />
                </div>
            </div>
            <div className="harrisonburg-explorer-middler" />
            <div className="harrisonburg-explorer-right">
                <div className='harrisonburg-explorer-desc'>
                    <h1>Harrisonburg Explorer: Navigating the Traveling Salesman Problem</h1>
                    <p>Harrisonburg Explorer is an innovative application developed by Stephen, Alex Milanese, and Hannah Lam to demonstrate practical solutions to the Traveling Salesman Problem (TSP). Designed for real-world scenarios, this app integrates seamlessly with Google Maps to generate optimized routes for exploring Harrisonburg, VA.</p>
                    <h2>Key Features:</h2>
                    <ul>
                        <li><strong>Custom Routes:</strong> Users can generate personalized routes tailored to their preferences, providing flexibility for exploring Harrisonburg.</li>
                        <li><strong>Predefined Tours:</strong> The app includes curated tours such as a historical tour and a fun tour, offering structured exploration options for users.</li>
                        <li><strong>Algorithm Selection:</strong> Users can choose between two supported algorithms for generating tours:
                            <ul>
                                <li><strong>Exact Algorithm:</strong> Produces the absolute best solution by evaluating all possible tours, ensuring optimal results.</li>
                                <li><strong>Christofides Algorithm:</strong> Provides a faster solution by sacrificing some accuracy, ideal for users prioritizing speed.</li>
                            </ul>
                        </li>
                        <li><strong>Itinerary Generation:</strong> Automatically generates a detailed itinerary based on the selected tour, including distance information by car and tour features.</li>
                    </ul>
                    <p>By combining advanced algorithms with the power of Google Maps, Harrisonburg Explorer bridges theoretical computer science and practical application, offering a unique tool for exploring the city efficiently and enjoyably.</p>
                </div>
            </div>
        </div>
    );
}

export default HarrisonburgExplorer;
