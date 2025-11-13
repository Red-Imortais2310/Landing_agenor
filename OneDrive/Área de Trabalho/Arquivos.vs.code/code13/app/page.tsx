import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { BackgroundEffects } from "@/components/background-effects"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}
