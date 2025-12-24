"use client"

export default function Certifications() {
  const certifications = [
    {
      title: "Artificial Intelligence Bootcamp",
      issuer: "Professional Development",
      date: "November 11th, 2024",
      image: "/ai-bootcamp-certificate.jpg",
      description: "Comprehensive AI bootcamp covering modern AI/ML concepts and applications",
    },
    {
      title: "Machine Learning Specialist",
      issuer: "Professional Certification",
      date: "December 7th, 2023",
      image: "/machine-learning-specialist-certificate.jpg",
      description: "Advanced machine learning specialization and practical implementations",
    },
    {
      title: "Basic Certificate Course in Artificial Intelligence",
      issuer: "Educational Institution",
      date: "May 2023 - July 2023",
      image: "/ai-certificate-course.jpg",
      description: "Foundation course in AI fundamentals and practical applications",
    },
    {
      title: "Python for Data Science, AI & Development",
      issuer: "IBM Professional Certification",
      date: "January 16th, 2023",
      image: "/python-data-science-certificate.jpg",
      description: "Mastered Python for data science, AI, and development workflows",
    },
    {
      title: "Migrating to the AWS Cloud",
      issuer: "AWS Professional",
      date: "January 9th, 2023",
      image: "/aws-cloud-migration-certificate.jpg",
      description: "Advanced AWS cloud migration strategies and best practices",
    },
    {
      title: "Programming with Java",
      issuer: "Professional Certification",
      date: "December 17th, 2022",
      image: "/java-programming-certificate.jpg",
      description: "Professional Java programming and object-oriented design patterns",
    },
  ]

  return (
    <section id="certifications" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
              <span className="text-orange-500 text-xl">✦</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Certifications & Achievements
            </h2>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mb-4"></div>
          <p className="text-muted-foreground text-lg">Professional credentials and continuous learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-1"
            >
              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden bg-background/50">
                <img
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-mono rounded-full border border-accent/30 mb-3">
                    {cert.date}
                  </span>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{cert.issuer}</p>
                <p className="text-muted-foreground text-sm">{cert.description}</p>

                <div className="mt-4 pt-4 border-t border-border">
                  <button 
                    className="w-full px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300 text-sm font-medium"
                    suppressHydrationWarning
                  >
                    View Credential
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
