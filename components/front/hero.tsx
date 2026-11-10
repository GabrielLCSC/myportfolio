"use client"

import { profile, stats, words } from "@/lib/portfolio"
import { cn } from "@/lib/utils"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { BlurFade } from "@/components/ui/blur-fade"
import { buttonVariants } from "@/components/ui/button"
import { DotPattern } from "@/components/ui/dot-pattern"
import { NumberTicker } from "@/components/ui/number-ticker"
import { TextAnimate } from "@/components/ui/text-animate"
import { WordRotate } from "@/components/ui/word-rotate"

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-24 pb-36"
    >
      <DotPattern
        width={22}
        height={22}
        cr={1}
        className="text-neutral-300/80 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
        <BlurFade>
          <AnimatedShinyText className="inline-flex text-sm font-medium text-neutral-600">
            {profile.availability}
          </AnimatedShinyText>
        </BlurFade>

        <div className="flex max-w-3xl flex-col gap-3">
          <h1 className="text-5xl font-semibold tracking-tight text-neutral-950 sm:text-7xl">
            <TextAnimate
              as="span"
              by="word"
              animation="blurInUp"
              once
              startOnView={false}
              className="text-left"
            >
              {profile.headline}
            </TextAnimate>
          </h1>
          <BlurFade delay={0.15} className="flex flex-wrap items-baseline gap-x-3 text-2xl text-neutral-500 sm:text-3xl">
            <span>Passé par</span>
            <WordRotate
              words={words}
              duration={2200}
              className="text-2xl font-medium text-neutral-950 sm:text-3xl"
            />
          </BlurFade>
        </div>

        <BlurFade delay={0.25}>
          <p className="max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
            {profile.lead}
          </p>
        </BlurFade>

        <BlurFade delay={0.35} className="flex flex-wrap gap-3">
          <a
            href="#projets"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-neutral-950 text-white hover:bg-neutral-800"
            )}
          >
            Voir les projets
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100"
            )}
          >
            Me contacter
          </a>
        </BlurFade>

        <BlurFade delay={0.45}>
          <dl className="grid max-w-2xl grid-cols-3 gap-6 border-t border-neutral-200 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-3xl font-semibold tracking-tight text-neutral-950">
                  <NumberTicker value={stat.value} />
                </dt>
                <dd className="mt-1 text-sm text-neutral-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </BlurFade>
      </div>
    </section>
  )
}
