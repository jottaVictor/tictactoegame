'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Symbol0, Symbol1 } from '@components/tictactoe/symbols'
import Game from '@components/tictactoe/gameLogic/game'
import '@components/tictactoe/board/board.css'
import { useControllerModal } from '@providers/controller-modal'

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

    const gameRef = useRef(new Game(timeLimitByPlayer, firstToPlay));
    const game = gameRef.current;
    // const game = new Game(timeLimitByPlayer, firstToPlay)

    const mainSymbol = <Symbol0 style={styleSymbol0}/>
    const secondarySymbol = <Symbol1 style={styleSymbol1}/>

    const { openBaseModal, openConfirmModal, openYesNoModal, } = useControllerModal()
    
    useEffect(() => {
        console.log(`The gamemode was seted to ${mode}`)

        if(mode === 'playerxplayer'){
            game.joinInGame('Jogador 1')
            game.joinInGame('Jogador 2')

            game.startGame()
        }
    }, [mode])

    const handlesClick = {
        playerxplayer: (r, c) => {
            console.log(game);
            if (!game.players[0] || !game.players[1]) {
                console.warn("Players are not set yet!");
                return;
            }

            const idCurrent = game.players[0].isMyTime ? game.players[0].id : game.players[1].id
            
            try{
                game.markAField(idCurrent, r, c)
            }catch(e){
                //fazer o caso do jogador ganhar por tempo limite excedido
                if(game.winnerID){
                    const indexPlayer = game.getIndexPlayerById(game.winnerID)
                    openYesNoModal('Jogo Encerrado', `O jogador '${game.players[indexPlayer].alias ?? indexPlayer}' ganhou o jogo! Quer jogar novamente?`, () => {}, () => {}, true, false)
                    return
                }

                openYesNoModal('Jogo Encerrado', `O jogo deu velha! Nenhum jogador venceu. Quer jogar novamente?`, () => {}, () => {}, true, false)
                return
            }finally{
                
                setBoard([
                    [...game.board[0]],
                    [...game.board[1]],
                    [...game.board[2]]
                ])
            }
        },
        playerxsocket: () => {
            console.log('playerxsocket handler not implemented yet')
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