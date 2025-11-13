"use client"

import { useInView } from "@/hooks/use-in-view"

export function About() {
  const { ref, isInView } = useInView()

  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto space-y-8 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sobre Mim
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-6">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Sou um web designer apaixonado por criar experiências digitais que combinam estética moderna com
              funcionalidade impecável. Com foco em interfaces intuitivas e designs responsivos, transformo ideias em
              realidades digitais impressionantes.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Minha abordagem combina criatividade com tecnologia de ponta, sempre buscando as últimas tendências e
              melhores práticas do mercado para entregar projetos que superam expectativas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
