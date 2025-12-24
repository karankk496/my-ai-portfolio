"use client"

import { useState } from "react"

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const projects = [
    {
      title: "PredixArena",
      description: "Forecasting and prediction platform for data-driven decision-making in fintech",
      long_description:
        "A comprehensive platform built with Next.js and React that enables users to make data-driven predictions and forecasts.",
      highlights: [
        "Scalable backend with Next.js and PostgreSQL",
        "Interactive frontend with React.js and TypeScript",
        "Real-time data processing and visualization",
        "RESTful API optimization",
      ],
      tech: ["Next.js", "React.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
      github: "#",
    },
    {
      title: "MifosX Microfinance Platform",
      description: "Open-source platform for managing financial services in microfinance institutions",
      long_description:
        "Contributed to this comprehensive microfinance management system with optimizations and bug fixes.",
      highlights: [
        "20% reduction in database response time",
        "Fixed 30% of high-priority bugs",
        "25% improvement in API efficiency",
        "Robust error handling",
      ],
      tech: ["Java", "Spring Framework", "MySQL", "REST APIs"],
      github: "#",
    },
    {
      title: "SQLAlchemyAI",
      description: "NLP-powered SQL query generator converting natural language to database queries",
      long_description: "Python and Django web application leveraging advanced NLP to simplify database interactions.",
      highlights: [
        "Natural language processing with TensorFlow",
        "Generates accurate SQL queries from text input",
        "Intuitive web interface with Django",
        "Supports multiple database types",
      ],
      tech: ["Python", "Django", "TensorFlow", "NLP", "MySQL"],
      github: "#",
    },
    {
      title: "Banking App",
      description: "Comprehensive Android banking application with full transaction management",
      long_description:
        "Full-featured mobile banking application with secure authentication and transaction processing.",
      highlights: [
        "MVC architecture pattern",
        "User authentication and profiles",
        "Transaction management",
        "Account operations",
      ],
      tech: ["Java", "Android Studio", "XML", "SQLite"],
      github: "#",
    },
    {
      title: "Plant Leave Detection",
      description: "Machine learning model using CNN to identify plant diseases through leaf analysis",
      long_description: "Computer vision project utilizing deep learning for agricultural applications.",
      highlights: [
        "Convolutional Neural Networks (CNN)",
        "Google Colaboratory implementation",
        "High accuracy classification",
        "Dataset processing and training",
      ],
      tech: ["Python", "TensorFlow", "OpenCV", "Google Colab"],
      github: "#",
    },
    {
      title: "User Management System",
      description: "Full-stack application for managing user data with validation and operations",
      long_description: "Comprehensive user management system with create, read, update, delete operations.",
      highlights: [
        "Form validation and error handling",
        "25% performance improvement",
        "Responsive user interface",
        "Secure data management",
      ],
      tech: ["React", "JavaScript", "Node.js", "APIs"],
      github: "#",
    },
  ]

  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <span className="text-blue-500 text-xl">◈</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </h2>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredId(idx)}
              onMouseLeave={() => setHoveredId(null)}
              className={`bg-card border rounded-lg overflow-hidden transition-all duration-300 transform group ${
                hoveredId === idx
                  ? "border-blue-500 shadow-lg shadow-blue-500/30 md:scale-105"
                  : "border-border hover:border-blue-500/50"
              }`}
            >
              <div className="p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <h3
                    className={`text-xl sm:text-2xl font-bold transition-colors duration-300 flex-1 ${
                      hoveredId === idx ? "text-blue-500" : "text-foreground"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <span className="text-2xl ml-2">{hoveredId === idx ? "→" : ""}</span>
                </div>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">{project.description}</p>

                <ul className="space-y-2 mb-6 flex-grow">
                  {project.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground text-xs sm:text-sm flex items-start gap-2 transition-transform duration-300"
                      style={{
                        transform: hoveredId === idx ? `translateX(4px)` : "translateX(0)",
                      }}
                    >
                      <span className="text-blue-500">▸</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 text-xs rounded font-mono transition-all duration-300 ${
                        hoveredId === idx
                          ? "bg-blue-500/20 border-blue-500 text-blue-500"
                          : "bg-blue-500/10 border-blue-500/30 text-blue-500"
                      } border`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  className="inline-flex items-center text-blue-500 hover:text-blue-400 transition transform hover:translate-x-1 text-sm sm:text-base"
                >
                  View Code →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
