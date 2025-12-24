"use client"

import type React from "react"

import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-emerald-500 text-xl">✉</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent text-center">
              Get In Touch
            </h2>
          </div>
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4"></div>
          <p className="text-center text-muted-foreground text-base sm:text-lg">
            I'm always open to collaboration and new opportunities. Let's create something amazing together.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6 hover:border-emerald-500/30 transition"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-foreground font-semibold mb-2 text-sm sm:text-base">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition text-sm sm:text-base"
                placeholder="Your name"
                suppressHydrationWarning={true}
              />
            </div>
            <div>
              <label className="block text-foreground font-semibold mb-2 text-sm sm:text-base">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition text-sm sm:text-base"
                placeholder="your@email.com"
                suppressHydrationWarning={true}
              />
            </div>
          </div>

          <div>
            <label className="block text-foreground font-semibold mb-2 text-sm sm:text-base">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition text-sm sm:text-base"
              placeholder="What's this about?"
              suppressHydrationWarning={true}
            />
          </div>

          <div>
            <label className="block text-foreground font-semibold mb-2 text-sm sm:text-base">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition resize-none text-sm sm:text-base"
              placeholder="Share your thoughts..."
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-opacity-90 transition transform hover:scale-105 text-sm sm:text-base"
            suppressHydrationWarning={true}
          >
            {submitted ? "Message Sent!" : "Send Message"}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <a
            href="mailto:karan@example.com"
            className="bg-card border border-border rounded-lg p-4 sm:p-6 text-center hover:border-accent/50 transition"
          >
            <p className="text-muted-foreground mb-2 text-sm">Email</p>
            <p className="text-accent font-mono text-sm sm:text-base">karan@example.com</p>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border rounded-lg p-4 sm:p-6 text-center hover:border-accent/50 transition"
          >
            <p className="text-muted-foreground mb-2 text-sm">LinkedIn</p>
            <p className="text-accent font-mono text-sm sm:text-base">linkedin.com/in/karan</p>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border rounded-lg p-4 sm:p-6 text-center hover:border-accent/50 transition"
          >
            <p className="text-muted-foreground mb-2 text-sm">GitHub</p>
            <p className="text-accent font-mono text-sm sm:text-base">github.com/karan</p>
          </a>
        </div>
      </div>
    </section>
  )
}
