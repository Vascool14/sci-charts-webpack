import React, { useState } from 'react';
import StackedColumnChart from '../components/StackedCol';
import SplitPane from 'react-split-pane';

export default function Home() {
    const [sizes, setSizes] = useState([50, 50]);

    const layoutCSS = {
        height: '100px',
        width: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
    return (
        <main className='responsive-container'>
            <StackedColumnChart />
            
            <div className='graph-container'>
                <h1>This is my second one!</h1>
            </div> 
        </main>
    )
}