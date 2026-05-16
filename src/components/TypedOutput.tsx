
import React, { useState, useEffect } from 'react'

interface TypedOutputProps {
  text: string
  animate?: boolean
}

const TypedOutput: React.FC<TypedOutputProps> = ({ text, animate = false }) => {
  const [displayedText, setDisplayedText] = useState(text)
  const [currentIndex, setCurrentIndex] = useState(text.length)

  useEffect(() => {
    if (!animate) {
      setDisplayedText(text)
      setCurrentIndex(text.length)
      return
    }

    setDisplayedText('')
    setCurrentIndex(0)
  }, [text, animate])

  useEffect(() => {
    if (!animate) return
    if (currentIndex >= text.length) return

    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + text[currentIndex])
      setCurrentIndex(prev => prev + 1)
    }, Math.random() * 30 + 15)

    return () => clearTimeout(timeout)
  }, [currentIndex, text, animate])

  return <div className="whitespace-pre">{displayedText}</div>
}

export default TypedOutput
  