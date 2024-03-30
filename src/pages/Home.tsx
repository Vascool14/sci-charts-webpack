import React from 'react';
import StackedColumnChart from '../components/StackedColChart';
import PieChart from '../components/PieChart';

export default function Home() {
    return (
        <main className='responsive-container'>
            <StackedColumnChart />
            <PieChart />
        </main>
    )
}
