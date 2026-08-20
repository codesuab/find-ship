import { CobeGlobe } from '@/components/partials/cobe-globe';
import { LogoCloud } from '@/components/partials/clientLogo/logo-cloud';
import SlideUpButton from '@/components/slideup-button';
import { Skeleton } from '@/components/ui/skeleton';
import { featureCard, featureCardOneState } from '@/constant/ui';
import { PageProps } from '@/types/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Ship } from 'lucide-react';
import { GiShipBow } from 'react-icons/gi';
import { FaShip } from 'react-icons/fa';
import { motion, useScroll, useTransform, Variants } from 'motion/react';
import { BsDatabaseFillCheck } from 'react-icons/bs';
import { useRef } from 'react';
import { RiArrowRightSFill } from 'react-icons/ri';
import { PricingSection } from '@/components/partials/price/pricing-section';
import BlogBlock from '@/components/partials/blog';
import { TestimonialsSection } from '@/components/partials/testimonials-section';
import AppLayout from '@/Layouts/AppLayout';

export default function home() {
    const { name: appName, auth } = usePage<PageProps>().props;
    const heroRef = useRef(null);
    const user = auth?.user;

    // scroll
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    // hero dashboard image animation
    const scale = useTransform(scrollYProgress, [0, 1.1], [1, 0.5]);
    return (
        <AppLayout key="home">
            {/* seo */}
            <Head>
                <title>Smart vessel finder</title>
            </Head>

            <main className="w-full">
                {/* hero --------- */}
                <section
                    className="relative overflow-hidden overflow-y-hidden pt-25 after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-50 after:w-full after:bg-linear-to-t after:from-white after:to-transparent after:content-[''] md:pt-40 md:after:h-100"
                    ref={heroRef}
                >
                    <div className="z-1 container flex flex-col items-center justify-center">
                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                                scaleX: 0.9,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scaleX: 1,
                                filter: 'blur(0)',
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="mx-auto w-full text-center text-[40px] leading-10 font-medium capitalize md:w-[80%] md:text-[64px] md:leading-15"
                        >
                            Smarter{' '}
                            <span className="font-highlight font-bold text-primary">
                                Arrival
                            </span>{' '}
                            <span className="font-highlight font-medium text-foreground">
                                &
                            </span>{' '}
                            <span className="font-highlight font-bold text-primary">
                                Departure
                            </span>{' '}
                            Management for Modern Ports
                        </motion.h1>

                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 20,
                                scaleX: 0.9,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scaleX: 1,
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="mx-auto mt-4 w-full text-center text-base font-normal text-muted-foreground md:w-[60%]"
                        >
                            Digitize vessel movements, automate operational
                            workflows, monitor port traffic, and manage maritime
                            data with speed, accuracy, and confidence.
                        </motion.p>

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                                scaleX: 0.9,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scaleX: 1,
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.2,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="mx-auto mt-15 flex w-10/12 flex-col items-stretch gap-3 md:w-fit md:flex-row md:items-center"
                        >
                            <SlideUpButton
                                onClick={() =>
                                    router.get(
                                        user
                                            ? route('app.dashboard')
                                            : route('login'),
                                    )
                                }
                                className="w-full md:w-fit"
                            >
                                Start Free Trial
                            </SlideUpButton>
                            <SlideUpButton className="w-full bg-foreground text-white hover:bg-primary md:w-fit">
                                See How It Works
                            </SlideUpButton>
                        </motion.div>

                        <motion.img
                            style={{ scale }}
                            initial={{
                                opacity: 0,
                                y: 20,
                                scaleX: 0.9,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scaleX: 1,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.3,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            src="/media/system/dashboard.avif"
                            alt="find ship app"
                            className="mt-10"
                        />
                    </div>
                    {/* hero bg */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -50,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.3,
                            ease: 'linear',
                        }}
                        className="pointer-events-none absolute top-0 -right-1/4 -left-1/4 -z-1 flex h-full min-w-full items-end justify-center overflow-clip select-none"
                    >
                        <img
                            src="/media/system/banner-bg.avif"
                            className="w-[90%]"
                        />
                    </motion.div>
                </section>

                {/* logo cloud */}
                <motion.section
                    initial={{
                        opacity: 0,
                        y: 20,
                        scaleX: 0.9,
                        filter: 'blur(5px)',
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scaleX: 1,
                        filter: 'blur(0)',
                    }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut',
                    }}
                    viewport={{ once: true }}
                    className="relative mx-auto mb-25 max-w-5xl"
                >
                    <LogoCloud />
                </motion.section>

                {/* why choice */}
                <section className="container mb-25">
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 20,
                            scaleX: 0.9,
                            filter: 'blur(5px)',
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            scaleX: 1,
                            filter: 'blur(0)',
                        }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeInOut',
                        }}
                        viewport={{ once: true }}
                        className="text-gradient-up mx-auto w-full text-center text-3xl font-medium md:w-[70%] md:text-5xl"
                    >
                        Smarter vessel operations, from arrival to departure
                    </motion.h1>

                    <div className="mx-auto mt-10 grid max-w-[90%] grid-cols-1 gap-5 md:mt-14 md:grid-cols-3">
                        {featureCard.map((val, i) => (
                            <div key={i}>
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                        scaleX: 0.9,
                                        filter: 'blur(5px)',
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        scaleX: 1,
                                        filter: 'blur(0)',
                                    }}
                                    transition={{
                                        delay: i * 0.3,
                                        duration: 0.4,
                                        ease: 'easeInOut',
                                    }}
                                    viewport={{ once: true }}
                                    className={`${val.id == 2 ? 'bg-linear-to-t from-primary/10 to-white' : 'bg-linear-to-t from-accent to-[#fafafa]'} relative max-h-75 overflow-hidden rounded-xl border border-border/40 p-4`}
                                >
                                    <motion.p className="text-sm font-medium text-foreground capitalize">
                                        {val.short}
                                    </motion.p>

                                    {val.id == 1 && (
                                        <div className="mt-2 flex flex-col gap-1 p-2">
                                            {featureCardOneState.map(
                                                (val, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-full rounded-lg border border-border/40 bg-white p-3 duration-500 hover:translate-x-5"
                                                    >
                                                        <h1 className="text-sm font-bold text-foreground">
                                                            {val.imo}
                                                        </h1>

                                                        <div className="mt-2 flex items-center justify-between gap-1">
                                                            <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                                                                {val.from.short}
                                                            </span>

                                                            <div className="flex w-full items-center gap-px">
                                                                <div
                                                                    className="border border-dotted border-muted-foreground"
                                                                    style={{
                                                                        width:
                                                                            val.position +
                                                                            '%',
                                                                    }}
                                                                />

                                                                <div className="min-w-fit">
                                                                    <Ship
                                                                        size={
                                                                            18
                                                                        }
                                                                        className="text-primary"
                                                                    />
                                                                </div>

                                                                <div className="flex w-full items-center">
                                                                    <div className="w-full border border-muted-foreground" />
                                                                    <RiArrowRightSFill
                                                                        size={
                                                                            18
                                                                        }
                                                                        className="-ml-2 min-w-fit"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium">
                                                                {val.to.short}
                                                            </span>
                                                        </div>

                                                        <div className="mt-1 flex items-center justify-between">
                                                            <p className="text-xs font-medium text-muted-foreground">
                                                                {val.from.full}
                                                            </p>
                                                            <p className="text-xs font-medium text-muted-foreground">
                                                                {val.to.full}
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <p className="text-[10px] font-medium text-muted-foreground">
                                                                {val.from_date}
                                                            </p>
                                                            <p className="text-[10px] font-medium text-muted-foreground">
                                                                {val.to_date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}

                                    {val.id == 2 && (
                                        <div className="w-full">
                                            <CobeGlobe />
                                        </div>
                                    )}

                                    {val.id == 3 && (
                                        <div className="mt-2 flex flex-col gap-1 p-2">
                                            {Array.from({ length: 5 }).map(
                                                (_, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex w-full items-center gap-3 rounded-lg border border-border/80 p-2.5 duration-500 hover:translate-x-5"
                                                    >
                                                        <Skeleton
                                                            className={`min-h-8 min-w-8 rounded-lg bg-muted-foreground/20 ${
                                                                index === 1
                                                                    ? 'rounded-full'
                                                                    : index ===
                                                                        2
                                                                      ? 'rounded-md'
                                                                      : ''
                                                            }`}
                                                        />

                                                        <div className="space-y-2">
                                                            <Skeleton
                                                                className={`h-2 bg-muted-foreground/20 ${
                                                                    index === 0
                                                                        ? 'w-50'
                                                                        : index ===
                                                                            1
                                                                          ? 'w-42'
                                                                          : index ===
                                                                              2
                                                                            ? 'w-48'
                                                                            : index ===
                                                                                3
                                                                              ? 'w-36'
                                                                              : 'w-44'
                                                                }`}
                                                            />

                                                            <Skeleton
                                                                className={`h-2 bg-muted-foreground/20 ${
                                                                    index === 0
                                                                        ? 'w-45'
                                                                        : index ===
                                                                            1
                                                                          ? 'w-32'
                                                                          : index ===
                                                                              2
                                                                            ? 'w-40'
                                                                            : index ===
                                                                                3
                                                                              ? 'w-28'
                                                                              : 'w-36'
                                                                }`}
                                                            />
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </motion.div>

                                <div className="mt-5">
                                    <h2 className="mb-2 text-[18px] font-semibold text-foreground">
                                        {val.title}
                                    </h2>

                                    <p className="text-sm font-normal text-muted-foreground">
                                        {val.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* oen tools can do all */}
                <section className="bg-accent py-25">
                    <div className="container">
                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                                scaleX: 0.9,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scaleX: 1,
                                filter: 'blur(0)',
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-gradient-up mx-auto w-full text-center text-3xl font-medium md:w-1/2 md:text-5xl"
                        >
                            The only tool that works for itself
                        </motion.h1>

                        <div className="mt-10 flex flex-col items-center gap-10 md:mt-14 md:flex-row md:gap-15">
                            {/* image */}
                            <div className="w-full md:w-[60%]">
                                <motion.img
                                    initial={{
                                        opacity: 0,
                                        y: 30,
                                        scaleX: 0.9,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        scaleX: 1,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: 'easeInOut',
                                    }}
                                    viewport={{ once: true }}
                                    src="/media/system/choice-1.avif"
                                    alt="find ship"
                                    className="max-h-140 w-full rounded-3xl object-cover"
                                />
                            </div>
                            {/* tab */}
                            <div className="w-full md:w-[40%]">
                                {[
                                    {
                                        icon: (
                                            <FaShip
                                                size={18}
                                                className="text-primary"
                                            />
                                        ),
                                        title: 'Track vessel arrivals',
                                        description:
                                            'Get real-time vessel ETAs, arrival schedules, and port activity in one place to stay ahead of every incoming vessel.',
                                    },
                                    {
                                        icon: (
                                            <GiShipBow
                                                size={18}
                                                className="text-primary"
                                            />
                                        ),
                                        title: 'Manage vessel departures',
                                        description:
                                            'Monitor departure schedules, vessel movements, and operational updates to keep port operations running smoothly.',
                                    },
                                    {
                                        icon: (
                                            <BsDatabaseFillCheck
                                                size={18}
                                                className="text-primary"
                                            />
                                        ),
                                        title: 'Centralize vessel data',
                                        description:
                                            'Access vessel details, movement history, schedules, and operational data from one centralized platform.',
                                    },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
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
                                            delay: i * 0.3,
                                            duration: 0.4,
                                            ease: 'easeInOut',
                                        }}
                                        className="mb-4 border-b-2 border-border pb-4 duration-300 hover:border-b-primary"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-linear-to-b from-primary/10 to-primary/5">
                                                {item.icon}
                                            </div>

                                            <h1 className="text-xl font-medium text-foreground">
                                                {item.title}
                                            </h1>
                                        </div>

                                        <p className="mt-3 text-base text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* price */}
                <section className="py-30">
                    <div className="container">
                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                                scaleX: 0.9,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scaleX: 1,
                                filter: 'blur(0)',
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-gradient-up mx-auto w-full text-center text-3xl font-medium md:w-1/2 md:text-5xl"
                        >
                            Flexible plans that grow with you
                        </motion.h1>
                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 20,
                                scaleX: 0.9,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scaleX: 1,
                                filter: 'blur(0)',
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.2,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="mx-auto mt-3 w-full text-center text-base font-medium text-muted-foreground md:w-[40%]"
                        >
                            Use Inbox individually or upgrade to link more
                            accounts and add seats for your team members. No
                            hidden fees.
                        </motion.p>

                        <div className="mt-10 md:mt-14">
                            <PricingSection />
                        </div>
                    </div>
                </section>

                {/* blog */}
                <section className="pb-25">
                    <div className="container">
                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                                scaleX: 0.9,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scaleX: 1,
                                filter: 'blur(0)',
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-gradient-up mx-auto w-full text-center text-3xl font-medium md:w-1/2 md:text-5xl"
                        >
                            Stories from the team building {appName}
                        </motion.h1>

                        <div className="mt-10 md:mt-14">
                            <BlogBlock />
                        </div>
                    </div>
                </section>

                {/* testimonial */}
                <section className="pb-25">
                    <div className="container">
                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                                scaleX: 0.9,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scaleX: 1,
                                filter: 'blur(0)',
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-gradient-up mx-auto w-full text-center text-3xl font-medium md:w-1/2 md:text-5xl"
                        >
                            Trusted by teams who lead people
                        </motion.h1>

                        <div className="mt-10 md:mt-14">
                            <TestimonialsSection />
                        </div>
                    </div>
                </section>
            </main>
        </AppLayout>
    );
}
