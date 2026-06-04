"use client"

import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

type HeartItem = {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  opacity: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartItem[]>([])

  useEffect(() => {
    setHearts(
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 8,
        size: 14 + Math.random() * 20,
        opacity: 0.12 + Math.random() * 0.22,
      })),
    )
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="absolute bottom-[-40px] fill-primary text-primary animate-float"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
