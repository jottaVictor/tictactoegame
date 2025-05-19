'use client'
import React from 'react'
import './mobile.css'

import {useTheme} from '@providers/theme'

import Board from '@components/tictactoe/board'
import ConfigMatch from './config-match'

import {Symbol0, Symbol1} from '@components/tictactoe/symbols'
import { useGame } from '@/providers/game'

export default function Mobile(){
    const {theme} = useTheme()
    const { mode, dataGame } = useGame()

    console.log("rendelizando compoinente mobile", configOnlineGame)

    return (
        <>
            <main className={`${theme} mobile`}>
                <div className="player-info top">
                    <div className="icon">
                        <Symbol0/>
                    </div>
                    <span className='name'>{dataGame?.aliasPlayers[0] ?? 'Esperando conexão'}</span>
                    <div className="timer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"/></svg>
                        <span>00:00</span>
                    </div>
                    <div className='placar'>
                        <span>Ganhou</span>
                        <span>1</span>
                    </div>
                </div>
                <div className="content">
                    <div className="box-board">
                        <Board/>
                    </div>
                </div>
                <div className="player-info bottom">
                    <div className="icon">
                        <Symbol1/>
                    </div>
                    <span className='name'>{dataGame?.aliasPlayers[1] ?? 'Esperando conexão'}</span>
                    <div className="timer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"/></svg>
                        <span>00:00</span>
                    </div>
                    <div className='placar'>
                        <span>Ganhou</span>
                        <span>0</span>
                    </div>
                </div>
            </main>
        </>
    )
}