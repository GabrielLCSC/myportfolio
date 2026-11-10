import { Contact } from "@/components/front/contact"
import { SiteDock } from "@/components/front/Dock"
import { Experience } from "@/components/front/experience"
import { Hero } from "@/components/front/hero"
import { Stack } from "@/components/front/stack"
import { Work } from "@/components/front/work"
import { ScrollProgress } from "@/components/ui/scroll-progress"

export default function Page() {
  return (
    <>
      <ScrollProgress className="from-neutral-400 via-neutral-900 to-neutral-500" />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <SiteDock />
    </>
  )
}
