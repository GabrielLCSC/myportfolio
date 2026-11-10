"use client"

import type { COBEOptions } from "cobe"

import { profile } from "@/lib/portfolio"
import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/ui/blur-fade"
import { buttonVariants } from "@/components/ui/button"
import { Globe } from "@/components/ui/globe"
import { MagicCard } from "@/components/ui/magic-card"
import { Section, SectionHeading } from "@/components/front/section"

const globeConfig: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 0,
  diffuse: 0.35,
  mapSamples: 16000,
  mapBrightness: 1.15,
  baseColor: [1, 1, 1],
  markerColor: [0.12, 0.12, 0.12],
  glowColor: [0.9, 0.9, 0.9],
  markers: [{ location: [48.8566, 2.3522], size: 0.08 }],
}

export function Contact() {
  return (
    <Section id="contact" className="pb-40">
      <SectionHeading
        label="Contact"
        title="Pour échanger sur le parcours."
      />
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        <BlurFade inView>
          <MagicCard
            className="h-full rounded-3xl bg-white"
            gradientFrom="#737373"
            gradientTo="#171717"
            gradientColor="#f4f4f5"
            gradientOpacity={0.9}
          >
            <div className="relative z-40 flex h-full flex-col justify-between gap-8 p-8">
              <div className="flex flex-col gap-3">
                <p className="text-sm text-neutral-500">{profile.name}</p>
                <p className="max-w-sm text-2xl font-semibold tracking-tight text-neutral-950">
                  Le SaaS n’est pas encore public. Le reste du parcours l’est.
                </p>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-fit bg-neutral-950 text-white hover:bg-neutral-800"
                )}
              >
                {profile.email}
              </a>
            </div>
          </MagicCard>
        </BlurFade>

        <BlurFade inView delay={0.08}>
          <div className="relative h-80 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 lg:h-full lg:min-h-80">
            <Globe className="top-8" config={globeConfig} />
          </div>
        </BlurFade>
      </div>
    </Section>
  )
}
