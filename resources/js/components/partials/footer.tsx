import { type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { motion, Variants } from "motion/react"
import { Link, router } from '@inertiajs/react'
import { ChevronRight } from 'lucide-react'

export interface FooterLink {
    label: string
    href: string
}

export interface FooterLinkGroup {
    title: string
    links: FooterLink[]
}

export interface FooterSocialLink {
    icon: ReactNode
    href: string
    label: string
}

export interface FooterContactCta {
    icon: ReactNode
    title: string
    description: string
    href: string
}

export interface FooterProps {
    logo?: ReactNode
    brandName: string
    socialLinks?: FooterSocialLink[]
    contactCta?: FooterContactCta
    linkGroups?: FooterLinkGroup[]
    brandWatermark?: string
    copyright: string
    legalLinks?: FooterLink[]
}

export function Footer({
    logo,
    brandName,
    socialLinks = [],
    contactCta,
    linkGroups = [],
    brandWatermark,
    copyright,
    legalLinks = [],
}: FooterProps) {
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.3,
            },
        },
    };

    const characterVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -90,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 2,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };
    return (
        <motion.footer
            initial={{
                opacity: 0,
                y: 20,
                filter: "blur(10px)",
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
            }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="bg-linear-to-b from-primary/6 to-white w-full pb-10">
            <div
                className="mx-auto max-w-7xl px-6 pt-10 pb-6 md:px-12">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                            filter: 'blur(5px)',
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0)'
                        }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeInOut',
                        }}
                        className="flex items-center gap-2.5">
                        {logo && <div className="text-primary">{logo}</div>}
                        <span className="text-foreground text-lg font-semibold tracking-tight">
                            {brandName}
                        </span>
                    </motion.div>

                    <div className="flex items-center gap-5">
                        {socialLinks.length > 0 && (
                            <motion.div
                                className="flex items-center gap-2">
                                {socialLinks.map((link, index) => (
                                    <motion.div key={index}
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                            filter: 'blur(5px)',
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            filter: 'blur(0)'
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.2,
                                            ease: 'easeInOut',
                                        }}
                                    >
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            nativeButton={false}
                                            render={
                                                <a
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={link.label}
                                                />
                                            }
                                            className="text-foreground bg-muted hover:text-foreground h-9 w-9 shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.5)] transition-colors outline-none dark:shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.1)]"
                                        >
                                            {link.icon}
                                        </Button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 md:px-12">
                <Separator />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    {contactCta && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.2,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-6 lg:col-span-4">
                            <h3 className="text-foreground text-sm font-semibold">
                                Get in touch
                            </h3>

                            <div
                                className="group bg-white flex items-start gap-4 rounded-2xl border p-5 transition-colors"
                            >
                                <div className="bg-primary border-primary text-primary-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.5)]">
                                    {contactCta.icon}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
                                        {contactCta.title}
                                    </span>
                                    <span className="text-muted-foreground text-xs leading-relaxed">
                                        {contactCta.description}
                                    </span>

                                    <motion.div
                                        initial="rest"
                                        whileHover="hover"
                                        className="inline-flex cursor-pointer"
                                        onClick={() => router.visit('/contact-us')}
                                    >
                                        <span className="relative inline-block h-5 overflow-hidden">
                                            {/* Width reserve */}
                                            <span className="invisible inline-flex items-center whitespace-nowrap">
                                                Connect with our team
                                                <ChevronRight size={14} />
                                            </span>

                                            <motion.span
                                                variants={{
                                                    rest: { y: 0, opacity: 1 },
                                                    hover: { y: "-100%", opacity: 0 },
                                                }}
                                                transition={{
                                                    duration: 0.35,
                                                    ease: [0.4, 0, 0.2, 1],
                                                }}
                                                className="absolute left-0 top-0 inline-flex items-center text-sm font-medium whitespace-nowrap capitalize"
                                            >
                                                Contact Us
                                                <ChevronRight size={14} />
                                            </motion.span>

                                            <motion.span
                                                variants={{
                                                    rest: { y: "100%", opacity: 0 },
                                                    hover: { y: 0, opacity: 1 },
                                                }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: [0.4, 0, 0.2, 1],
                                                }}
                                                className="absolute left-0 top-0 inline-flex items-center text-sm font-medium whitespace-nowrap capitalize text-primary"
                                            >
                                                Connect with our team
                                                <ChevronRight size={14} />
                                            </motion.span>
                                        </span>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {linkGroups.length > 0 && (
                        <div className={contactCta ? 'lg:col-span-8' : 'lg:col-span-12'}>
                            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
                                {linkGroups.map((group, groupIndex) => (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                            filter: 'blur(5px)',
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            filter: 'blur(0)'
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.2 + groupIndex * 0.2,
                                            ease: 'easeInOut',
                                        }}
                                        viewport={{ once: true }}
                                        key={groupIndex} className="flex flex-col gap-4">
                                        <h4 className="text-foreground text-sm font-semibold">
                                            {group.title}
                                        </h4>
                                        <ul className="flex flex-col gap-3">
                                            {group.links.map((link, linkIndex) => (
                                                <motion.li
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                        filter: 'blur(5px)',
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                        filter: 'blur(0)'
                                                    }}
                                                    transition={{
                                                        duration: 0.4,
                                                        delay: 0.4 + groupIndex * 0.2,
                                                        ease: 'easeInOut',
                                                    }}
                                                    viewport={{ once: true }}
                                                    key={linkIndex}>
                                                    <a
                                                        href={link.href}
                                                        className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                                    >
                                                        {link.label}
                                                    </a>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 md:px-12 mt-10 md:mt-0">
                {brandWatermark && (
                    <div className="relative overflow-hidden hidden md:block">
                        <div className="flex items-end justify-center gap-4 pt-4 pb-0 tracking-widest md:gap-6">

                            <motion.span
                                className="text-muted text-7xl leading-none font-bold select-none sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[14rem]"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ amount: 0.5, once: true }}
                            >
                                {brandWatermark.split("").map((char: string, index: number) => (
                                    <motion.span
                                        key={`${char}-${index}`}
                                        variants={characterVariants}
                                        className="inline-block"
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.span>
                        </div>

                        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t to-transparent" />
                    </div>
                )}
                <div className="absolute bottom-0 flex w-full translate-y-5 flex-col items-center justify-between gap-1 px-12 sm:translate-y-0 sm:flex-row">
                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 20,
                            filter: 'blur(5px)',
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0)'
                        }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeInOut',
                        }}
                        viewport={{ once: true }}
                        className="text-muted-foreground text-sm">{copyright}</motion.p>

                    {legalLinks.length > 0 && (
                        <motion.div
                            className="flex flex-wrap items-center gap-2 md:gap-4">
                            {legalLinks.map((link, index) => (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                        filter: 'blur(5px)',
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        filter: 'blur(0)'
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.2 + index * 0.2,
                                        ease: 'easeInOut',
                                    }}
                                    viewport={{ once: true }}
                                    key={index}
                                >
                                    <a
                                        href={link.href}
                                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.footer>
    )
}
