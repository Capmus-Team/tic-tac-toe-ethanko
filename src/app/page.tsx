import Game from '@/components/TicTacToe/Game';

export default function Home() {
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-pink-100 via-fuchsia-50 to-purple-100 dark:from-fuchsia-950 dark:via-purple-900 dark:to-fuchsia-900">
      <Game />
    </div>
  );
}
