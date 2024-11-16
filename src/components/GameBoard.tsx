import React from 'react'
import { Ship } from 'lucide-react'  // Changed from Anchor to Ship

type Cell = 'EMPTY' | 'HIT' | 'MISS' | 'player-ship'
type Board = Cell[][]

interface GameBoardProps {
  board: Board
  aiBoard: Board
  handleCellClick: (x: number, y: number) => void
  gamePhase: string
  isPlayerTurn: boolean
  gameOver: boolean
  isAnimating: boolean
}

export default function GameBoard({
  board,
  aiBoard,
  handleCellClick,
  gamePhase,
  isPlayerTurn,
  gameOver,
  isAnimating
}: GameBoardProps) {
  const getCellContent = (playerCell: Cell, aiCell: Cell): JSX.Element | null => {
    if (gamePhase === 'placement' && playerCell === 'player-ship') {
      return <Ship className="w-8 h-8 text-gray-600" />  // Changed from Anchor to Ship
    }
    return null
  }

  const getCellColor = (playerCell: Cell, aiCell: Cell): string => {
    if (gamePhase === 'placement') {
      return 'bg-[#EFE9E0]'
    } else {
      if (playerCell === 'HIT' && aiCell === 'HIT') return 'bg-gradient-to-r from-red-500 to-blue-500'
      if (playerCell === 'HIT') return 'bg-blue-500'
      if (aiCell === 'HIT') return 'bg-red-500'
      if (playerCell === 'MISS' && aiCell === 'MISS') return 'bg-black'
      if (playerCell === 'MISS') return 'bg-blue-300/30'
      // if (aiCell === 'MISS') return 'bg-gray-100'
      if (aiCell === 'MISS') return 'bg-red-300/30'
      // if (playerCell === 'ai-footprint') return 'bg-red-300/30'
      return 'bg-[#EFE9E0]'
    }
  }

  return (
    <div className="grid grid-cols-6 gap-2" style={{ width: '300px', height: '300px' }}>
      {board.map((row, x) =>
        row.map((cell, y) => {
          const playerCell = board[x][y]
          const aiCell = aiBoard[x][y]
          return (
            <button
              key={`${x}-${y}`}
              className={`w-full h-full aspect-square ${getCellColor(playerCell, aiCell)} rounded-sm flex items-center justify-center`}
              onClick={() => handleCellClick(y, x)}
              disabled={gameOver || (!isPlayerTurn && gamePhase === 'battle') || gamePhase === 'countdown' || isAnimating}
            >
              {getCellContent(playerCell, aiCell)}
            </button>
          )
        })
      )}
    </div>
  )
}
