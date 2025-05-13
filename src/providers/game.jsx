'use client'
import React, { createContext, useContext, useState, useRef } from 'react'

import { generateId, log } from '@utils/utils'
import { useControllerModal } from './controller-modal'

const GameContext = createContext({
    board: [[null, null, null], [null, null, null], [null, null, null]],
    setBoard: () => {},
    handleClick: () => {},
    mode: 'playerxplayer',
    setMode: () => {},
    configLocalGame: {},
    setConfigLocalGame: () => {},
    configOnlineGame: {},
    setConfigOnlineGame: () => {},
    setConfig: () => {},
    gameRef: null,
    wsRef: null,
})

export const GameProvider = ({ children }) => {
    const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]])
    const [mode, setMode] = useState('playerxplayer')
    const [configLocalGame, setConfigLocalGame] = useState({
        idPlayerFirst: 0,
        aliasPlayers: [
            'Jogador 1',
            'Jogador 2'
        ],
        timeLimitByPlayer: null
    })
    const [configOnlineGame, setConfigOnlineGame] = useState({
        idPlayer: generateId(),
        aliasPlayer: 'Jogador',
        detaToCreate: null,
        dataToEdit: null,
        dataToConnect: null
    })
    const gameRef = useRef(null)
    const wsRef = useRef(null)
    const { openConfirmModal, openYesNoModal } = useControllerModal()

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

            console.log("code => ", valid.code)

            if(valid.code === 7 || valid.code === 1){
                openYesNoModal(valid.code === 7 ? "Jogo finalizado! 🎉" : "Fim de jogo.", valid.message + " Bora para mais uma?", () => {
                    console.log(gameRef.current.startGame())
                    setBoard([
                        [...gameRef.current.board[0]],
                        [...gameRef.current.board[1]],
                        [...gameRef.current.board[2]]
                    ])
                    console.log(gameRef)
                }, () => {}, true, false)
                return
            }

            if(!valid.success || valid.code === 6){
                if(valid.code === 1){
                    openYesNoModal("Falha ao jogar", valid.message + " Deseja reiniciar a partida?", () => {
                        console.log(gameRef.current.startGame())
                        setBoard([
                            [...gameRef.current.board[0]],
                            [...gameRef.current.board[1]],
                            [...gameRef.current.board[2]]
                        ])
                        console.log(gameRef)
                    }, () => {}, false, false)
                    return
                }
                openConfirmModal("Falha ao jogar", valid.message, () => {}, false, false)
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
            mode, setMode,
            configLocalGame, setConfigLocalGame,
            configOnlineGame, setConfigOnlineGame,
            gameRef,
            wsRef,
            handleClick }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext(GameContext)