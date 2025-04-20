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
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-500 dark:to-pink-400">Tic Tac Toe</h1>
      
      <div className="w-full max-w-md p-4 rounded-xl shadow-xl bg-white/70 dark:bg-black/30 backdrop-blur-sm border border-primary/20">
        <Board key={Date.now()} onGameEnd={handleGameEnd} />
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-primary/30 bg-gradient-to-b from-white to-pink-50 dark:from-gray-950 dark:to-fuchsia-950">
          <DialogHeader>
            <DialogTitle className="text-xl text-center text-primary">
              {winner === 'Draw' ? 'It\'s a Draw!' : winner ? `Player ${winner} Wins!` : ''}
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={resetGame} className="bg-primary hover:bg-primary/90">Play Again</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 