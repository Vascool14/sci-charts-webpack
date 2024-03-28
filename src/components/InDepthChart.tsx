import React, { useContext } from 'react';
import { Context } from '../Context';
import { ContextInterface } from '../types';

export default function InDepthChart() {
    const { state, setState } = useContext<ContextInterface>(Context);
    return (
        <div className='graph-container'>
            <h1>fjaknev</h1>
        </div>
    )
}