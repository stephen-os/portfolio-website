import React from 'react';
import '../styles/App.css';
import Header from './Header';
import Footer from './Footer';

import About from './About';
import Tiles from './Tiles';
import TilesCont from './TilesCont';
import HarrisonburgExplorer from './HarrisonburgExplorer';
import KeyActions from './KeyActions';
import Resume from './Resume';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  return (
    <>
      <Header />
      <About />
      <Tiles />
      <TilesCont />
      <KeyActions />
      <HarrisonburgExplorer />
      <Resume />
      <Footer />
    </>
  );
}

export default App;
