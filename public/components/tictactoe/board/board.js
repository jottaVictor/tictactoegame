'use client'

import { useState, useEffect } from 'react';
import { SymbolX, SymbolO } from '../symbols';
import './board.css'

export default function Board({ sBoard="", sBorders="", firstToPlay = 'X', styleSymbol1 = '', styleSymbol2 = '', mode='playerxplayer' }){
    const [timeToPlay, setTimeToPlay] = useState(firstToPlay)
    const [symbols, setSymbols] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);
      

    const Symbol1 = <SymbolX style={styleSymbol1}/>
    const Symbol2 = <SymbolO style={styleSymbol2}/>
    
    useEffect(() => {
        console.log(`The gamemode was seted to ${mode}`)
        console.log("Symbol is:")
        console.log(symbols)
    })

    const validWinner = (r, c) => {
        let checkMain = r == c
        let checkSecondary = r + c == 2

        for(let mode = 0; mode < 3; mode++){    
            let winnerSymbol = null
            for(let i = 0; i < 3; i++){
                let currentSymbol = null
                if(mode == 0){
                    currentSymbol = symbols[r][i]
                }
                else if(mode == 1){
                    currentSymbol = symbols[i][c]
                }
                else if(mode == 2 && checkMain){
                    currentSymbol = symbols[i][i]
                }
                else if(checkSecondary){
                    currentSymbol = symbols[i][2-i]
                }
                
                if(i == 0){
                    winnerSymbol = currentSymbol
                }else if(winnerSymbol !== currentSymbol){
                    winnerSymbol = false
                }

                if(i == 2 && winnerSymbol !== null && winnerSymbol !== false){
                    console.log(`The game has a winner in mode ${mode} the winner is ${currentSymbol}`)
                    alert(`GANHOU ${currentSymbol}`)
                    return true;
                }
            }
        }
    }

    const handlesClick = {
        playerxplayer: (r, c) => {
            console.log(`the user selected the element row: ${r} col: ${c}`)
    
            if(symbols[r][c])
                return
    
            const newSymbols = [...symbols]
    
            newSymbols[r][c] = timeToPlay
    
            const newTImeToPlay = timeToPlay == 'X' ? 'O' : 'X'

            console.log(`Time to play has changed to: ${newTImeToPlay}`)

            setTimeToPlay(newTImeToPlay)
            setSymbols(newSymbols)

            validWinner(r, c)
        },
        playerxsocket: () => {
            console.log('playerxsocket handler not implemented yet')
        }
    }

    const renderRow = (row) => {
        let i = row
        const elements = []
        
        while (i < row + 3) {
            console.log(`symbols[${row}][${i}]:`, symbols[row][i]);
            elements.push(<div className='board-cell' onClick={() => handlesClick[mode](row, i)} key={row * 3 + i}>{symbols[row][i] !== null ? (symbols[row][i] == 'X' ? Symbol1 : Symbol2) : null}</div>);
            if(i != row + 2)
                elements.push(<div className={` border-coll ${sBorders} `} key={'border-' + row * 3 + i}></div>)
            i++
        }

        return (
            <div className={` board-row `}>
                {elements}
            </div>
        )
    }

    return (
        <div className={` board ${sBoard} `}>
            {renderRow(0)}
            <div className={` border-row ${sBorders} `}></div>
            {renderRow(1)}
            <div className={` border-row ${sBorders} `}></div>
            {renderRow(2)}
            {/* <div className={` board-row `}>
                <div className='board-cell' onClick={() => handlesClick[mode](0, 0)}>{symbols[0][0] !== null ? (symbols[0][0] == 'X' ? Symbol1 : Symbol2) : null}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handlesClick[mode](0, 1)}>{symbols[0][1] !== null ? (symbols[0][1] == 'X' ? Symbol1 : Symbol2) : null}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handlesClick[mode](0, 2)}>{symbols[0][2] !== null ? (symbols[0][2] == 'X' ? Symbol1 : Symbol2) : null}</div>
            </div>
            <div className={` border-row ${sBorders} `}></div>
            <div className={` board-row `}>
                <div className='board-cell' onClick={() => handlesClick[mode](1, 0)}>{symbols[1][0] !== null ? (symbols[1][0] == 'X' ? Symbol1 : Symbol2) : null}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handlesClick[mode](1, 1)}>{symbols[1][1] !== null ? (symbols[1][1] == 'X' ? Symbol1 : Symbol2) : null}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handlesClick[mode](1, 2)}>{symbols[1][2] !== null ? (symbols[1][2] == 'X' ? Symbol1 : Symbol2) : null}</div>
            </div>
            <div className={` border-row ${sBorders} `}></div>
            <div className={` board-row `}>
                <div className='board-cell' onClick={() => handlesClick[mode](2, 0)}>{symbols[2][0] !== null ? (symbols[2][0] == 'X' ? Symbol1 : Symbol2) : null}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handlesClick[mode](2, 1)}>{symbols[2][1] !== null ? (symbols[2][1] == 'X' ? Symbol1 : Symbol2) : null}</div>
                <div className={` border-coll ${sBorders} `}></div>
                <div className='board-cell' onClick={() => handlesClick[mode](2, 2)}>{symbols[2][2] !== null ? (symbols[2][2] == 'X' ? Symbol1 : Symbol2) : null}</div>
            </div> */}
        </div>
    )
}