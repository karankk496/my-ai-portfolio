"use client"

import { ThemeProvider } from "./theme-provider"
import Navigation from "./navigation"
import type React from "react"

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navigation />
      {children}
    </ThemeProvider>
  )
}
