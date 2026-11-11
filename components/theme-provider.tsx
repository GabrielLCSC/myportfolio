"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const dark = mounted && resolvedTheme === "dark"

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={dark}
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      aria-keyshortcuts="D"
      className="fixed top-5 right-5 z-50 flex h-8 w-14 items-center rounded-full border p-1 backdrop-blur-md"
      initial={false}
      animate={{
        backgroundColor: dark ? "rgba(10, 10, 10, 0.8)" : "rgba(255, 255, 255, 0.8)",
        borderColor: dark ? "rgb(38, 38, 38)" : "rgb(229, 229, 229)",
      }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
    >
      <motion.span
        className="size-6 rounded-full"
        initial={false}
        animate={{
          x: dark ? 24 : 0,
          backgroundColor: dark ? "#ffffff" : "#0a0a0a",
        }}
        transition={{ type: "spring", stiffness: 520, damping: 28, mass: 0.7 }}
      />
    </motion.button>
  )
}

export { ThemeProvider, ThemeToggle }
