'use client'
import React, { createContext, useContext, useState, useRef } from 'react'

import { log } from '@utils/utils'
import { setConfig } from 'next/config'

const GameContext = createContext({
    board: [[null, null, null], [null, null, null], [null, null, null]],
    setBoard: () => {},
    mode: "playerxplayer",
    setMode: () => {},
    gameRef: null,
    timeLimitByPlayer: null,
    setTimeLimitByPlayer: () => {},
    firstToPlay: null,
    setFirstToPlay: () => {},
    handleClick: () => {},
    configOnline: {},
    setConfigOnline: () => {}
})

export const GameProvider = ({ children }) => {
    const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]])
    const [mode, setMode] = useState("playerxplayer")
    const gameRef = useRef(null)
    const [timeLimitByPlayer, setTimeLimitByPlayer] = useState(null)
    const [firstToPlay, setFirstToPlay] = useState(0)
    const [configOnline, setConfigOnline] = useState({})

    const handleClick = {
        playerxplayer: (r, c) => {
            console.log(gameRef.current)
            if (!gameRef.current.players[0] || !gameRef.current.players[1]) {
                console.warn("Players are not set yet!")
                return
            }

            const idCurrent = gameRef.current.players[0].isMyTime ? gameRef.current.players[0].id : gameRef.current.players[1].id
            
            let valid
            
            if((valid = gameRef.current.markAField(idCurrent, r, c)).success){
                setBoard([
                    [...gameRef.current.board[0]],
                    [...gameRef.current.board[1]],
                    [...gameRef.current.board[2]]
                ])
            }

            if(!valid.success || valid.code === 6){
                log(valid)
            }
        },

        playerxsocket: (r, c) => {
            ws.send(
                JSON.stringify({
                    type: "markafield",
                    data: {
                        row: r,
                        column: c,
                    }
                })
            )
        }
    }

    return (
        <GameContext.Provider value={{ 
            board, setBoard, 
            mode, setMode, 
            timeLimitByPlayer, setTimeLimitByPlayer,
            firstToPlay, setFirstToPlay,
            configOnline, setConfigOnline,
            gameRef, handleClick }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext(GameContext)