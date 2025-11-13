"use client"

import { useInView } from "@/hooks/use-in-view"
import { Code2, Palette, Smartphone, Zap } from "lucide-react"

const skills = [
  {
    icon: Code2,
    title: "Desenvolvimento Web",
    description: "HTML, CSS, JavaScript, React, Next.js",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Design UI/UX",
    description: "Figma, Adobe XD, Protótipos interativos",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Smartphone,
    title: "Design Responsivo",
    description: "Mobile-first, Progressive Web Apps",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Otimização, SEO, Acessibilidade",
    color: "from-yellow-500 to-orange-500",
  },
]

export function Skills() {
  const { ref, isInView } = useInView()

  return (
    <section id="habilidades" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Habilidades
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className={`group transition-all duration-700 delay-${index * 100} ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:scale-105 transition-transform hover:border-primary/50">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} p-3 mb-6`}>
                  <skill.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
