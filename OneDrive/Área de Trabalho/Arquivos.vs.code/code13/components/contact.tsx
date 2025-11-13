"use client"

import { useInView } from "@/hooks/use-in-view"
import { Mail, Phone, Instagram, Linkedin, MessageCircle } from "lucide-react"

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com",
    color: "hover:text-pink-500",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/5513982018522",
    color: "hover:text-green-500",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
    color: "hover:text-blue-500",
  },
]

export function Contact() {
  const { ref, isInView } = useInView()

  return (
    <section id="contato" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Vamos Conversar?
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div
          ref={ref}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-8">
            <p className="text-center text-lg text-muted-foreground">
              Estou sempre aberto a novos projetos e oportunidades. Entre em contato!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="mailto:agenor.araujof@gmail.com"
                className="flex items-center gap-4 p-6 bg-secondary rounded-xl hover:scale-105 transition-transform group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium break-all">agenor.araujof@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+5513982018522"
                className="flex items-center gap-4 p-6 bg-secondary rounded-xl hover:scale-105 transition-transform group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Telefone</div>
                  <div className="font-medium">+55 13 98201-8522</div>
                </div>
              </a>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-center text-muted-foreground mb-6">Me siga nas redes sociais</p>
              <div className="flex justify-center gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center hover:scale-110 transition-all ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12 text-sm text-muted-foreground">
            <p>© 2025 Agenor de Araújo Filho. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
