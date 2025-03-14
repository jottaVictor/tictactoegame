'use client';
import React, { useState, useEffect } from 'react';
import MessageResating from './messageResating';'./messageResating';
import './game.css';

function Game() {
    const [gameState, setGameState] = useState({
        board: Array(9).fill(null),
        next: 'X',
        winner: null,
    })

    const handleClick = (index) => {
        const boardCopy = [...gameState.board];
        if (gameState.winner || boardCopy[index]) return;

        boardCopy[index] = gameState.next == 'X' ? 'X' : 'O';

        setGameState({
            ...gameState,
            board: boardCopy,
            next: gameState.next == 'X' ? 'O' : 'X',
            winner: getWinner(boardCopy)
        });
    };

    const getWinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setTimeout(() => {
                    resetGame();
                }, 10000);
                return board[a];
            }
        }

        return null;
    };

    const resetGame = () => {
        setGameState({
            ...gameState,
            board: Array(9).fill(null),
            next: 'X',
            winner: null,
        });
    };


    const renderSquare = (index) => {
        return (
            <button className="square" onClick={() => handleClick(index)}>
                {gameState.board[index]}
            </button>
        );
    };

    return (
        <div>
            <h1>Game Here</h1>
            <div className="status">
                {gameState.winner ? `Winner: ${gameState.winner}` : `Next player: ${gameState.next}`}
                {gameState.winner ? <MessageResating/> : ''}
            </div>
            <div className="board">
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
        </div>
    );
}

export default Game;