export default function Experience() {
  const experiences = [
    {
      role: "Associate Software Engineer",
      company: "NUO Financial Technologies",
      period: "Jan 2025 - Present",
      location: "Bangalore, Karnataka",
      description: "Full-Stack Developer",
      highlights: [
        "Developing PredixArena, a forecasting and prediction platform",
        "Built interactive frontend with React.js and TypeScript",
        "Optimized API performance and database interactions",
        "Enhanced RESTful API efficiency with 25% improvement",
      ],
      tech: ["Next.js", "React.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
    },
    {
      role: "Software Engineer Trainee",
      company: "NUO Financial Technologies",
      period: "July 2024 - Dec 2024",
      location: "Bangalore, Karnataka",
      description: "Developer",
      highlights: [
        "Contributed to MifosX, an open-source microfinance platform",
        "Optimized queries reducing response time by 20%",
        "Fixed 30% of high-priority bugs",
        "Improved API integration efficiency by 25%",
      ],
      tech: ["Java", "Spring Framework", "RESTful APIs", "MySQL"],
    },
  ]

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
              <span className="text-cyan-400 text-xl">⚡</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Experience
            </h2>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 relative group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-accent rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-cyan-400 font-semibold">{exp.company}</p>
                  <p className="text-muted-foreground text-sm">{exp.location}</p>
                </div>
                <p className="text-muted-foreground text-sm md:text-right px-4 py-2 bg-accent/10 rounded-lg">
                  {exp.period}
                </p>
              </div>

              <p className="text-muted-foreground mb-4 italic">{exp.description}</p>

              <ul className="space-y-2 mb-6">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-muted-foreground flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">▪</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm rounded-full font-mono hover:bg-cyan-400/20 transition"
                  >
                    {t}
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
