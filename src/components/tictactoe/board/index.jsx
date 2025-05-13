'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Symbol0, Symbol1 } from '@components/tictactoe/symbols'
import Game from '@components/tictactoe/gameLogic/game'
import '@components/tictactoe/board/board.css'
import { useGame } from '@/providers/game'

export default function Board(){
    const {board, mode, configOnlineGame, handleClick} = useGame()

    const mainSymbol = <Symbol0/>
    const secondarySymbol = <Symbol1/>

    const renderRow = (row) => {
        const elements = []
        
        for(let i = 0; i < 3; i++){
            elements.push(<div className='board-cell' onClick={() => {if(configOnlineGame.dataToConnect === null) handleClick[mode](row, i)}} key={row * 3 + i}>{board[row][i] !== null ? (board[row][i] === 0 ? mainSymbol : secondarySymbol) : null}</div>)
            if(i != 2)
                elements.push(<div className="border-coll" key={'border-' + row * 3 + i}></div>)
        }

        return (
            <div className={` board-row `}>
                {elements}
            </div>
        )
    }

    return (
        <div className="board">
            {renderRow(0)}
            <div className="border-row"></div>
            {renderRow(1)}
            <div className="border-row"></div>
            {renderRow(2)}
        </div>
    )
}