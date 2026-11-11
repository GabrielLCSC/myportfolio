"use client"

import React, { useEffect, useId, useRef, useState } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 *  DotPattern Component Props
 *
 * @param {number} [width=16] - The horizontal spacing between dots
 * @param {number} [height=16] - The vertical spacing between dots
 * @param {number} [x=0] - The x-offset of the entire pattern
 * @param {number} [y=0] - The y-offset of the entire pattern
 * @param {number} [cx=1] - The x-offset of individual dots
 * @param {number} [cy=1] - The y-offset of individual dots
 * @param {number} [cr=1] - The radius of each dot
 * @param {string} [className] - Additional CSS classes to apply to the SVG container
 * @param {boolean} [glow=false] - Whether dots should have a glowing animation effect
 * @param {boolean} [interactive=false] - A gray mass sits to the right of the hero text and drifts slightly.
 */
interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
  glow?: boolean
  interactive?: boolean
  [key: string]: unknown
}

/**
 * DotPattern Component
 *
 * A React component that creates an animated or static dot pattern background using SVG.
 * The pattern automatically adjusts to fill its container and can optionally display glowing dots.
 *
 * @component
 *
 * @see DotPatternProps for the props interface.
 *
 * @example
 * // Basic usage
 * <DotPattern />
 *
 * // With glowing effect and custom spacing
 * <DotPattern
 *   width={20}
 *   height={20}
 *   glow={true}
 *   className="opacity-50"
 * />
 *
 * @notes
 * - The component is client-side only ("use client")
 * - Automatically responds to container size changes
 * - When glow is enabled, dots will animate with random delays and durations
 * - Uses Motion for animations
 * - Dots color can be controlled via the text color utility classes
 */

const DOT_COLOR = { r: 163, g: 163, b: 163 }
const REST_RADIUS = 1.12
const PEAK_GROWTH = 3.3
const MASS_RADIUS = 176
const DRIFT_X = 100
const DRIFT_Y = 72
const SHRINK_RADIUS = 62
const SHRINK_HOLD = 0.5
const SHRINK_RELEASE = 0.2

function InteractiveDotField({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
}: DotPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext("2d")
    if (!canvas || !parent || !ctx) return

    let frame = 0
    const pointer = { x: -9999, y: -9999, active: false }
    const trail: { x: number; y: number; t: number }[] = []
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mobile = window.matchMedia("(max-width: 767px)")
    const finePointer = window.matchMedia("(pointer: fine)")
    const drift = {
      x: 0,
      y: 0,
      fromX: 0,
      fromY: 0,
      toX: 0,
      toY: 0,
      phase: "hold" as "move" | "hold",
      startedAt: -1,
      duration: 0.4,
    }

    const beginMove = (now: number) => {
      const angle = Math.random() * Math.PI * 2
      const step = 40 + Math.random() * 36
      let toX = drift.x + Math.cos(angle) * step
      let toY = drift.y + Math.sin(angle) * step * 0.8
      toX = Math.max(-DRIFT_X, Math.min(DRIFT_X, toX))
      toY = Math.max(-DRIFT_Y, Math.min(DRIFT_Y, toY))
      if (Math.hypot(toX - drift.x, toY - drift.y) < 14) {
        toX = Math.max(-DRIFT_X, Math.min(DRIFT_X, drift.x - Math.cos(angle) * step))
        toY = Math.max(-DRIFT_Y, Math.min(DRIFT_Y, drift.y - Math.sin(angle) * step * 0.8))
      }
      drift.fromX = drift.x
      drift.fromY = drift.y
      drift.toX = toX
      drift.toY = toY
      drift.phase = "move"
      drift.startedAt = now
      drift.duration = 0.18 + Math.random() * 0.16
    }

    const massDrift = (now: number) => {
      if (drift.startedAt < 0) {
        drift.startedAt = now
        drift.phase = "hold"
        drift.duration = 0.35
      }
      const elapsed = now - drift.startedAt
      if (drift.phase === "move") {
        const t = Math.min(1, elapsed / drift.duration)
        const eased = 1 - (1 - t) * (1 - t)
        drift.x = drift.fromX + (drift.toX - drift.fromX) * eased
        drift.y = drift.fromY + (drift.toY - drift.fromY) * eased
        if (t >= 1) {
          drift.x = drift.toX
          drift.y = drift.toY
          drift.phase = "hold"
          drift.startedAt = now
          drift.duration = 0.75 + Math.random() * 1.15
        }
      } else if (elapsed >= drift.duration) {
        beginMove(now)
      }
      return drift
    }

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const bufferWidth = Math.round(rect.width * dpr)
      const bufferHeight = Math.round(rect.height * dpr)
      if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
        canvas.width = bufferWidth
        canvas.height = bufferHeight
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, rect.width, rect.height)

      const seconds = time / 1000
      const moving = !reducedMotion.matches && !mobile.matches
      if (mobile.matches) trail.length = 0
      const heading = parent.querySelector("h1")
      const block = heading?.parentElement
      let anchorX = rect.width * 0.72
      let anchorY = rect.height * 0.4
      if (heading && block) {
        const range = document.createRange()
        range.selectNodeContents(heading)
        const glyphs = range.getBoundingClientRect()
        const box = block.getBoundingClientRect()
        anchorX = Math.min(rect.width - 48, glyphs.right - rect.left + 210)
        anchorY = (box.top + box.bottom) / 2 - rect.top
      }

      const drift = moving ? massDrift(seconds) : { x: 0, y: 0 }
      const massX = anchorX + drift.x
      const massY = anchorY + drift.y

      if (pointer.active) {
        const last = trail[trail.length - 1]
        if (!last || time - last.t > 16) {
          trail.push({ x: pointer.x, y: pointer.y, t: time })
        }
      }
      const trailLimit = (SHRINK_HOLD + SHRINK_RELEASE) * 1000
      while (trail.length > 0 && time - trail[0].t > trailLimit) trail.shift()

      const cols = Math.ceil(rect.width / width)
      const rows = Math.ceil(rect.height / height)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = col * width + cx + x
          const py = row * height + cy + y
          const distance = Math.hypot(px - massX, py - massY) / MASS_RADIUS
          let swell = 0
          if (!mobile.matches && distance < 1) {
            const edge = 1 - distance
            swell = edge * edge * (3 - 2 * edge)
          }

          let shrink = 0
          for (const sample of trail) {
            const age = (time - sample.t) / 1000
            const hoverDistance = Math.hypot(px - sample.x, py - sample.y) / SHRINK_RADIUS
            if (hoverDistance >= 1) continue
            const edge = 1 - hoverDistance
            let amount = edge * edge
            if (age > SHRINK_HOLD) amount *= 1 - (age - SHRINK_HOLD) / SHRINK_RELEASE
            if (amount > shrink) shrink = amount
          }

          const full = cr * (REST_RADIUS + swell * PEAK_GROWTH)
          const radius = full + (cr * 0.42 - full) * shrink

          const dark = document.documentElement.classList.contains("dark")
          const color = dark ? { r: 186, g: 186, b: 186 } : DOT_COLOR

          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.34 + swell * 0.46})`
          ctx.beginPath()
          ctx.arc(px, py, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const shouldLoop = () =>
      !mobile.matches && (!reducedMotion.matches || pointer.active || trail.length > 0)

    const tick = (time: number) => {
      draw(time)
      frame = shouldLoop() ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const resize = () => {
      draw(performance.now())
      start()
    }

    const onMove = (event: PointerEvent) => {
      if (!finePointer.matches || mobile.matches) return
      const bounds = parent.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = true
      start()
    }

    const onLeave = () => {
      pointer.active = false
      start()
    }

    const themeObserver = new MutationObserver(() => {
      draw(performance.now())
      start()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    parent.addEventListener("pointermove", onMove)
    parent.addEventListener("pointerleave", onLeave)
    resize()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      observer.disconnect()
      themeObserver.disconnect()
      parent.removeEventListener("pointermove", onMove)
      parent.removeEventListener("pointerleave", onLeave)
    }
  }, [width, height, x, y, cx, cy, cr])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  )
}

function StaticDotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}: DotPatternProps) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const dots = Array.from(
    {
      length:
        Math.ceil(dimensions.width / width) *
        Math.ceil(dimensions.height / height),
    },
    (_, i) => {
      const col = i % Math.ceil(dimensions.width / width)
      const row = Math.floor(i / Math.ceil(dimensions.width / width))
      return {
        x: col * width + cx + x,
        y: row * height + cy + y,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      }
    }
  )

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
        className
      )}
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((dot) => (
        <motion.circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={cr}
          fill={glow ? `url(#${id}-gradient)` : "currentColor"}
          initial={glow ? { opacity: 0.4, scale: 1 } : {}}
          animate={
            glow
              ? {
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.5, 1],
                }
              : {}
          }
          transition={
            glow
              ? {
                  duration: dot.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: dot.delay,
                  ease: "easeInOut",
                }
              : {}
          }
        />
      ))}
    </svg>
  )
}

export function DotPattern(props: DotPatternProps) {
  if (props.interactive) {
    return (
      <InteractiveDotField
        width={props.width}
        height={props.height}
        x={props.x}
        y={props.y}
        cx={props.cx}
        cy={props.cy}
        cr={props.cr}
        className={props.className}
      />
    )
  }

  return <StaticDotPattern {...props} />
}
