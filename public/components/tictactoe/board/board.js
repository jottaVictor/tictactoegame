'use client'

import { useState } from 'react';
import { SymbolX, SymbolY } from '../symbols';
import './board.css'

export default function board({ sBoard="", sBorders="", firstToPlay="X" }){
    const [symbols, setSymbols] = useState(Array(9).fill(null));
    const nextSymbol = useState(firstToPlay)

    const handleClick = (index) => {
        console.log(`the user selected the element: ${index}`)

        if(symbols[index])
            return;

        const newSymbols = [...symbols]

        newSymbols[index] = <SymbolX/>;

        setSymbols(newSymbols)
    }

    return (
        <div className={` board ${sBoard} `}>
            <div className={` board-row `}>
                <div className='board-cell' onClick={() => handleClick(0)}>{symbols[0]}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handleClick(1)}>{symbols[1]}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handleClick(2)}>{symbols[2]}</div>
            </div>
            <div className={` border-row ${sBorders} `}></div>
            <div className={` board-row `}>
                <div className='board-cell' onClick={() => handleClick(3)}>{symbols[3]}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handleClick(4)}>{symbols[4]}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handleClick(5)}>{symbols[5]}</div>
            </div>
            <div className={` border-row ${sBorders} `}></div>
            <div className={` board-row `}>
                <div className='board-cell' onClick={() => handleClick(6)}>{symbols[6]}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handleClick(7)}>{symbols[7]}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handleClick(8)}>{symbols[8]}</div>
            </div>
        </div>
    )
}