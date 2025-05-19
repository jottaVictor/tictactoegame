'use client'
import React, { useState, useEffect, useRef } from 'react'

import './core.css'

import Mobile from './mobile'
import Desktop from './desktop'
import ConfigMatch from './config-match'
import Game from '@components/tictactoe/gameLogic/game'
import '@/css/index.css'

import { useGame } from '@providers/game'
import { useControllerModal } from '@providers/controller-modal'
import { log } from '@utils/utils'
import { useTheme } from '@/providers/theme'

export default function Page(){
    const {theme} = useTheme()
    const { openYesNoModal, openConfirmModal } = useControllerModal()
    const {board, setBoard, mode, setMode, configGame, setConfigGame, dataGame, setDataGame, playing, wsRef, gameRef, handleClick} = useGame()
    
    const [isMobile, setIsMobile] = useState(false)
    
    const handleWithFirstRefreash = () => {
        const queryParams = new URLSearchParams(window.location.search)
        
        let __mode, dataToConnect
        if(
            (__mode = queryParams.get('m')) === 'playerxsocket'
            && (dataToConnect = JSON.parse(sessionStorage.getItem('configGameOnline'))) !== null
        ){
            configGameOnline = JSON.parse(sessionStorage.getItem('configGameOnline'))
            setMode('playerxsocket')
            setConfigGame((prev) => {
                return ({
                    ...prev,
                    configGameOnline
                })
            })
        }
    }
    
    useEffect(() => {
        handleWithFirstRefreash()

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 750)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])


    const handleWithConnection = {
        playerxplayer: () => {
            gameRef.current = new Game(parseInt(configGame.game.timeLimitByPlayer), configGame.game.idPlayerFirst.toString())

            gameRef.current.joinInGame('0', dataGame.aliasPlayers[0])
            gameRef.current.joinInGame('1', dataGame.aliasPlayers[1])
        },

        playerxsocket: () => {
            if(!configGame.playerData?.aliasPlayer || configGame.playerData.aliasPlayer.length <= 0){
                openConfirmModal("Esperando dados", "Preencha um nome para entrar na sala", ()=>{}, false, false)
                return
            }

            const __message = {}
            __message.type = 'connectPlayerInGame'

            if(configGame.room.createRoom){
                __message.data = {
                    aliasPlayer: configGame.playerData.aliasPlayer,
                    idPlayer: configGame.playerData.idPlayer,
                    createRoom: configGame.room.createRoom,
                    roomPassword: configGame.roomPassword
                }
            }else{
                __message.data = {
                    aliasPlayer: configGame.playerData.aliasPlayer,
                    idPlayer: configGame.playerData.idPlayer,
                    idRoom: dataGame.idRoom,
                    createRoom: false,
                    roomPassword: configGame.roomPassword
                }
            }
            
            let connect = false
            
            wsRef.current = new WebSocket("ws://172.18.1.16:5000/game")
            
            const ws = wsRef.current
            
            ws.onopen = () => {
                connect = true
                ws.send(
                    JSON.stringify(__message)
                )
            }
            
            ws.onmessage = ({data}) => {
                let _message = JSON.parse(data.toString())
                              
                console.log("Received:", _message.data)
                console.log("mais dados , ", _message.type, _message.success, configGame.idPlayer)

                //if is the current player that have connected
                if(_message.type === 'connectPlayerInGame' && _message.success && configGame.playerData.idPlayer === _message.data.playerData.idPlayer){
                    if(configGame.room.createRoom){
                        // ws.send(JSON.stringify(
                        //     {type: 'editRoomConfig', 
                        //     ///dar uma olhada nissaq dps
                        //     data: configGame.dataToEdit}
                        // ))
                    }
                    setDataGame((prev) => ({
                        ...prev,
                        aliasPlayer: [
                            _message.data.game.players[0].alias,
                            _message.data.game.players[1].alias
                        ],
                        idRoom: _message.data.playerData.idRoom,
                    }))
                    gameRef.current = _message.data.game
                    return
                }

                //if is another player connecting
                if((_message.type === 'connectPlayerInGame' || _message.type === 'disconnectPlayerInGame') && _message.success){
                    setDataGame((prev) => {
                        return ({
                            ...prev,
                            aliasPlayers: [
                                _message.data.game.players[0].alias,
                                _message.data.game.players[1].alias
                            ]
                        })
                    })
                    gameRef.current = _message.data.game
                    return
                }


                if((_message.type === 'markafield' || _message.type === 'startGame') && _message.success){
                    setBoard(_message.data)
                    gameRef.current = _message.data.game

                    if(_message.type == 'startGame'){
                        setDataGame((prev) => {
                            return ({
                                ...prev,
                                gameInProgress: true
                            })
                        })
                    }
                    return
                }

                if(_message.type === 'markafield' && _message.code == 27){
                    setDataGame((prev) => {
                        return ({
                            ...prev,
                            gameInProgress: false
                        })
                    })
                }
            }
            
            ws.onclose = () => {
                connect = false
            }
            
            setTimeout(() => {
                if(!connect){
                    console.log("Não foi possível abrir uma conexão.")
                    openYesNoModal("Erro de conexão", "Não foi possível achar um servidor disponível, deseja tentar novamente?", () => {window.location.reload()}, {}, false, false)
                }
            }, 2500)
        }
    }
    
    useEffect(() => {
        log(`The gamemode was seted to ${mode}`)
        handleWithConnection[mode]()
    }, [mode, configGame])

    const handleStartButton = () => {
        const ws = wsRef.current

        if(wsRef.current)
            ws.send(JSON.stringify({
                type: 'startGame'
            }))
        else{
            gameRef.current.startGame()
            setBoard([
                [...gameRef.current.board[0]],
                [...gameRef.current.board[1]],
                [...gameRef.current.board[2]]
            ])
            setDataGame((prev) => ({
                ...prev,
                gameInProgress: true
            }))
        }
    }

    // if(hasError)
    //     return (
    //         <div className={`error ${theme}`}>
    //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
    //             <h1>Dados corrompidos, tente novamente.</h1>
    //         </div>
    //     )

    return (
        <>
            {isMobile ? <Mobile/> : <Desktop/>}
            <footer className={theme}>
                <ConfigMatch></ConfigMatch>
                {!playing &&
                <button className={`btn-play`} title="Começar partida" aria-label='Começar partida, botão' onClick={handleStartButton} onKeyDown={handleStartButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M320-200v-560l440 280-440 280Z"/></svg>
                </button>}
            </footer>
        </>
    )
}

// const __config = {...config, game: {firstPlayer: "self"}, room: {ownerPlayer: "self"}}
//         __config.game.timeLimitByPlayer = form.hasTimeLimit.checked && form.timeLimit.value ? form.timeLimit.value : null
//         __config.room.name = form.roomName.value
//         __config.room.isPublic = form.isPublic.checked
//         __config.room.password = form.password?.value ?? ''
//         __config.mode = "playerxsocket"
//         setConfig(__config)
        
//         if(playerDataRef.current)
//             playerDataRef.current.aliasPlayer = form.aliasPlayer.value
//         else
//             playerDataRef.current = {aliasPlayer: form.aliasPlayer.value}

//         wsRef.current = new WebSocket("ws://172.18.1.16:5000/game")

//         const playerData = playerDataRef.current
//         const ws = wsRef.current

//         const __message = {}
//         __message.type = 'connectPlayerInGame'
//         __message.data = { aliasPlayer: playerData.aliasPlayer, createRoom: true }

//         let connect = false

//         ws.onopen = () => {
//             connect = true
//             ws.send(
//                 JSON.stringify(__message)
//             )
//         }

//         ws.onmessage = ({data}) => {
//             let _message = JSON.parse(data.toString())
//             console.log(_message)

//             if(data.type === 'connectPlayerInGame'){
//                 playerDataRef.current = _message.data.playerData
//                 gameRef.current = _message.data.game
//                 handleCreateRoom()
//                 return
//             }

//             if(data.type === 'markafield'){
//                 gameRef.current = _message.data.game
//                 return
//             }
            
//             console.log(`Received: ${data}`)
//         }

//         ws.onclose = () => {
//             connect = false
//         }