import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/docs" element={<main><h1>Docs</h1> <p>Tips and Tricks (not done yet)</p></main>} />
            </Routes>
        </>
    )
}