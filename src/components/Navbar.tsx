import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import { ContextInterface } from '../types';
import Toggle from './Toggle';

export default function NavBar() {
    const { state, setState } = useContext<ContextInterface>(Context);

    // for hiding navbar on scroll
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset; // scrollY
        setVisible((prevScrollPos >= currentScrollPos) || currentScrollPos < 100);
        setPrevScrollPos(currentScrollPos);
    }
    window.addEventListener('scroll', handleScroll);

    // for toggling theme
    function toggleTheme(){
        const newTheme = (state.theme =='dark'?'light':'dark');
        document.documentElement.setAttribute('data-theme', newTheme );
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--bg'));
        setState({...state, theme: newTheme});
    }
    return (
        <nav style={{
            transform: (window.innerWidth > 640 && !visible) ? 'translateY(-200%)' : 'translateY(0)',
            transition: 'transform 0.5s'
        }}>
            {/* HOME */}
            <Link to="/"><h3>SCI<strong>CHARTS</strong></h3></Link>

            {/* DOCS */}
            <Link to="/docs" style={{marginRight: 'auto'}}><h3>Docs</h3></Link>

            {/* Toggle Theme */}
            <Toggle isDark={state.theme === 'dark'} toggleTheme={toggleTheme} />
        </nav>
    )
}