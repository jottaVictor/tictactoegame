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
import { isToHandleButton, log } from '@utils/utils'
import { useTheme } from '@/providers/theme'

export default function Page(){
    const {theme} = useTheme()
    const { openConfirmModal } = useControllerModal()
    const {board, config, setConfig, controllerSocket, setControllerSocket, playerDataRef, wsRef, gameRef, handleClick} = useGame()
    
    const [isMobile, setIsMobile] = useState(false)
    const [hasError, setHasError] = useState(false)
    
    const validateData = () => {
        const queryParams = new URLSearchParams(window.location.search)
        
        const __config = {...config}
        __config.game = {...__config.game} ?? {}
        __config.game.mode = "playerxplayer"
        __config.game.timeLimitByPlayer = null
        __config.game.idPlayerFirst = '0'
        __config.game.aliasPlayer0 = 'Jogador 1'
        __config.game.aliasPlayer1 = 'Jogador 2'
        
        let __mode
        let __timeLimitByPlayer
        let __idPlayerFirst
        
        if((__mode = queryParams.get('m')) && __mode === 'playerxsocket'){
            console.log('=>', JSON.parse(sessionStorage.getItem('formConfig')))
            playerDataRef.current = JSON.parse(sessionStorage.getItem('formPlayerData'))
            setConfig(JSON.parse(sessionStorage.getItem('formConfig')))
            return
        }

        if(__timeLimitByPlayer = queryParams.get('tlbp')){
            __timeLimitByPlayer = parseInt( __timeLimitByPlayer, 10)

            if (isNaN(__timeLimitByPlayer) && !Number.isInteger(__timeLimitByPlayer)){
                setHasError(true)
                return
            }

            __config.game.timeLimitByPlayer = __timeLimitByPlayer
        }

        if(__idPlayerFirst = queryParams.get('ftp')){
            if(__idPlayerFirst !== '0' && __idPlayerFirst !== '1'){
                setHasError(true)
                return
            }

            __config.game.idPlayerFirst = __idPlayerFirst.toString()
        }

        setConfig(__config)
    }
    
    useEffect(() => {
        validateData()

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 750)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleWithConnection = {
        playerxplayer: () => {
            gameRef.current = new Game(config.game.timeLimitByPlayer, config.game.idPlayerFirst.toString())

            gameRef.current.joinInGame('0', config.game.aliasPlayer0)
            gameRef.current.joinInGame('1', config.game.aliasPlayer1)

            gameRef.current.startGame()
        },

        playerxsocket: () => {
            const playerData = playerDataRef.current

            const __message = {}
            __message.type = 'connectPlayerInGame'
            __message.data = { aliasPlayer: playerData.aliasPlayer, createRoom: !config.room.id }

            if(config.room.idRoom)
                __message.data.idRoom = config.room.idRoom

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
                console.log(_message)

                if(data.type === 'connectPlayerInGame'){
                    playerDataRef.current = _message.data.playerData
                    gameRef.current = _message.data.game
                    return
                }

                if(data.type === 'markafield'){
                    gameRef.current = _message.data.game
                    return
                }
                
                console.log(`Received: ${data}`)
            }

            ws.onclose = () => {
                connect = false
            }

            setTimeout(() => {
                if(!connect){
                    console.log("Não foi possível abrir uma conexão.")
                    openConfirmModal("Erro de conexão", "Não foi possível achar um servidor disponível, deseja tentar novamente?", () => {window.location.reload()}, false, false)
                }
            }, 2500)
        }
    }
    
    useEffect(() => {
        log(`The gamemode was seted to ${config.game.mode}`)
        handleWithConnection[config.game.mode]()
    }, [config])

    const handleStartButton = (e) => {
        if(isToHandleButton(e)){
            const ws = wsRef.current

            ws.send(JSON.stringify({
                type: 'startGame'
            }))
        }
    }

    if(hasError)
        return (
            <div className={`error ${theme}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                <h1>Dados corrompidos, tente novamente.</h1>
            </div>
        )

    return (
        <>
            {isMobile ? <Mobile board={board} handleClick={handleClick[config.game.mode]}/> : <Desktop board={board} handleClick={handleClick[config.game.mode]}/>}
            <footer className={theme}>
                <ConfigMatch></ConfigMatch>
                {config?.game?.mode === 'playerxsocket' && 
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