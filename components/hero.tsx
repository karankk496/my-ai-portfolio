"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Karan\u00A0Kumar"  // Using non-breaking space
  const [isComplete, setIsComplete] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [charGlows, setCharGlows] = useState<boolean[]>([])

  useEffect(() => {
    if (isComplete) return

    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        // Add a small delay when reaching the space to make it more noticeable
        if (index === 5) { // Space is at index 5 (after 'Karan')
          setTimeout(() => {
            setDisplayText(fullText.slice(0, index + 1))
            setCharGlows(new Array(index + 1).fill(false).map(() => Math.random() > 0.5))
            index++
          }, 100) // 100ms pause at the space
        } else {
          setDisplayText(fullText.slice(0, index + 1))
          setCharGlows(new Array(index + 1).fill(false).map(() => Math.random() > 0.5))
          index++
        }
      } else {
        setIsComplete(true)
        setShowSubtitle(true)
        clearInterval(interval)
      }
    }, 60)

    return () => clearInterval(interval)
  }, [isComplete])

  useEffect(() => {
    if (!isComplete) return

    const glowInterval = setInterval(() => {
      setCharGlows((prev) => prev.map(() => Math.random() > 0.5))
    }, 1000)

    return () => clearInterval(glowInterval)
  }, [isComplete])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative pt-16 sm:pt-20 overflow-hidden">
      {/* Enhanced neural network background */}
      <div className="absolute inset-0 -z-10">
        {/* Multiple animated gradient orbs */}
        <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-60 sm:w-96 h-60 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className="absolute top-1/3 right-20 w-40 sm:w-60 h-40 sm:h-60 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Grid background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10 w-full flex flex-col items-center text-center">
        {/* Profile picture - now centered at top */}
        <div className="flex justify-center items-center relative mb-8 sm:mb-12">
          {/* Animated circular background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 via-blue-500/10 to-cyan-500/20 blur-3xl animate-pulse"></div>

          {/* Rotating border */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-accent via-blue-400 to-cyan-400 bg-clip-border p-0.5"></div>

          {/* Profile picture container */}
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-accent/30 shadow-2xl">
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-blue-500/20 flex items-center justify-center">
              <img
                src="/passport.png"
                alt="Karan Kumar - AI Software Engineer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* AI neural network decorative elements */}
          <div
            className="absolute -top-4 sm:top-0 -right-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 border-2 border-accent/40 rounded-lg animate-float"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute -bottom-4 sm:bottom-0 -left-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-2 border-blue-400/40 rounded-full animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-1/2 -right-3 sm:right-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent/50 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Centered text content */}
        <div className="space-y-4 sm:space-y-6 max-w-3xl">
          <div className="space-y-2 sm:space-y-4">
            <div className="text-xs sm:text-lg text-accent font-mono tracking-widest mb-2 sm:mb-4 opacity-80">
              $ neural_engine.initialize()
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight whitespace-nowrap">
              <span className="inline-block relative">
                {displayText.split("").map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-300 ${
                      charGlows[index] ? "animate-letter-glow" : ""
                    } bg-gradient-to-r from-accent via-blue-400 to-cyan-400 bg-clip-text text-transparent`}
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    {char}
                  </span>
                ))}
                {!isComplete && <span className="animate-pulse ml-1">_</span>}
              </span>
            </h1>
          </div>

          {showSubtitle && (
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <div className="text-xs sm:text-lg text-accent font-mono border-t-2 border-b-2 border-accent/30 px-3 sm:px-4 py-3 sm:py-4 mx-auto inline-block max-w-2xl">
                AI Engineer | Full-Stack Developer | FinTech Innovator
              </div>

              <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mx-auto">
                Building intelligent, scalable solutions at the intersection of{" "}
                <span className="text-accent font-semibold">AI</span>,
                <span className="text-blue-400 font-semibold"> full-stack development</span>, and
                <span className="text-cyan-400 font-semibold"> fintech innovation</span>
              </p>

              <p className="text-base sm:text-lg text-accent font-mono mt-4 sm:mt-6">
                {"< Transforming data into intelligence />"} <span className="animate-blink">▌</span>
              </p>
            </div>
          )}

          {/* Centered buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 pt-6 sm:pt-8 justify-center w-full">
            <a
              href="#contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-opacity-90 transition transform hover:scale-105 active:scale-95 duration-200 text-sm sm:text-base"
            >
              Start a Conversation
            </a>
            <a
              href="#projects"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition duration-200 backdrop-blur-sm text-sm sm:text-base"
            >
              Explore Projects
            </a>
          </div>

          {/* Centered social links */}
          <div className="pt-8 sm:pt-12 flex justify-center gap-4 sm:gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition text-xl sm:text-2xl hover:scale-110 duration-200"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.6 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition text-xl sm:text-2xl hover:scale-110 duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.949v5.438h-3.554s.047-8.733 0-9.646h3.554v1.364c.429-.659 1.191-1.6 2.894-1.6 2.111 0 3.694 1.38 3.694 4.342v5.54zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.954.767-1.715 1.958-1.715 1.191 0 1.915.761 1.915 1.715 0 .953-.723 1.715-1.958 1.715zm1.581 11.597H3.754V9.671h3.164v10.781zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition text-xl sm:text-2xl hover:scale-110 duration-200"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s1.1 5-3.5 8.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
