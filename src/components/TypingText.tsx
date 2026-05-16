import React, { useState, useEffect } from 'react'

interface TypingTextProps {
  text: string
  speed?: number
  onComplete?: () => void
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 10, onComplete }) => {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setDisplayed('')
    setIndex(0)
  }, [text])

  useEffect(() => {
    if (index >= text.length) {
      onComplete?.()
      return
    }

    const timeout = setTimeout(() => {
      setDisplayed((prev) => prev + text[index])
      setIndex((prev) => prev + 1)
    }, Math.max(1, speed + Math.round(Math.random() * speed)))

    return () => clearTimeout(timeout)
  }, [index, text, speed, onComplete])

  return <span>{displayed}</span>
}

export default TypingText
