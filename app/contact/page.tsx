import { AppWrapper } from "@/components/app-wrapper"
import Contact from "@/components/contact"

export default function ContactPage() {
  return (
    <AppWrapper>
      <main className="min-h-screen">
        <Contact />
      </main>
    </AppWrapper>
  )
}