"use client"

import type { COBEOptions } from "cobe"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { GithubIcon, Linkedin01Icon } from "@hugeicons/core-free-icons"

import { profile, socials } from "@/lib/portfolio"
import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/ui/blur-fade"
import { buttonVariants } from "@/components/ui/button"
import { Globe } from "@/components/ui/globe"
import { MagicCard } from "@/components/ui/magic-card"
import { Section, SectionHeading } from "@/components/front/section"
import { useTheme } from "next-themes"
import { useMemo } from "react"

const contactSocialIcons: Partial<
  Record<(typeof socials)[number]["name"], IconSvgElement>
> = {
  GitHub: GithubIcon,
  LinkedIn: Linkedin01Icon,
}

const globeConfig: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => { },
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
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme === "dark"
  const globe = useMemo(
    () => ({
      ...globeConfig,
      dark: dark ? 1 : 0,
      baseColor: dark ? ([0.16, 0.16, 0.16] as [number, number, number]) : ([1, 1, 1] as [number, number, number]),
      markerColor: dark ? ([0.9, 0.9, 0.9] as [number, number, number]) : ([0.12, 0.12, 0.12] as [number, number, number]),
      glowColor: dark ? ([0.25, 0.25, 0.25] as [number, number, number]) : ([0.9, 0.9, 0.9] as [number, number, number]),
    }),
    [dark]
  )

  return (
    <Section id="contact" className="pb-40">
      <SectionHeading
        label="Contact"
        title="Pour échanger sur le parcours."
      />
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        <BlurFade inView>
          <MagicCard
            className="h-full rounded-3xl bg-white dark:bg-neutral-900"
            gradientFrom="#737373"
            gradientTo="#171717"
            gradientColor={dark ? "#262626" : "#f4f4f5"}
            gradientOpacity={0.9}
          >
            <div className="relative z-40 flex h-full flex-col justify-between gap-8 p-8">
              <div className="flex flex-col gap-3">
                <p className="text-sm text-neutral-500">{profile.name}</p>
                <p className="max-w-sm text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
                  Le SaaS n’est pas encore public. Le reste du parcours l’est.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-fit bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                  )}
                >
                  {profile.email}
                </a>
                <div className="flex gap-1 sm:hidden">
                  {socials
                    .filter((item) => item.name !== "Email")
                    .map((item) => {
                      const icon = contactSocialIcons[item.name]
                      if (!icon) return null

                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={item.name}
                          className="flex size-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                        >
                          <HugeiconsIcon icon={icon} size={18} />
                        </a>
                      )
                    })}
                </div>
              </div>
            </div>
          </MagicCard>
        </BlurFade>

        <BlurFade inView delay={0.08}>
          <div className="relative h-80 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 lg:h-full lg:min-h-80 dark:border-neutral-800 dark:bg-neutral-900">
            <Globe className="top-8" config={globe} />
          </div>
        </BlurFade>
      </div>
    </Section>
  )
}
