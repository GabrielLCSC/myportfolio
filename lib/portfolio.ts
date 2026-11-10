export const profile = {
  name: "Gabriel Dautreppe",
  availability: "Passionné par le création d'outils digitaux",
  headline: "Développeur web.",
  lead: "Intégrations de sites vitrines pour différentes marques, maintenabilité et scalabilité du Routard.com, et création d'un produit SaaS de A à Z.",
  email: "gabriel.dautreppe@gmail.com",
}

export const words = ["l’agence.", "le média.", "le produit."]

export const navigation = [
  { href: "#accueil", label: "Accueil" },
  { href: "#projets", label: "Projets" },
  { href: "#parcours", label: "Parcours" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
] as const

export const socials = [
  { name: "GitHub", href: "https://github.com/GabrielLCSC" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/gabriel-dautreppe-iim/" },
  { name: "Email", href: "mailto:gabriel.dautreppe@gmail.com" },
] as const

export const stats = [
  { value: 3, label: "ans à développer" },
  { value: 1923, label: "contributions" },
  { value: 1, label: "SaaS en cours" },
]

export const projects = [
  {
    name: "Routard.com",
    description:
      "Maintenance, travail sur la performance et la scalabilité du site, avec une dimension Devops sur GCP.",
    href: "https://www.routard.com",
    cta: "Voir le site",
    className: "col-span-1 md:col-span-2",
    featured: true,
    icon: "browser",
  },
  {
    name: "SaaS",
    description:
      "Produit nouveau. Basé sur AWS avec un fort accent sur l'orchestration de jobs asynchrones. Mais shhht c'est un secret.",
    href: "#contact",
    cta: "Bientôt",
    className: "col-span-1",
    featured: false,
    icon: "cloud",
  },
  {
    name: "OOEO",
    description: "Maintenance et mises à jour du site de l’agence.",
    href: "https://ooeo.fr",
    cta: "Voir le site",
    className: "col-span-1",
    featured: false,
    icon: "building",
  },
  {
    name: "Unlockm",
    description: "Intégration du site pour un client de l’agence OOEO.",
    href: "https://unlockm.fr",
    cta: "Voir le site",
    className: "col-span-1",
    featured: false,
    icon: "code",
  },
  {
    name: "Amaclio",
    description: "Amélioration UX/UI pour un client de l’agence OOEO.",
    href: "https://amaclio.com",
    cta: "Voir le site",
    className: "col-span-1",
    featured: false,
    icon: "layers",
  },
] as const

export const experience = [
  {
    period: "2026 — aujourd’hui",
    role: "Entrepreneur",
    company: "SaaS",
    summary:
      "Je co-fonde et construis un produit nouveau, de A à Z. Plus à venir sur ce sujet.",
  },
  {
    period: "2024 — 2026",
    role: "Développeur",
    company: "Routard.com",
    summary:
      "Maintenance du site, travail en équipe tech, nouvelles fonctionnalités, et une dimension devops sur le cloud GCP.",
  },
  {
    period: "2023 — 2024",
    role: "Développeur",
    company: "OOEO Agency",
    summary:
      "Sites vitrines, surtout pour des clients B2B. Intégration et mises à jour, dont le site ooeo.fr.",
  },
]

export const terminalLines = [
  "git log --oneline",
  "2026  saas — front, back, cloud",
  "2024  routard.com — features et gcp",
  "2023  ooeo — sites vitrines b2b",
]

export const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Tailwind",
  "Motion",
  "Inngest",
  "Prisma",
  "Vercel",
  "AWS",
]

export const stackSecondary = [
  "GCP",
  "CI",
  "API",
  "Auth",
  "Observabilité",
  "Contenu",
]
