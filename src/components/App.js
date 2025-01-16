import React from 'react';
import '../styles/App.css';
import Header from './Header';
import Footer from './Footer';

import About from './About';
import Tiles from './Tiles';
import TilesCont from './TilesCont';
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
      <Tiles />
      <TilesCont />
      <KeyActions />
      <HarrisonburgExplorer />
      <Footer />
    </>
  );
}

export default App;
