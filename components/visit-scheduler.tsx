"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CalendarHeart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function VisitScheduler() {
  const today = startOfDay(new Date())
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const [selected, setSelected] = useState<Date | null>(null)
  const [confirmed, setConfirmed] = useState<Date | null>(null)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  async function confirmDate() {
    if (!selected) return
    setSending(true)
    setSendError(false)
    const formattedDate = selected.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
    try {
      const res = await fetch("/api/agendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: formattedDate }),
      })
      if (!res.ok) throw new Error("falha")
      setConfirmed(selected)
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  const canGoPrev =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth())

  function goPrev() {
    if (canGoPrev) setViewDate(new Date(year, month - 1, 1))
  }
  function goNext() {
    setViewDate(new Date(year, month + 1, 1))
  }

  const formatted = confirmed
    ? confirmed.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : ""

  return (
    <section className="w-full">
      <div className="mb-6 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
          <CalendarHeart className="size-4 text-primary" aria-hidden="true" />
          Marca um encontro comigo
        </div>
        <h2 className="text-balance font-serif text-2xl font-bold text-foreground sm:text-3xl">
          Que dia você vem me ver?
        </h2>
        <p className="mt-2 text-pretty text-sm text-muted-foreground">
          Escolhe o dia que você consegue vir aqui em casa. Eu já estou
          contando os minutos.
        </p>
      </div>

      <div className="mx-auto max-w-sm rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Mês anterior"
            className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="size-5" />
          </button>
          <span className="font-serif text-lg font-semibold text-foreground">
            {MONTHS[month]} {year}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="Próximo mês"
            className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-1">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="py-1 text-center text-xs font-medium text-muted-foreground"
            >
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((date, i) => {
            if (!date) return <div key={`empty-${i}`} />
            const isPast = date < today
            const isSelected =
              selected && date.getTime() === selected.getTime()
            const isToday = date.getTime() === today.getTime()
            return (
              <button
                key={date.toISOString()}
                type="button"
                disabled={isPast}
                onClick={() => setSelected(date)}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-full text-sm transition-colors",
                  isPast && "cursor-not-allowed text-muted-foreground/40",
                  !isPast &&
                    !isSelected &&
                    "text-foreground hover:bg-secondary",
                  isToday && !isSelected && "font-bold text-primary",
                  isSelected &&
                    "bg-primary font-semibold text-primary-foreground",
                )}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>

        <Button
          className="mt-5 w-full"
          disabled={!selected || sending}
          onClick={confirmDate}
        >
          {sending ? "Enviando..." : "Confirmar esse dia"}
        </Button>

        {sendError && (
          <p className="mt-3 text-center text-sm text-destructive">
            Ops, não consegui confirmar agora. Tenta de novo em instantes.
          </p>
        )}
      </div>

      {confirmed && (
        <div className="mx-auto mt-5 max-w-sm rounded-2xl bg-accent p-4 text-center text-accent-foreground">
          <div className="mb-1 flex items-center justify-center gap-2 font-semibold">
            <Check className="size-5" aria-hidden="true" />
            Encontro marcado!
          </div>
          <p className="text-pretty text-sm capitalize">{formatted}</p>
          <p className="mt-1 text-pretty text-sm normal-case">
            Eu vou estar te esperando.
          </p>
        </div>
      )}
    </section>
  )
}
