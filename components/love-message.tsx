import { Heart } from "lucide-react"

export function LoveMessage() {
  return (
    <section className="flex flex-col items-center text-center">
      <div className="mb-6 flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
        <Heart className="size-4 fill-primary text-primary" aria-hidden="true" />
        Uma mensagem só para você
      </div>

      <h1 className="text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
        Estou morrendo de saudades de você
      </h1>

      <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        Meu Mateuszinho
      </p>

      <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        To com saudades já. Como sempre te falo, gostaria de te guardar em um potinho para ter você sempre grudado comigo.
        Fica até o final, tá? Tenho uma
        perguntinha importante para te fazer.
      </p>

      <div className="mt-10 flex items-center gap-3 text-primary" aria-hidden="true">
        <span className="h-px w-12 bg-border" />
        <Heart className="size-5 fill-primary" />
        <span className="h-px w-12 bg-border" />
      </div>
    </section>
  )
}
