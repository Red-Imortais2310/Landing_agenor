"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToAbout = () => {
    document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4">
        <div className={`text-center space-y-8 ${mounted ? "animate-slide-up" : "opacity-0"}`}>
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4">
              Web Designer & Developer
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block text-balance">Agenor de</span>
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
                Araújo Filho
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Criando experiências digitais inovadoras com design moderno e tecnologia de ponta
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform"
            >
              Ver Projetos
            </button>
            <button
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:scale-105 transition-transform"
            >
              Entre em Contato
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll para baixo"
      >
        <ChevronDown className="h-8 w-8 text-primary" />
      </button>
    </section>
  )
}
