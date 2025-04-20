"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import Board from './Board';

export default function Game() {
  const [winner, setWinner] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleGameEnd = (result: string | null) => {
    setWinner(result);
    setIsDialogOpen(true);
  };

  const resetGame = () => {
    setIsDialogOpen(false);
    // Force board component remount by changing its key
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
      <Board key={Date.now()} onGameEnd={handleGameEnd} />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {winner === 'Draw' ? 'It\'s a Draw!' : winner ? `Player ${winner} Wins!` : ''}
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={resetGame}>Play Again</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 