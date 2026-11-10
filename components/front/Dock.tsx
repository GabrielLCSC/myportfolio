"use client"

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
    Briefcase01Icon,
    GithubIcon,
    Home01Icon,
    Layers01Icon,
    Linkedin01Icon,
    Mail01Icon,
    Route01Icon,
} from "@hugeicons/core-free-icons"

import { navigation, socials } from "@/lib/portfolio"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Dock, DockIcon } from "@/components/ui/dock"
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const sectionIcons: Record<(typeof navigation)[number]["href"], IconSvgElement> =
{
    "#accueil": Home01Icon,
    "#projets": Briefcase01Icon,
    "#parcours": Route01Icon,
    "#stack": Layers01Icon,
    "#contact": Mail01Icon,
}

const socialIcons: Record<(typeof socials)[number]["name"], IconSvgElement> = {
    GitHub: GithubIcon,
    LinkedIn: Linkedin01Icon,
    Email: Mail01Icon,
}

function DockLink({
    href,
    label,
    icon,
    external = false,
    className,
}: {
    href: string
    label: string
    icon: IconSvgElement
    external?: boolean
    className?: string
}) {
    return (
        <DockIcon className={className}>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <a
                            href={href}
                            aria-label={label}
                            {...(external
                                ? { target: "_blank", rel: "noreferrer" }
                                : {})}
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "size-10 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-neutral-950"
                            )}
                        />
                    }
                >
                    <HugeiconsIcon icon={icon} size={18} />
                </TooltipTrigger>
                <TooltipContent>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </DockIcon>
    )
}

function SocialLinks({ className }: { className?: string }) {
    return socials.map((item) => (
        <DockLink
            key={item.name}
            href={item.href}
            label={item.name}
            icon={socialIcons[item.name]}
            external={item.name !== "Email"}
            className={className}
        />
    ))
}

export function SiteDock() {
    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-3">
            <nav aria-label="Sections du site" className="pointer-events-auto">
                <TooltipProvider>
                    <Dock
                        direction="middle"
                        className="mx-auto mt-0 w-max border-neutral-200 bg-white/80"
                    >
                        {navigation.map((item) => (
                            <DockLink
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                icon={sectionIcons[item.href]}
                            />
                        ))}
                        <Separator
                            orientation="vertical"
                            className="hidden h-full bg-neutral-200 sm:block"
                        />
                        <SocialLinks className="hidden sm:flex" />
                    </Dock>
                </TooltipProvider>
            </nav>
        </div>
    )
}
