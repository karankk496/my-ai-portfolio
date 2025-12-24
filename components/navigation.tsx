"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"
    setTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

  const switchTheme = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const themes = [
    { name: "dark", label: "Dark", color: "from-cyan-400 to-blue-500" },
    { name: "light", label: "Light", color: "from-blue-400 to-indigo-500" },
    { name: "cyber", label: "Cyber", color: "from-pink-500 to-purple-600" },
    { name: "ocean", label: "Ocean", color: "from-teal-400 to-blue-600" },
    { name: "sunset", label: "Sunset", color: "from-orange-400 to-pink-500" },
  ]

  const navLinks = [
    {
      href: "/",
      label: "Home",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      href: "/about",
      label: "About",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
      ),
    },
    {
      href: "/experience",
      label: "Experience",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6h-2.15l-.25-1.25C17.32 3.5 16.36 2.5 15.25 2.5h-6.5C7.64 2.5 6.68 3.5 6.4 4.75L6.15 6H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
        </svg>
      ),
    },
    {
      href: "/projects",
      label: "Projects",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
        </svg>
      ),
    },
    {
      href: "/skills",
      label: "Skills",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
    },
    {
      href: "/certifications",
      label: "Certifications",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      ),
    },
    {
      href: "/contact",
      label: "Contact",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent via-cyan-400 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <div className="relative bg-background px-3 py-2 rounded-lg border-2 border-accent/50 group-hover:border-accent transition-all duration-300">
                <span className="bg-gradient-to-r from-accent via-cyan-300 to-blue-400 bg-clip-text text-transparent font-mono font-bold text-lg tracking-wider">
                  {"{"}KK{"}"}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation with Theme Switcher */}
          <div className="hidden md:flex items-center gap-1 ml-auto mr-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group text-muted-foreground hover:text-accent transition-colors font-medium text-sm px-2.5 py-1.5 flex items-center gap-1.5 rounded-md hover:bg-accent/5"
                title={link.label}
              >
                <span className="group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                <span className="hidden lg:inline">{link.label}</span>
                <div className="absolute bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Theme Switcher and Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="px-3 py-2 rounded-lg border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 text-accent text-sm font-medium" suppressHydrationWarning={true}>
                Theme
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                {themes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => switchTheme(t.name)}
                    className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2 ${
                      theme === t.name ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground"
                    }`}
                    suppressHydrationWarning={true}
                  >
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${t.color}`}></div>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-accent" suppressHydrationWarning={true}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-card border-t border-border mt-4">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200 font-medium flex items-center gap-2"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border pt-3 mt-3">
                <p className="text-xs text-muted-foreground px-3 mb-2">Themes</p>
                <div className="grid grid-cols-3 gap-2 px-3">
                  {themes.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => {
                        switchTheme(t.name)
                        setIsOpen(false)
                      }}
                      className={`p-2 rounded-lg text-xs transition-all duration-200 border ${
                        theme === t.name
                          ? "border-accent bg-accent/20 text-accent"
                          : "border-border text-muted-foreground hover:border-accent/50"
                      }`}
                      suppressHydrationWarning={true}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
