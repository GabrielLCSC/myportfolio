"use client"

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  BrowserIcon,
  Building01Icon,
  CloudIcon,
  CodeIcon,
  Layers01Icon,
} from "@hugeicons/core-free-icons"

import { projects } from "@/lib/portfolio"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { BorderBeam } from "@/components/ui/border-beam"
import { Section, SectionHeading } from "@/components/front/section"

function projectIcon(icon: IconSvgElement) {
  return function Icon({ className }: { className?: string }) {
    return <HugeiconsIcon icon={icon} className={className} size={28} />
  }
}

const projectIcons = {
  browser: projectIcon(BrowserIcon),
  cloud: projectIcon(CloudIcon),
  building: projectIcon(Building01Icon),
  code: projectIcon(CodeIcon),
  layers: projectIcon(Layers01Icon),
}

export function Work() {
  return (
    <Section id="projets">
      <SectionHeading
        label="Projets"
        title="Des solutions livrées, et un produit innovant en cours."
      />
      <BentoGrid className="auto-rows-[18rem] grid-cols-1 md:auto-rows-[22rem] md:grid-cols-3">
        {projects.map((project, index) => {
          const Icon = projectIcons[project.icon]

          return (
            <BentoCard
              key={project.name}
              name={project.name}
              description={project.description}
              href={project.href}
              cta={project.cta}
              className={project.className}
              Icon={Icon}
              background={
                <>
                  <span className="pointer-events-none absolute top-5 right-6 font-mono text-5xl text-neutral-200">
                    0{index + 1}
                  </span>
                  {project.featured ? (
                    <BorderBeam
                      size={140}
                      duration={9}
                      colorFrom="#171717"
                      colorTo="#d4d4d4"
                      borderWidth={1}
                    />
                  ) : (
                    <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-neutral-100 to-transparent" />
                  )}
                </>
              }
            />
          )
        })}
      </BentoGrid>
    </Section>
  )
}
