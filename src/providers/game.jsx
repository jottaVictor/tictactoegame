'use client'
import React, { createContext, useContext, useState, useRef } from 'react'

import { generateId } from '@utils/utils'
import { useControllerModal } from './controller-modal'

const GameContext = createContext({
    board: [[null, null, null], [null, null, null], [null, null, null]],
    setBoard: () => {},
    mode: 'playerxplayer',
    setMode: () => {},
    configGame: {},
    setConfigGame: () => {},
    dataGame: {},
    setDataGame: () => {},
    gameRef: null,
    wsRef: null,
    handleClick: () => {},
})

export const GameProvider = ({ children }) => {
    const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]])
    const [mode, setMode] = useState('playerxplayer')
    // const [configLocalGame, setConfigLocalGame] = useState({
    //     idPlayerFirst: 0,
    //     aliasPlayers: [
    //         'Jogador 1',
    //         'Jogador 2'
    //     ],
    //     timeLimitByPlayer: null,
    //     gameInProgress: false
    // })
    // const [configOnlineGame, setConfigOnlineGame] = useState({
    //     detaToCreate: null,
    //     dataToEdit: null,
    //     dataToConnect: null,
    //     gameInProgress: false
    // })
    const [configGame, setConfigGame] = useState({
        game: {
            firstPlayer: "self", //is used by online mode
            timeLimitByPlayer: null,
            idPlayerFirst: '0' // is used by local game
        },
        room: {
            nameRoom: 'sala online',
            ownerPlayer: "self",
            isPublic: true,
            password: '',
            createRoom: false
        },
        playerData: {
            aliasPlayer: '',
            idPlayer: ''
        }
    })
    const [dataGame, setDataGame] = useState({
        aliasPlayers: [
            'Jogador 1',
            'Jogador 2'
        ],
        idRoom: null,
        gameInProgress: false
    })
    
    const gameRef = useRef(null)
    const wsRef = useRef(null)
    
    const { openConfirmModal, openYesNoModal } = useControllerModal()

    const handleClick = {
        playerxplayer: (r, c) => {
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

            if(valid.code === 7 || valid.code === 1){
                setDataGame((prev) => ({
                    ...prev,
                    gameInProgress: false
                }))
                openYesNoModal(valid.code === 7 ? "Jogo finalizado! 🎉" : "Fim de jogo.", valid.message + " Bora para mais uma?", () => {
                    gameRef.current.startGame()
                    console.log('->', gameRef.current)
                    setBoard([
                        [...gameRef.current.board[0]],
                        [...gameRef.current.board[1]],
                        [...gameRef.current.board[2]]
                    ])
                    setDataGame((prev) => ({
                        ...prev,
                        gameInProgress: true
                    }))
                }, () => {}, true, false)
                return
            }

            if(!valid.success || valid.code === 6){
                if(valid.code === 6){
                    setDataGame({
                        ...dataGame,
                        gameInProgress: false
                    })
                    openYesNoModal("Falha ao jogar", valid.message + " Deseja reiniciar a partida?", () => {
                        gameRef.current.startGame()
                        console.log('->', gameRef.current)
                        setBoard([
                            [...gameRef.current.board[0]],
                            [...gameRef.current.board[1]],
                            [...gameRef.current.board[2]]
                        ])
                        setDataGame((prev) => ({
                            ...prev,
                            gameInProgress: true
                        }))
                    }, () => {}, true, false)
                    return
                }
                
                if(valid.code === 1){
                    setDataGame({
                        ...dataGame,
                        gameInProgress: false
                    })
                    openYesNoModal("Falha ao jogar", valid.message + " Deseja reiniciar a partida?", () => {
                        gameRef.current.startGame()
                        console.log('->', gameRef.current)
                        setBoard([
                            [...gameRef.current.board[0]],
                            [...gameRef.current.board[1]],
                            [...gameRef.current.board[2]]
                        ])
                        setDataGame((prev) => ({
                            ...prev,
                            gameInProgress: true
                        }))
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
            configGame, setConfigGame,
            dataGame, setDataGame,
            gameRef,
            wsRef,
            handleClick}}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext(GameContext)