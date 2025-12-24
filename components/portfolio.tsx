"use client"

import { AppWrapper } from "@/components/app-wrapper"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Portfolio() {
  return (
    <AppWrapper>
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </AppWrapper>
  )
}