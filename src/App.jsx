import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Home from './components/Pages/Home'
import About from './components/Pages/About';
import Experience from './components/Pages/Experience'
import Portfolio from './components/Pages/Portfolio'
import Contact from './components/Pages/Contact'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="experience" element={<Experience />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="contact" element={<Contact />} />
            </Route>
        </Routes>
    );
};

export default App;
