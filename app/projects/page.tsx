import { AppWrapper } from "@/components/app-wrapper"
import Projects from "@/components/projects"

export default function ProjectsPage() {
  return (
    <AppWrapper>
      <main className="min-h-screen">
        <Projects />
      </main>
    </AppWrapper>
  )
}