import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import { initSciChart } from './Comp1';
import Home from './pages/Home';

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/docs" element={<main><h1>docs</h1></main>} />
            </Routes>
        </>
    )
}