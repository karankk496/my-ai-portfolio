"use client"

import { useState, useEffect } from "react"

export default function About() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "15+", label: "Projects Completed" },
    { value: "10+", label: "Technologies" },
    { value: "30%", label: "Bug Reduction" },
  ]

  return (
    <section id="about" className="py-20 px-6 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 border border-accent rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 border border-cyan-400 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
              <span className="text-accent text-xl">◆</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-cyan-400 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm Karan, a Software Engineer with a Bachelor of Engineering in Artificial Intelligence and Machine
              Learning from Visvesvaraya Technological University. Currently working at NUO Financial Technologies,
              where I specialize in building intelligent, scalable full-stack solutions.
            </p>
            <p>
              My passion lies at the intersection of AI/ML and financial technology. I thrive on solving real-world
              problems through code, combining intuitive front-end experiences with robust back-end systems. I'm
              particularly drawn to projects that leverage data-driven insights and intelligent algorithms.
            </p>
            <p>
              Beyond coding, I'm continuously learning, contributing to open-source projects, and exploring innovative
              approaches to fintech and AI applications. I believe in clean code, performance optimization, and building
              solutions that make a real impact.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-500 transform hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 ${
                  animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: animate ? `${i * 100}ms` : "0ms",
                }}
              >
                <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
