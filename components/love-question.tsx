"use client"

import { useState, useCallback } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const NO_TEASES = [
  "Não",
  "Tem certeza?",
  "Pensa de novo!",
  "Sério mesmo?",
  "Não vale!",
  "Tenta de novo",
  "Para com isso",
  "Você não consegue!",
  "Hahaha não",
  "Nem adianta",
]

export function LoveQuestion() {
  const [yes, setYes] = useState(false)
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null)
  const [teaseIndex, setTeaseIndex] = useState(0)
  const [yesScale, setYesScale] = useState(1)

  const dodge = useCallback(() => {
    // Move o botão para uma posição aleatória dentro de uma área segura
    const range = 130
    const x = (Math.random() - 0.5) * 2 * range
    const y = (Math.random() - 0.5) * 2 * range
    setNoPos({ x, y })
    setTeaseIndex((i) => (i + 1) % NO_TEASES.length)
    setYesScale((s) => Math.min(s + 0.08, 1.6))
  }, [])

  if (yes) {
    return (
      <section className="flex flex-col items-center text-center">
        <div className="animate-in fade-in zoom-in duration-500">
          <div className="mb-4 flex justify-center gap-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className="size-7 fill-primary text-primary"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
          <h2 className="text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Eu sabia!
          </h2>
          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Você acabou de me deixar a pessoa mais feliz do mundo. Agora é só
            esperar o nosso dia chegar. Eu também te amo, demais.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center text-center">
      <h2 className="text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl">
        Você me ama?
      </h2>
      <p className="mt-3 max-w-md text-pretty text-sm text-muted-foreground">
        Responde com sinceridade, hein... (mas só tem uma resposta certa)
      </p>

      <div className="relative mt-10 flex h-44 w-full max-w-md items-center justify-center gap-4">
        <Button
          size="lg"
          onClick={() => setYes(true)}
          style={{ transform: `scale(${yesScale})` }}
          className="z-10 px-8 text-base transition-transform duration-200"
        >
          Sim, te amo
        </Button>

        <Button
          variant="outline"
          size="lg"
          onMouseEnter={dodge}
          onPointerDown={(e) => {
            e.preventDefault()
            dodge()
          }}
          onFocus={dodge}
          style={
            noPos
              ? {
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                  position: "absolute",
                }
              : undefined
          }
          className="px-8 text-base transition-transform duration-200 ease-out"
        >
          {NO_TEASES[teaseIndex]}
        </Button>
      </div>
    </section>
  )
}
