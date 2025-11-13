"use client"

import { useInView } from "@/hooks/use-in-view"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "E-commerce Moderno",
    description: "Plataforma de vendas online com design minimalista e experiência de compra otimizada",
    image: "/modern-ecommerce-website.png",
    tags: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Dashboard Analytics",
    description: "Interface administrativa com visualização de dados em tempo real e gráficos interativos",
    image: "/analytics-dashboard-dark-theme.png",
    tags: ["TypeScript", "Charts", "API"],
  },
  {
    title: "App Mobile First",
    description: "Aplicação web progressiva com foco em dispositivos móveis e performance",
    image: "/mobile-app-interface.png",
    tags: ["PWA", "Mobile", "UX"],
  },
  {
    title: "Landing Page Tech",
    description: "Página de conversão com animações suaves e design futurista",
    image: "/tech-landing-page-futuristic.jpg",
    tags: ["Animation", "Design", "Conversão"],
  },
]

export function Projects() {
  const { ref, isInView } = useInView()

  return (
    <section id="projetos" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Projetos em Destaque
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group transition-all duration-700 delay-${index * 100} ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform hover:border-primary/50">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                    <ExternalLink className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
