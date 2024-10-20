import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <>
      <Header />
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet" />
      </head>
      <div className="home section" id="Home">
        <h1>Home</h1>
      </div>
      <div className="project1 section" id="project1">
        <h1>Key Actions</h1>
      </div>
      <div className="project2 section" id="project2">
        <h1>Lumina</h1>
      </div>
      <div className="project3 section" id="project3">
        <h1>Harrisonburg Explorer</h1>
      </div>
      <Footer />
    </>
  );
}

export default App;
