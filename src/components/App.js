import React from 'react';
import '../styles/App.css';
import Header from './Header';
import Footer from './Footer';

import About from './About';
import TileRenderer from './TileRenderer';
import Lumina from './Lumina';
import HarrisonburgExplorer from './HarrisonburgExplorer';
import KeyActions from './KeyActions';

function App() {
  return (
    <>
      <Header />
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet" />
      </head>
      <About />
      <Lumina />
      <TileRenderer />
      <KeyActions />
      <HarrisonburgExplorer />
      <Footer />
    </>
  );
}

export default App;
