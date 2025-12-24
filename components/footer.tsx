export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">Karan Kumar</h3>
            <p className="text-muted-foreground">
              AI Software Engineer specializing in full-stack development and fintech solutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-accent transition">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-accent transition">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-accent transition">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-accent transition">
                  Skills
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a href="mailto:karan@example.com" className="hover:text-accent transition">
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Skills</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>Full-Stack Development</li>
              <li>AI & Machine Learning</li>
              <li>FinTech Solutions</li>
              <li>Cloud Architecture</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground">
            © {currentYear} Karan Kumar. Designed & Built with passion for innovation.
          </p>
        </div>
      </div>
    </footer>
  )
}
