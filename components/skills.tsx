"use client"

import { useState } from "react"

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skillCategories = [
    {
      category: "Languages",
      skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
    },
    {
      category: "Frontend",
      skills: ["React.js", "Next.js", "TailwindCSS", "HTML5", "CSS3"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Spring Boot", "Django", "Flask", "REST APIs"],
    },
    {
      category: "AI/ML",
      skills: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Deep Learning", "NLP"],
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MySQL", "Oracle", "SQLite"],
    },
    {
      category: "Tools & DevOps",
      skills: ["Git", "Docker", "Maven", "Gradle", "VS Code", "Postman"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <span className="text-purple-500 text-xl">⚙</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg p-8 hover:border-purple-500/50 transition hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                  <span className="text-purple-500 text-sm">●</span>
                </div>
                <h3 className="text-xl font-bold text-purple-500">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, i) => (
                  <span
                    key={i}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`px-4 py-2 text-foreground rounded-lg font-mono text-sm transition-all duration-300 transform cursor-pointer ${
                      hoveredSkill === skill
                        ? "bg-purple-500 border-purple-500 text-white scale-110 shadow-lg shadow-purple-500/30"
                        : hoveredSkill && hoveredSkill !== skill
                          ? "bg-purple-500/5 border-purple-500/20 opacity-60"
                          : "bg-purple-500/10 border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/20"
                    } border`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
