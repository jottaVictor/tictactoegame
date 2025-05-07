'use client'
import React, { createContext, useContext, useState, useRef } from 'react'

import { log } from '@utils/utils'

const GameContext = createContext({
    board: [[null, null, null], [null, null, null], [null, null, null]],
    setBoard: () => {},
    handleClick: () => {},
    config: {
        game: {
            timeLimitByPlayer: null,
            firstPlayer: "self",
        },
        room: {
            ownerPlayer: "self",
            isPublic: true,
            password: ""
        },
        mode: "playerxplayer"
    },
    setConfig: () => {},
    gameRef: null,
    playerDataRef: null,
    wsRef: null,
})

export const GameProvider = ({ children }) => {
    const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]])
    const [config, setConfig] = useState({
        game: {
            timeLimitByPlayer: null,
            firstPlayer: "self",
        },
        room: {
            ownerPlayer: "self",
            isPublic: true,
            password: ""
        },
        mode: "playerxplayer"
    })
    const gameRef = useRef(null)
    const playerDataRef = useRef(null)
    const wsRef = useRef(null)

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
            wsRef.current.send(
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
            config, setConfig,
            gameRef,
            playerDataRef,
            wsRef,
            handleClick }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext(GameContext)