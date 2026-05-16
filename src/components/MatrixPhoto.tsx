import React from 'react'

const MatrixPhoto: React.FC = () => {
  const rows = 10
  const cols = 20
  const chars = ['0', '1', '▒', '▓', '░']

  return (
    <div className="grid gap-0.5 rounded-lg border border-green-400/20 bg-[#031206]/90 p-2">
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className="flex gap-0.5">
          {Array.from({ length: cols }).map((_, col) => (
            <span key={col} className="h-3 w-3 text-[8px] text-green-300">
              {chars[Math.floor(Math.random() * chars.length)]}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MatrixPhoto
