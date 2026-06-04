import { LoveMessage } from "@/components/love-message"
import { VisitScheduler } from "@/components/visit-scheduler"
import { LoveQuestion } from "@/components/love-question"
import { FloatingHearts } from "@/components/floating-hearts"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <FloatingHearts />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col gap-24 px-6 py-20 sm:py-28">
        <LoveMessage />
        <VisitScheduler />
        <LoveQuestion />

        <footer className="pb-4 text-center text-sm text-muted-foreground">
          Feito com muito carinho.
        </footer>
      </div>
    </main>
  )
}
