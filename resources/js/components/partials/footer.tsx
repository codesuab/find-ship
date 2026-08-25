import { PageProps } from '@/types/types';
import { Link, usePage } from '@inertiajs/react';
import { motion, Variants } from 'motion/react';
import SlideUpButton from '../slideup-button';
import { ChevronRight } from 'lucide-react';
import Logo from '../Logo';
import { Button } from '../ui/button';
import { FaFacebookF } from 'react-icons/fa';

export default function Footer() {
    const { name: appName } = usePage<PageProps>().props;
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

    const linkGroups = [
        {
            title: 'Products',
            links: [
                { label: 'Workflow Engine', href: '#' },
                { label: 'Data Pipeline', href: '#' },
                { label: 'Analytics Suite', href: '#' },
            ],
        },
        {
            title: 'Learn',
            links: [
                { label: 'Tutorials', href: '#' },
                { label: 'Changelog', href: '#' },
                { label: 'API Docs', href: '#' },
            ],
        },
        {
            title: 'Support',
            links: [
                { label: 'FAQ', href: '#' },
                { label: 'Live Chat', href: '#' },
                { label: 'Status Page', href: '#' },
            ],
        },
    ];
    return (
        <footer className="bg-primary">
            <div className="container border-x border-border-light pt-10 pb-3 md:pt-25 md:pb-7">
                {/* cta */}
                <div className="mx-auto flex w-full flex-col items-center justify-center md:w-1/2">
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 20,
                            filter: 'blur(5px)',
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0)',
                        }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeInOut',
                        }}
                        viewport={{ once: true }}
                        className="mb-5 text-center text-4xl font-normal text-white md:text-5xl"
                    >
                        Smarter tracking. Faster decisions.
                    </motion.h1>
                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 20,
                            filter: 'blur(5px)',
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0)',
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.2,
                            ease: 'easeInOut',
                        }}
                        viewport={{ once: true }}
                        className="mb-8 text-center text-sm text-white"
                    >
                        {appName} brings vessel movements, port activity,
                        arrivals, departures, and maritime intelligence into one
                        place — so you always know what’s happening at sea.
                    </motion.p>
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                            filter: 'blur(5px)',
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0)',
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.4,
                            ease: 'easeInOut',
                        }}
                        viewport={{ once: true }}
                    >
                        <SlideUpButton>
                            Start your free trial{' '}
                            <ChevronRight className="size-5 text-foreground" />
                        </SlideUpButton>
                    </motion.div>
                </div>

                {/* footer */}
                <div className="mt-15 rounded-3xl bg-white p-5 md:p-15">
                    <div className="mb-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(10px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 0.1,
                                ease: 'easeOut',
                            }}
                            className="flex flex-col gap-6 lg:col-span-4"
                        >
                            <Logo imageSize="text-primary h-10" show={false} />
                            <motion.h1
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                    filter: 'blur(5px)',
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0)',
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: 'linear',
                                }}
                                viewport={{ once: true }}
                                className="text-2xl font-medium text-foreground"
                            >
                                A smarter maritime workspace for clear,
                                connected vessel intelligence
                            </motion.h1>

                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                            filter: 'blur(10px)',
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            filter: 'blur(0px)',
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.1,
                                            ease: 'easeOut',
                                        }}
                                    >
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            render={
                                                <a
                                                    href={'3'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                />
                                            }
                                            className="h-9 w-9 bg-muted text-foreground shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.5)] transition-colors outline-none hover:text-foreground dark:shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.1)]"
                                        >
                                            <FaFacebookF className="size-4 text-foreground" />
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                        {linkGroups.length > 0 && (
                            <div className="lg:col-span-8">
                                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
                                    {linkGroups.map((group, groupIndex) => (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                                filter: 'blur(10px)',
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                                filter: 'blur(0px)',
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.2 + groupIndex * 0.3,
                                                ease: 'easeOut',
                                            }}
                                            viewport={{ once: true }}
                                            key={groupIndex}
                                            className="flex flex-col gap-4"
                                        >
                                            <h4 className="text-sm font-semibold text-foreground">
                                                {group.title}
                                            </h4>
                                            <ul className="flex flex-col gap-3">
                                                {group.links.map(
                                                    (link, linkIndex) => (
                                                        <li key={linkIndex}>
                                                            <a
                                                                href={link.href}
                                                                className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                                            >
                                                                {link.label}
                                                            </a>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* copyright */}
                    <div className="relative mx-auto mt-0 flex items-center justify-center md:mt-10">
                        <div className="relative hidden overflow-hidden md:block">
                            <div className="flex items-end justify-center gap-4 pt-4 pb-0 tracking-widest md:gap-6">
                                <motion.span
                                    className="text-7xl leading-none font-bold text-primary/10 select-none sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[14rem]"
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ amount: 0.5, once: true }}
                                >
                                    {appName
                                        .split('')
                                        .map((char: string, index: number) => (
                                            <motion.span
                                                key={`${char}-${index}`}
                                                variants={characterVariants}
                                                className="inline-block"
                                            >
                                                {char === ' ' ? '\u00A0' : char}
                                            </motion.span>
                                        ))}
                                </motion.span>
                            </div>

                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent" />
                        </div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(10px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 0.4,
                                ease: 'easeOut',
                            }}
                            className="static bottom-0 flex w-full translate-y-5 flex-col items-center justify-center gap-2 pb-6 md:absolute md:translate-y-0 md:flex-row md:justify-between md:gap-1 md:px-12 md:pb-0"
                        >
                            <p className="text-sm text-muted-foreground">
                                © 2026 {appName}. All rights reserved.
                            </p>

                            <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                <Link
                                    href={'#'}
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Terms of Service
                                </Link>
                                <Link
                                    href={'#'}
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="border-y border-border-light">
                <div className="container border-x border-border-light py-5"></div>
            </div>
        </footer>
    );
}
