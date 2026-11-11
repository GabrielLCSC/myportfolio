"use client"

import { experience, terminalLines } from "@/lib/portfolio"
import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal"
import { Section, SectionHeading } from "@/components/front/section"
import { useTheme } from "next-themes"

export function Experience() {
  const { resolvedTheme } = useTheme()
  const cardGlow = {
    gradientFrom: "#737373",
    gradientTo: "#171717",
    gradientColor: resolvedTheme === "dark" ? "#262626" : "#f4f4f5",
    gradientOpacity: 0.85,
    gradientSize: 220,
  } as const

  return (
    <Section id="parcours">
      <SectionHeading
        label="Parcours"
        title="Agence, média, puis mon produit."
      />
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="flex flex-col gap-4">
          {experience.map((item, index) => (
            <BlurFade key={item.company} delay={0.06 * index} inView>
              <MagicCard
                className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                {...cardGlow}
              >
                <div className="relative z-40 flex flex-col gap-3 p-6 sm:flex-row sm:justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">{item.period}</p>
                    <h3 className="mt-1 text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                      {item.role}
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-300">{item.company}</p>
                  </div>
                  <p className="max-w-sm text-sm leading-6 text-neutral-500">
                    {item.summary}
                  </p>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>

        <BlurFade inView delay={0.12}>
          <Terminal className="max-w-none border-neutral-200 bg-neutral-50 font-mono text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
            <TypingAnimation className="text-neutral-950 dark:text-neutral-50">
              {terminalLines[0]}
            </TypingAnimation>
            {terminalLines.slice(1).map((line) => (
              <AnimatedSpan key={line} className="text-neutral-500">
                {line}
              </AnimatedSpan>
            ))}
          </Terminal>
        </BlurFade>
      </div>
    </Section>
  )
}
