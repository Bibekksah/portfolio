
import React, { useState, useEffect, useRef } from 'react'
import MatrixRain from './components/MatrixRain'
import Terminal from './components/Terminal'

const App: React.FC = () => {
  return (
    <div className="relative h-screen w-screen">
      <MatrixRain />
      <div className="absolute inset-0 flex items-center justify-center">
        <Terminal />
      </div>
    </div>
  )
}

export default App
  