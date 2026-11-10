import { BlurFade } from "@/components/ui/blur-fade"
import { cn } from "@/lib/utils"

export function Section({
  id,
  className,
  children,
}: {
  id: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn("scroll-mt-8 px-6 py-24", className)}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        {children}
      </div>
    </section>
  )
}

export function SectionHeading({
  label,
  title,
}: {
  label: string
  title: string
}) {
  return (
    <BlurFade inView className="max-w-2xl">
      <p className="text-xs font-medium tracking-[0.2em] text-neutral-500 uppercase">
        {label}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
        {title}
      </h2>
    </BlurFade>
  )
}
