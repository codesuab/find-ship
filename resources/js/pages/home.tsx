import { CobeGlobe } from '@/components/partials/cobe-globe';
import { LogoCloud } from '@/components/partials/clientLogo/logo-cloud';
import SlideUpButton from '@/components/slideup-button';
import { Skeleton } from '@/components/ui/skeleton';
import { featureCard, featureCardOneState } from '@/constant/ui';
import { PageProps } from '@/types/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Anchor,
    CalendarClockIcon,
    ChartPieIcon,
    CheckCircle2,
    ChevronRight,
    Clock,
    Plus,
    Search,
    Ship,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { RiArrowRightSFill } from 'react-icons/ri';
import { PricingSection } from '@/components/partials/price/pricing-section';
import AppLayout from '@/Layouts/AppLayout';
import { FaStar } from 'react-icons/fa6';
import SectionHeader from '@/components/SectionHeader';
import AnimatedRocket from '@/components/icon/AnimatedRocket';
import AnimatedUsers from '@/components/icon/AnimatedUsers';
import { ScrollRevealText } from '@/components/ScrollRevealText';
import StatNumber from '@/components/StatNumber';
import { FloatingCard } from '@/components/FloatingCardProps ';
import { HiLocationMarker } from 'react-icons/hi';
import AnimatedFlame from '@/components/icon/AnimatedFlame';
import { AnimatedNewspaper } from '@/components/icon/AnimatedNewspaper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Faq from '@/components/partials/Faq';
import InfiniteQuestionBadge from '@/components/icon/InfiniteQuestionBadge';
import Logo from '@/components/Logo';
import HighlightedText from '@/components/highlighted-text';

export default function home() {
    const { name: appName, auth } = usePage<PageProps>().props;
    const heroRef = useRef(null);
    const user = auth?.user;
    return (
        <AppLayout key="home">
            {/* seo */}
            <Head>
                <title>Smart vessel finder</title>
            </Head>

            {/* hero --------- */}
            <section className="bg-primary" ref={heroRef}>
                <div className="relative z-1 container flex flex-col items-center justify-center border-x border-border-light py-10 md:py-30">
                    <div className="mx-auto flex w-full flex-col items-center justify-center space-y-5 md:w-[80%]">
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
                                ease: 'linear',
                            }}
                            viewport={{ once: true }}
                            className="mx-auto w-fit rounded-full border border-border-light bg-border-light px-4 py-1 text-sm font-light text-white md:text-base"
                        >
                            Smarter Vessel Management
                        </motion.p>

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
                            className="mx-auto w-full text-center text-[30px] leading-10 font-medium text-white capitalize md:w-[80%] md:text-[60px] md:leading-16 md:font-semibold"
                        >
                            The workspace for smarter vessel & port management.
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
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: 'linear',
                            }}
                            viewport={{ once: true }}
                            className="mx-auto w-full text-center text-sm font-normal text-muted md:w-1/2 md:text-base"
                        >
                            Track every vessel with precision. Manage port
                            operations effortlessly. Monitor traffic and
                            maritime activity. Make faster, smarter decisions.
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
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.2,
                                ease: 'linear',
                            }}
                            viewport={{ once: true }}
                            className="mx-auto flex w-10/12 flex-col items-stretch gap-3 md:w-fit md:flex-row md:items-center"
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
                            <SlideUpButton
                                variant="secondary"
                                className="w-full md:w-fit"
                            >
                                Explore features
                            </SlideUpButton>
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.3,
                                ease: 'linear',
                            }}
                            viewport={{ once: true }}
                            className="mt-3 flex items-center gap-2"
                        >
                            <div className="flex items-center gap-1 text-white">
                                <FaStar className="size-3" />
                                <FaStar className="size-3" />
                                <FaStar className="size-3" />
                                <FaStar className="size-3" />
                                <FaStar className="size-3" />
                            </div>
                            <span className="h-7 w-px bg-white/30"></span>
                            <p className="text-sm text-white">
                                Trusted by maritime teams
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* logo cloud */}
            <section className="border-b border-border">
                <div className="relative container border-x border-border py-5">
                    <div className="relative mx-auto max-w-5xl">
                        <LogoCloud />
                    </div>
                </div>
            </section>

            {/* short about us */}
            <section className="border-b border-border">
                <div className="relative container border-x border-border py-10 md:py-15">
                    <SectionHeader
                        tag={{
                            title: 'About Company',
                            icon: AnimatedUsers,
                            iconSize: 'size-4 text-primary',
                            position: 'left',
                        }}
                    />
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.4,
                            ease: 'linear',
                        }}
                        className="mt-10 w-full max-w-[85%]"
                    >
                        <ScrollRevealText
                            className="text-[25px] leading-9 font-normal text-foreground md:text-[32px] md:leading-11"
                            text="ShipFinder helps you track and discover vessels with
                        reliable maritime data. We make vessel information,
                        locations, arrivals, departures, and port activity
                        easier to access—helping businesses and maritime
                        professionals make faster, smarter decisions."
                        />
                    </motion.div>

                    <div className="mt-15 grid max-w-150 grid-cols-1 gap-5 md:grid-cols-3">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'linear',
                            }}
                        >
                            <StatNumber
                                value={500}
                                suffix="+"
                                label="Vessels tracked"
                            />
                        </motion.div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.2,
                                ease: 'linear',
                            }}
                        >
                            <StatNumber
                                value={25}
                                suffix="+"
                                label="Ports monitored"
                            />
                        </motion.div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.4,
                                ease: 'linear',
                            }}
                        >
                            <StatNumber
                                value={10000}
                                suffix="+"
                                label="Vessel movements"
                            />
                        </motion.div>
                    </div>

                    {/* floating cards */}
                    <FloatingCard
                        rotate={14}
                        className="absolute top-30 right-5 hidden bg-linear-to-r from-purple-400 to-purple-300 md:block"
                    >
                        Vessel Tracking
                    </FloatingCard>

                    <FloatingCard
                        rotate={-14}
                        className="absolute top-53 right-5 hidden bg-linear-to-r from-orange-400 to-yellow-300 md:block"
                    >
                        Port Monitoring
                    </FloatingCard>

                    <FloatingCard
                        rotate={14}
                        className="absolute top-77 right-10 hidden bg-linear-to-r from-rose-400 to-orange-300 md:block"
                    >
                        Port Activity
                    </FloatingCard>

                    <FloatingCard
                        rotate={14}
                        className="absolute top-100 right-5 hidden bg-linear-to-r from-blue-400 to-indigo-300 md:block"
                    >
                        Live Vessel Data
                    </FloatingCard>

                    <FloatingCard
                        rotate={14}
                        className="absolute top-100 right-50 hidden bg-linear-to-r from-sky-400 to-cyan-300 md:block"
                    >
                        Arrival & Departure
                    </FloatingCard>

                    <FloatingCard
                        rotate={-14}
                        className="absolute top-78 right-50 hidden bg-linear-to-r from-emerald-400 to-teal-300 md:block"
                    >
                        Maritime Intelligence
                    </FloatingCard>
                </div>
            </section>

            {/* why choice */}
            <section className="container py-10 md:py-25">
                <SectionHeader
                    title="Built Smarter"
                    subtitle={` Businesses choose ${appName} because it simplifies the
                    complexity of vessel management.`}
                    tag={{
                        title: 'Power Pack',
                        icon: AnimatedRocket,
                        iconSize: 'size-4',
                    }}
                />

                <div className="mx-auto mt-10 grid max-w-[90%] grid-cols-1 gap-5 md:mt-14 md:grid-cols-3">
                    {featureCard.map((val, i) => (
                        <div key={i}>
                            <div
                                className={`${val.id == 2 ? 'bg-linear-to-t from-primary/10 to-white' : 'bg-linear-to-t from-accent to-[#fafafa]'} relative max-h-75 overflow-hidden rounded-xl border border-border/40 p-4`}
                            >
                                <motion.p className="text-sm font-medium text-foreground capitalize">
                                    {val.short}
                                </motion.p>

                                {val.id == 1 && (
                                    <div className="mt-2 flex flex-col gap-1 p-2">
                                        {featureCardOneState.map(
                                            (val, index) => (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: 30,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.4,
                                                        delay: 0.1 * index,
                                                        ease: 'easeIn',
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                        amount: 0.1,
                                                    }}
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
                                                                    size={18}
                                                                    className="text-primary"
                                                                />
                                                            </div>

                                                            <div className="flex w-full items-center">
                                                                <div className="w-full border border-muted-foreground" />
                                                                <RiArrowRightSFill
                                                                    size={18}
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
                                                </motion.div>
                                            ),
                                        )}
                                    </div>
                                )}

                                {val.id == 2 && (
                                    <div className="h-100 w-100 z-1">
                                        <CobeGlobe />
                                    </div>
                                )}

                                {val.id == 3 && (
                                    <div className="mt-2 flex flex-col gap-1 p-2">
                                        {Array.from({ length: 5 }).map(
                                            (_, index) => (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: 30,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.4,
                                                        delay: 0.1 * index,
                                                        ease: 'easeIn',
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                        amount: 0.1,
                                                    }}
                                                    key={index}
                                                    className="flex w-full items-center gap-3 rounded-lg border border-border/80 p-2.5 duration-500 hover:translate-x-5"
                                                >
                                                    <Skeleton
                                                        className={`min-h-8 min-w-8 rounded-lg bg-muted-foreground/20 ${
                                                            index === 1
                                                                ? 'rounded-full'
                                                                : index === 2
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
                                                </motion.div>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>

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
            <section className="bg-primary">
                <div className="container space-y-10 border-x border-border-light py-10 md:space-y-20 md:py-25">
                    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-15">
                        <div>
                            <h1 className="text-3xl font-medium text-white">
                                Smarter Vessel Intelligence
                            </h1>
                            <p className="mt-3 text-base text-white/60">
                                Give your team the visibility they need to track
                                vessels, monitor ports, and make faster maritime
                                decisions.
                            </p>
                            <ul className="mt-10 space-y-3 text-white">
                                <li className="flex items-center gap-3 text-lg font-normal">
                                    <CheckCircle2 className="size-5" />
                                    <span>
                                        Track vessels in real time with accurate
                                        position and movement data
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-lg font-normal">
                                    <CheckCircle2 className="size-5" />
                                    <span>
                                        Monitor port activity, arrivals, and
                                        departures from one place
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-lg font-normal">
                                    <CheckCircle2 className="size-5" />
                                    <span>
                                        Get actionable insights to plan
                                        operations with confidence
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {/* card */}
                        <div className="bg-liner-dev relative z-1 flex h-auto w-full items-center justify-center overflow-hidden rounded-2xl p-5">
                            <div className="w-[90%] py-12 md:w-[50%]">
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
                                        delay: 0.5,
                                        ease: 'linear',
                                    }}
                                    viewport={{ once: true }}
                                    className="shadow-light flex w-full items-center gap-2 rounded-2xl bg-white px-3 py-2.5"
                                >
                                    <Search className="size-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                        Search vessel, IMO, MMSI
                                    </span>
                                </motion.div>

                                <div className="relative">
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                            scaleX: 0.8,
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
                                            delay: 0.8,
                                            ease: 'linear',
                                        }}
                                        viewport={{ once: true }}
                                        className="z-2 mt-4 overflow-hidden rounded-2xl bg-white/30 p-1 backdrop-blur-3xl"
                                    >
                                        <div className="w-full rounded-xl bg-white p-3 duration-500">
                                            <h1 className="text-sm font-bold text-foreground">
                                                KM012026
                                            </h1>

                                            <div className="mt-2 flex items-center justify-between gap-1">
                                                <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                                                    SING
                                                </span>

                                                <div className="flex w-full items-center gap-px">
                                                    <div
                                                        className="border border-dotted border-muted-foreground"
                                                        style={{
                                                            width: 40 + '%',
                                                        }}
                                                    />

                                                    <div className="min-w-fit">
                                                        <Ship
                                                            size={18}
                                                            className="text-primary"
                                                        />
                                                    </div>

                                                    <div className="flex w-full items-center">
                                                        <div className="w-full border border-muted-foreground" />
                                                        <RiArrowRightSFill
                                                            size={18}
                                                            className="-ml-2 min-w-fit"
                                                        />
                                                    </div>
                                                </div>

                                                <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium">
                                                    CTG
                                                </span>
                                            </div>

                                            <div className="mt-1 flex items-center justify-between">
                                                <p className="text-xs font-medium text-muted-foreground">
                                                    Singapore
                                                </p>
                                                <p className="text-xs font-medium text-muted-foreground">
                                                    Chittagong
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-medium text-muted-foreground">
                                                    SEP 12, 2026
                                                </p>
                                                <p className="text-[10px] font-medium text-muted-foreground">
                                                    NOV 15, 2026
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -20,
                                            filter: 'blur(5px)',
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            filter: 'blur(0)',
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 1.3,
                                            ease: 'linear',
                                        }}
                                        viewport={{ once: true }}
                                        className="absolute top-1/2 left-1/2 -z-1 h-40 w-px -translate-1/2 border border-dashed border-primary-accent"
                                    ></motion.div>
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                            scaleX: 0.8,
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
                                            delay: 1,
                                            ease: 'linear',
                                        }}
                                        viewport={{ once: true }}
                                        className="relative mt-15 rounded-2xl bg-white/30 p-1 backdrop-blur-3xl"
                                    >
                                        <div className="w-full rounded-xl border border-dashed border-primary-accent bg-white p-3 duration-500">
                                            <div className="flex items-center gap-1">
                                                <HiLocationMarker />
                                                <span className="text-sm font-bold text-foreground">
                                                    Live Position
                                                </span>
                                            </div>
                                            <ul className="mt-4 ml-10 list-decimal space-y-1 text-sm">
                                                <li className="text-sm font-medium text-foreground">
                                                    12.4 kn · Heading 284°
                                                </li>
                                                <li className="text-sm font-medium text-foreground">
                                                    Singapore → Chittagong
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="absolute -top-2.5 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-primary-accent">
                                            <Plus className="size-3 text-white" />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                            <img
                                src="/media/system/noise.png"
                                className="absolute inset-0 -z-1 h-full w-full opacity-[0.04]"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-15">
                        <div className="bg-liner-dev relative z-1 order-1 flex h-auto w-full items-center justify-center overflow-hidden rounded-2xl p-5 md:order-0">
                            <div className="w-[90%] py-12 md:w-[50%]">
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
                                        delay: 0.5,
                                        ease: 'linear',
                                    }}
                                    viewport={{ once: true }}
                                    className="shadow-light flex w-full items-center gap-2 rounded-2xl bg-white px-3 py-2.5"
                                >
                                    <Search className="size-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                        Search port or destination
                                    </span>
                                </motion.div>

                                <div className="relative">
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                            scaleX: 0.8,
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
                                            delay: 0.8,
                                            ease: 'linear',
                                        }}
                                        viewport={{ once: true }}
                                        className="z-2 mt-4 overflow-hidden rounded-2xl bg-white/30 p-1 backdrop-blur-3xl"
                                    >
                                        <div className="w-full rounded-xl bg-white p-3 duration-500">
                                            <div className="flex items-center gap-2">
                                                <Anchor className="size-4" />
                                                <span className="text-sm font-bold text-foreground">
                                                    Chittagong Port
                                                </span>
                                            </div>

                                            <ul className="mt-4 ml-10 list-decimal space-y-1 text-sm">
                                                <li className="text-sm font-medium text-foreground">
                                                    18 vessels arriving today
                                                </li>
                                            </ul>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -20,
                                            filter: 'blur(5px)',
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            filter: 'blur(0)',
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 1.3,
                                            ease: 'linear',
                                        }}
                                        viewport={{ once: true }}
                                        className="absolute top-1/2 left-1/2 -z-1 h-40 w-px -translate-1/2 border border-dashed border-primary-accent"
                                    ></motion.div>

                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                            scaleX: 0.8,
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
                                            delay: 1,
                                            ease: 'linear',
                                        }}
                                        viewport={{ once: true }}
                                        className="relative mt-15 rounded-2xl bg-white/30 p-1 backdrop-blur-3xl"
                                    >
                                        <div className="w-full rounded-xl border border-dashed border-primary-accent bg-white p-3 duration-500">
                                            <div className="flex items-center gap-2">
                                                <ChartPieIcon className="size-4" />
                                                <span className="text-sm font-bold text-foreground">
                                                    Port Intelligence
                                                </span>
                                            </div>
                                            <ul className="mt-4 ml-10 list-decimal space-y-1 text-sm">
                                                <li className="text-sm font-medium text-foreground">
                                                    18 Arrivals · 11 Departures
                                                </li>
                                                <li className="text-sm font-medium text-foreground">
                                                    24 Vessels at Anchorage
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="absolute -top-2.5 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-primary-accent">
                                            <Plus className="size-3 text-white" />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                            <img
                                src="/media/system/noise.png"
                                className="absolute inset-0 -z-1 h-full w-full opacity-[0.04]"
                            />
                        </div>
                        <div className="order-0 md:order-1">
                            <h1 className="text-3xl font-medium text-white">
                                Maritime Intelligence, Simplified
                            </h1>
                            <p className="mt-3 text-base text-white/60">
                                Everything your team needs to understand vessel
                                movements and port activity—without the
                                busywork.
                            </p>
                            <ul className="mt-10 space-y-3 text-white">
                                <li className="flex items-center gap-3 text-lg font-normal">
                                    <CheckCircle2 className="size-5" />
                                    <span>Track vessels and movements</span>
                                </li>
                                <li className="flex items-center gap-3 text-lg font-normal">
                                    <CheckCircle2 className="size-5" />
                                    <span>Monitor ports and schedules</span>
                                </li>
                                <li className="flex items-center gap-3 text-lg font-normal">
                                    <CheckCircle2 className="size-5" />
                                    <span>
                                        Make faster operational decisions
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* price */}
            <section className="py-10 md:py-30">
                <div className="container">
                    <SectionHeader
                        title="Pick a plan. build smarter"
                        subtitle="Track vessels, monitor ports, and access the maritime intelligence you need—all in one simple platform."
                        tag={{
                            title: 'Pricing',
                            icon: AnimatedFlame,
                        }}
                    />

                    <div className="mx-auto mt-10 w-full md:mt-14 md:w-[90%]">
                        <PricingSection />
                    </div>
                </div>
            </section>

            {/* blog */}
            <section>
                <div className="w-full bg-primary">
                    <div className="container border-x border-border-light pt-10 pb-90 md:pt-25">
                        <SectionHeader
                            title="Insights for Smarter Maritime Operations"
                            subtitle="Explore vessel tracking insights, port updates, maritime intelligence, and practical guides to help you stay informed and make better shipping decisions."
                            tag={{
                                title: 'Blog',
                                icon: AnimatedNewspaper,
                                iconSize: 'size-4 text-white',
                                position: 'left',
                            }}
                            position="left"
                            color="white"
                        />
                    </div>
                </div>

                {/* feature blog */}
                <div className="container -mt-80">
                    <div className="group relative z-1 flex w-full flex-col items-center gap-5 overflow-hidden rounded-2xl bg-[#083247] p-3 md:flex-row md:gap-10">
                        <div className="w-full md:w-1/2">
                            <div className="h-70 w-full overflow-hidden rounded-xl md:h-130">
                                <img
                                    src="https://framerusercontent.com/images/eswOc5NMKv15gFLDITCiyll5OOk.jpg?scale-down-to=1024&width=904&height=1200"
                                    alt="find ship feature blog"
                                    className="h-full w-full object-cover duration-300 group-hover:scale-[1.1]"
                                />
                            </div>
                        </div>
                        <div className="w-full px-5 pb-3 md:w-1/2 md:px-0 md:pb-0">
                            <p className="text-base font-medium text-primary-100">
                                Featured Post
                            </p>
                            <h1 className="mt-2 w-full text-[30px] leading-9 font-normal text-white md:max-w-[60%] md:text-[35px] md:leading-10">
                                Why most teams are busy but not aligned
                            </h1>
                            <p className="mt-5 w-full text-sm text-muted md:max-w-[70%]">
                                Busyness and alignment look identical from the
                                outside, but they produce completely different
                                results. Here's how modern teams can close the
                                gap between activity and actual progress.
                            </p>

                            <Button
                                variant="link"
                                className="mt-5 p-0 text-base text-white underline md:mt-8"
                                size="lg"
                            >
                                Read more <ChevronRight className="size-4" />
                            </Button>
                        </div>

                        <Logo
                            className="absolute -top-20 -right-15 -z-1 opacity-8"
                            imageSize="w-100 h-100"
                            show={false}
                        />
                    </div>
                </div>

                {/* others */}
                <div className="container my-10">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        <div className="w-full overflow-hidden rounded-3xl">
                            <div className="relative h-61.5 w-full overflow-hidden rounded-2xl">
                                <img
                                    src="https://framerusercontent.com/images/GhLWXPA0mXcPd2KnVughszOHqAE.jpg?scale-down-to=2048&width=2400&height=2400"
                                    alt="blog title"
                                    className="h-full w-full object-cover"
                                />

                                <Badge className="absolute top-5 left-5 z-1">
                                    Strategy & Leadershi
                                </Badge>
                            </div>
                            <div className="p-3">
                                <div className="mb-3 flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <CalendarClockIcon className="size-4 text-primary" />
                                        <span className="text-xs text-foreground">
                                            Feb 2, 2026
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="size-4 text-primary" />
                                        <span className="text-xs text-foreground">
                                            8 min read
                                        </span>
                                    </div>
                                </div>
                                <h1 className="text-[16px] leading-5 font-medium text-foreground">
                                    Why great strategies fail and how leaders
                                    can keep them alive
                                </h1>
                                <p className="mt-3 text-sm text-foreground">
                                    Most strategies don’t fail because they’re
                                    wrong — they fail because teams lose
                                    connection to them. Here’s how...
                                </p>

                                <Button
                                    variant="link"
                                    className="mt-2 p-0 text-base underline"
                                    size="sm"
                                >
                                    Read more{' '}
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="w-full overflow-hidden rounded-3xl">
                            <div className="relative h-61.5 w-full overflow-hidden rounded-2xl">
                                <img
                                    src="https://framerusercontent.com/images/GhLWXPA0mXcPd2KnVughszOHqAE.jpg?scale-down-to=2048&width=2400&height=2400"
                                    alt="blog title"
                                    className="h-full w-full object-cover"
                                />

                                <Badge className="absolute top-5 left-5 z-1">
                                    Strategy & Leadershi
                                </Badge>
                            </div>
                            <div className="p-3">
                                <div className="mb-3 flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <CalendarClockIcon className="size-4 text-primary" />
                                        <span className="text-xs text-foreground">
                                            Feb 2, 2026
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="size-4 text-primary" />
                                        <span className="text-xs text-foreground">
                                            8 min read
                                        </span>
                                    </div>
                                </div>
                                <h1 className="text-[16px] leading-5 font-medium text-foreground">
                                    Why great strategies fail and how leaders
                                    can keep them alive
                                </h1>
                                <p className="mt-3 text-sm text-foreground">
                                    Most strategies don’t fail because they’re
                                    wrong — they fail because teams lose
                                    connection to them. Here’s how...
                                </p>

                                <Button
                                    variant="link"
                                    className="mt-2 p-0 text-base underline"
                                    size="sm"
                                >
                                    Read more{' '}
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="w-full overflow-hidden rounded-3xl">
                            <div className="relative h-61.5 w-full overflow-hidden rounded-2xl">
                                <img
                                    src="https://framerusercontent.com/images/GhLWXPA0mXcPd2KnVughszOHqAE.jpg?scale-down-to=2048&width=2400&height=2400"
                                    alt="blog title"
                                    className="h-full w-full object-cover"
                                />

                                <Badge className="absolute top-5 left-5 z-1">
                                    Strategy & Leadershi
                                </Badge>
                            </div>
                            <div className="p-3">
                                <div className="mb-3 flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <CalendarClockIcon className="size-4 text-primary" />
                                        <span className="text-xs text-foreground">
                                            Feb 2, 2026
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="size-4 text-primary" />
                                        <span className="text-xs text-foreground">
                                            8 min read
                                        </span>
                                    </div>
                                </div>
                                <h1 className="text-[16px] leading-5 font-medium text-foreground">
                                    Why great strategies fail and how leaders
                                    can keep them alive
                                </h1>
                                <p className="mt-3 text-sm text-foreground">
                                    Most strategies don’t fail because they’re
                                    wrong — they fail because teams lose
                                    connection to them. Here’s how...
                                </p>

                                <Button
                                    variant="link"
                                    className="mt-2 p-0 text-base underline"
                                    size="sm"
                                >
                                    Read more{' '}
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* faq */}
            <section className="container py-10 md:py-25">
                <div className="mx-auto grid w-full grid-cols-1 items-center gap-4 md:w-[70%] md:grid-cols-2 md:flex-row md:gap-10">
                    <div>
                        <SectionHeader
                            title="Common questions, straight answers"
                            tag={{
                                title: 'FAQ',
                                icon: InfiniteQuestionBadge,
                                position: 'left',
                            }}
                            position="left"
                            titleClass="text-2xl md:text-4xl"
                        />
                    </div>
                    <div className="mr-0 ml-auto w-full md:w-[70%]">
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
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="mb-4 text-base font-normal text-muted-foreground"
                        >
                            Have a question that's not covered here? Reach out
                            and we'll get back to you within one business day.
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
                                delay: 0.2,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                        >
                            <SlideUpButton
                                onClick={() =>
                                    router.get(route('ux.contact.index'))
                                }
                                variant="base"
                            >
                                Contact Us{' '}
                                <ChevronRight className="size-4 text-white" />
                            </SlideUpButton>
                        </motion.div>
                    </div>
                </div>

                <div className="mx-auto mt-10 w-full md:w-[70%]">
                    <Faq />
                </div>
            </section>
        </AppLayout>
    );
}
