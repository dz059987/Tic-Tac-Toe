import { useState, useEffect } from 'react';
import './App.css';

function Square({ value, onSquareClick, isWinning }) {
    return (
        <button
            className={isWinning ? "square winning-square" : "square"}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [winCounted, setWinCounted] = useState(false);

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    function handleReset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setWinCounted(false);
    }

    const winnerInfo = calculateWinner(squares);
    const winner = winnerInfo ? winnerInfo.winner : null;
    const winningLine = winnerInfo ? winnerInfo.line : [];

    useEffect(() => {
        if (winner && !winCounted) {
            if (winner === 'X') {
                setXWins(prev => prev + 1);
            } else {
                setOWins(prev => prev + 1);
            }
            setWinCounted(true);
        }
    }, [winner, winCounted]);

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (squares.every(square => square !== null)) {
        status = "It's a draw!";
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    function renderSquare(i) {
        return (
            <Square
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                isWinning={winningLine.includes(i)}
            />
        );
    }

    return (
        <>
            <div className="scoreboard">X wins: {xWins} | O wins: {oWins}</div>
            <div className="status">{status}</div>
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
            <button className="reset-button" onClick={handleReset}>Reset Game</button>
        </>
    );
}

function calculateWinner(squares) {
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return null;
}