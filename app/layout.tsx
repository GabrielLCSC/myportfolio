import type { Metadata } from "next"
import { Geist_Mono, Figtree } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Portfolio Gabriel Dautreppe",
  description: "Mon parcours et mes expériences dans le développement de solutions web.",
  icons: {
    icon: [{ url: "/icons/logo_gab.png", type: "image/png" }],
    apple: [{ url: "/icons/logo_gab.png", type: "image/png" }],
  },
  openGraph: {
    title: "Portfolio Gabriel Dautreppe",
    description: "Mon parcours et mes expériences dans le développement de solutions web.",
    images: [
      {
        url: "/icons/logo_gab.png",
        alt: "Gabriel Dautreppe",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: ["/icons/logo_gab.png"],
  },
}

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth antialiased",
        fontMono.variable,
        "font-sans",
        figtree.variable
      )}
    >
      <body className="bg-white text-neutral-950">
        <ThemeProvider forcedTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  )
}
