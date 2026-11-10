import { stack, stackSecondary } from "@/lib/portfolio"
import { Marquee } from "@/components/ui/marquee"
import { Section, SectionHeading } from "@/components/front/section"

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-800">
      {label}
    </span>
  )
}

export function Stack() {
  return (
    <Section id="stack">
      <SectionHeading
        label="Stack"
        title="Les outils que je garde sous la main."
      />
      <div className="relative flex flex-col gap-3 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:36s] [--gap:0.75rem]">
          {stack.map((item) => (
            <Chip key={item} label={item} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="[--duration:42s] [--gap:0.75rem]"
        >
          {stackSecondary.map((item) => (
            <Chip key={item} label={item} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-white to-transparent" />
      </div>
    </Section>
  )
}
