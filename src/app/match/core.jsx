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
    const {board, config, setConfig, handleClick, gameRef} = useGame()
    
    const [isMobile, setIsMobile] = useState(false)
    const [hasError, setHasError] = useState(false)

    const validateData = () => {
        const queryParams = new URLSearchParams(window.location.search)

        const __config = {...config}

        let __mode
        let __timeLimitByPlayer
        let __firstToPlay

        if(__mode = queryParams.get('pxp')){
            __config.game = {...__config.game ?? {}}
            __config.game.mode = "playerxplayer"
        }

        if( __timeLimitByPlayer = queryParams.get('tlbp')){
            __timeLimitByPlayer = parseInt( __timeLimitByPlayer, 10)

            if (isNaN(__timeLimitByPlayer) && !Number.isInteger(__timeLimitByPlayer)){
                setHasError(true)
                return
            }

            __config.game = {...__config.game ?? {}}
            __config.game.timeLimitByPlayer = __timeLimitByPlayer
        }

        if(__firstToPlay = queryParams.get('ftp')){
            if(__firstToPlay !== "self" || __firstToPlay !== "opponent"){
                setHasError(true)
                return
            }

            __config.game = {...__config.game ?? {}}
            __config.game.firstToPlay = __firstToPlay === "self" ? 0 : 1
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
            gameRef.current = new Game(config.timeLimitByPlayer, config.firstToPlay)

            gameRef.current.joinInGame(0, 'Jodador 1')
            gameRef.current.joinInGame(1, 'Jogador 2')

            // gameRef.current.startGame()
        },

        playerxsocket: () => {
        }
    }
    
    useEffect(() => {
        log(`The gamemode was seted to ${config.mode}`)
        handleWithConnection[config.mode]()
    }, [config])

    if(hasError)
        return (
            <div className={`error ${theme}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                <h1>Dados corrompidos, tente novamente.</h1>
            </div>
        )

    return (
        <>
            {isMobile ? <Mobile board={board} handleClick={handleClick.playerxplayer}/> : <Desktop board={board} handleClick={handleClick.playerxplayer}/>}
            <ConfigMatch></ConfigMatch>
        </>
    )
}