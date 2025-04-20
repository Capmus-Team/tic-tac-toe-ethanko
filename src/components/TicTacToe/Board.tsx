"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type SquareValue = 'X' | 'O' | null;

interface BoardProps {
  onGameEnd: (winner: string | null) => void;
}

export default function Board({ onGameEnd }: BoardProps) {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    
    const winner = calculateWinner(newSquares);
    if (winner) {
      onGameEnd(winner);
    } else if (!newSquares.includes(null)) {
      onGameEnd('Draw');
    }
  };

  const renderSquare = (i: number) => {
    return (
      <Button
        key={i}
        variant={squares[i] ? "default" : "outline"}
        className={`h-20 w-20 text-3xl font-bold transition-all duration-200 
          ${squares[i] === 'X' ? 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white' : 
            squares[i] === 'O' ? 'bg-pink-500 hover:bg-pink-600 text-white' : 
            'hover:bg-primary/10 border-primary/30'}`}
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </Button>
    );
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : squares.every(square => square !== null)
    ? 'Draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <Card className="p-6 w-full bg-transparent shadow-none border-0">
      <div className="mb-4 text-xl font-bold text-center text-primary">{status}</div>
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {Array(9).fill(null).map((_, i) => renderSquare(i))}
      </div>
    </Card>
  );
}

function calculateWinner(squares: SquareValue[]): SquareValue {
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
      return squares[a];
    }
  }
  
  return null;
} 