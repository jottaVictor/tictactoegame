'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Symbol0, Symbol1 } from '@components/tictactoe/symbols'
import Game from '@components/tictactoe/gameLogic/game'
import '@components/tictactoe/board/board.css'
import { useControllerModal } from '@providers/controller-modal'
import { log } from '@utils/utils'

export default function Board({ 
    sBoard="", 
    sBorders="", 
    firstToPlay = 0, 
    styleSymbol0 = '', 
    styleSymbol1 = '', 
    mode='playerxplayer', 
    timeLimitByPlayer = null
}){
    const [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);

    const gameRef = useRef(undefined)
    let ws

    const mainSymbol = <Symbol0 style={styleSymbol0}/>
    const secondarySymbol = <Symbol1 style={styleSymbol1}/>

    const { openBaseModal, openConfirmModal, openYesNoModal, } = useControllerModal()

    const handleWithConnection = {
        playerxplayer: () => {
            gameRef.current = new Game(timeLimitByPlayer, firstToPlay)

            gameRef.current.joinInGame('Jogador 1')
            gameRef.current.joinInGame('Jogador 2')

            gameRef.current.startGame()
        },

        playerxsocket: () => {
            console.log("Tentando aqui")
            ws = new WebSocket('ws://localhost:5000');

            ws.onopen = () => ws.send(
                JSON.stringify({
                    data: {
                        aliasPlayer: 'Player'
                    },
                    type: 'connect'
                })
            )

            ws.onmessage = ({ data }) => {
                if(data.type === 'validateConnect'){
                    //armazenar id atribuido
                    //armazenar estado do jogo
                }

                if(data.type === 'validateMarkAField'){
                    //armazenar estado do jogo
                }

                console.log(`Received: ${data}`)
            }
        }
    }
    
    useEffect(() => {
        log(`The gamemode was seted to ${mode}`)
        handleWithConnection[mode]()
    }, [mode])

    const handlesClick = {
        playerxplayer: (r, c) => {
            if (!gameRef.current.players[0] || !gameRef.current.players[1]) {
                console.warn("Players are not set yet!");
                return;
            }

            const idCurrent = gameRef.current.players[0].isMyTime ? gameRef.current.players[0].id : gameRef.current.players[1].id
            
            let valid
            
            if((valid = gameRef.current.markAField(idCurrent, r, c)).sucess){
                setBoard([
                    [...gameRef.current.board[0]],
                    [...gameRef.current.board[1]],
                    [...gameRef.current.board[2]]
                ])
            }

            if(!valid.sucess || valid.code === 6){
                log(valid)
            }
        },

        playerxsocket: (r, c) => {
            ws.send(
                JSON.stringify({
                    data: {
                        row: r,
                        column: c,
                        //id player
                    },
                    type: "markAField"
                })
            )
        }
    }

    const renderRow = (row) => {
        const elements = []
        
        for(let i = 0; i < 3; i++){
            elements.push(<div className='board-cell' onClick={() => handlesClick[mode](row, i)} key={row * 3 + i}>{board[row][i] !== null ? (board[row][i] === 0 ? mainSymbol : secondarySymbol) : null}</div>);
            if(i != 2)
                elements.push(<div className={` border-coll ${sBorders} `} key={'border-' + row * 3 + i}></div>)
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
        </div>
    )
}