import { CobeGlobe } from "@/components/partials/cobe-globe";
import { LogoCloud } from "@/components/partials/clientLogo/logo-cloud";
import SlideUpButton from "@/components/slideup-button";
import { Skeleton } from "@/components/ui/skeleton";
import { featureCard, featureCardOneState } from "@/constant/ui";
import { PageProps } from "@/types/types";
import { Head, router, usePage } from "@inertiajs/react";
import { Ship } from "lucide-react";
import { GiShipBow } from "react-icons/gi";
import { FaShip } from "react-icons/fa";
import { motion, useScroll, useTransform, Variants } from "motion/react"
import { BsDatabaseFillCheck } from "react-icons/bs";
import { useRef } from "react";
import { RiArrowRightSFill } from "react-icons/ri";
import { PricingSection } from "@/components/partials/price/pricing-section";
import BlogBlock from "@/components/partials/blog";
import { TestimonialsSection } from "@/components/partials/testimonials-section";
import AppLayout from "@/Layouts/AppLayout";

export default function home() {
    const { name: appName } = usePage<PageProps>().props;
    const heroRef = useRef(null);

    // scroll
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // hero dashboard image animation
    const scale = useTransform(
        scrollYProgress,
        [0, 1.1],
        [1, 0.5]
    );
    return (
        <AppLayout key='home'>
            {/* seo */}
            <Head>
                <title>Smart vessel finder</title>
            </Head>

            <main className="w-full">
                {/* hero --------- */}
                <section className="relative overflow-hidden overflow-y-hidden pt-25 md:pt-40 after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:h-50 md:after:h-100 after:bg-linear-to-t after:from-white after:to-transparent after:pointer-events-none " ref={heroRef}>
                    <div className="container z-1 flex flex-col items-center justify-center">
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
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-[40px] md:text-[64px] font-medium leading-10 md:leading-15 capitalize text-center w-full md:w-[80%] mx-auto">Smarter
                            {' '}<span className="text-primary font-highlight font-bold">Arrival</span>{' '}
                            <span className="text-foreground font-highlight font-medium">&</span>{' '}
                            <span className="text-primary font-highlight font-bold">Departure</span> Management for Modern Ports</motion.h1>

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
                            className="text-base font-normal text-muted-foreground mt-4 w-full md:w-[60%] mx-auto text-center">
                            Digitize vessel movements, automate operational workflows, monitor port traffic, and manage maritime data with speed, accuracy, and confidence.
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
                            className="flex flex-col w-10/12 mx-auto md:w-fit md:flex-row items-stretch md:items-center gap-3 mt-15">
                            <SlideUpButton onClick={() => router.visit('/auth/login')} className="w-full md:w-fit" >Start Free Trial</SlideUpButton>
                            <SlideUpButton className="w-full md:w-fit bg-foreground hover:bg-primary text-white">See How It Works</SlideUpButton>
                        </motion.div>

                        <motion.img style={{ scale }}
                            initial={{
                                opacity: 0,
                                y: 20,
                                scaleX: 0.9
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scaleX: 1
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.3,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            src="/media/system/dashboard.avif" alt="find ship app" className="mt-10" />
                    </div>
                    {/* hero bg */}
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            duration: 0.9,
                            delay: 0.2,
                            ease: "easeOut",
                        }}
                        className="absolute top-0 -left-1/4 select-none pointer-events-none h-full flex items-end justify-center -z-1 -right-1/4 min-w-full overflow-clip">
                        <img src="/media/system/banner-bg.avif" className="w-[90%]" />
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
                        filter: 'blur(0)'
                    }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut',
                    }}
                    viewport={{ once: true }}
                    className="relative mb-25 mx-auto max-w-5xl">
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
                            filter: 'blur(0)'
                        }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeInOut',
                        }}
                        viewport={{ once: true }}
                        className="text-center text-3xl md:text-5xl font-medium text-gradient-up w-full md:w-[70%] mx-auto">Smarter vessel operations, from arrival to departure</motion.h1>

                    <div
                        className="grid mt-10 md:mt-14 grid-cols-1 md:grid-cols-3 gap-5 max-w-[90%] mx-auto">
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
                                        filter: 'blur(0)'
                                    }}
                                    transition={{
                                        delay: i * 0.3,
                                        duration: 0.4,
                                        ease: 'easeInOut',
                                    }}
                                    viewport={{ once: true }}
                                    className={`${val.id == 2 ? 'bg-linear-to-t from-primary/10 to-white' : 'bg-linear-to-t from-accent to-[#fafafa]'} rounded-xl p-4 border border-border/40 overflow-hidden max-h-75 relative`}>
                                    <motion.p className="text-sm font-medium text-foreground capitalize">
                                        {val.short}
                                    </motion.p>

                                    {val.id == 1 && (
                                        <div className="flex flex-col gap-1 mt-2 p-2">
                                            {featureCardOneState.map((val, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white rounded-lg p-3 w-full border border-border/40 duration-500 hover:translate-x-5"
                                                >
                                                    <h1 className="text-sm font-bold text-foreground">
                                                        {val.imo}
                                                    </h1>

                                                    <div className="flex mt-2 items-center justify-between gap-1">
                                                        <span className="bg-muted rounded-sm text-xs font-medium text-foreground px-1.5 py-0.5">
                                                            {val.from.short}
                                                        </span>

                                                        <div className="flex items-center w-full gap-px">
                                                            <div
                                                                className="border border-dotted border-muted-foreground"
                                                                style={{ width: val.position + "%" }}
                                                            />

                                                            <div className="min-w-fit">
                                                                <Ship
                                                                    size={18}
                                                                    className="text-primary"
                                                                />
                                                            </div>

                                                            <div className="flex items-center w-full">
                                                                <div className="w-full border border-muted-foreground" />
                                                                <RiArrowRightSFill
                                                                    size={18}
                                                                    className="min-w-fit -ml-2"
                                                                />
                                                            </div>
                                                        </div>

                                                        <span className="bg-muted rounded-sm text-xs font-medium px-1.5 py-0.5">
                                                            {val.to.short}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-1">
                                                        <p className="text-xs text-muted-foreground font-medium">
                                                            {val.from.full}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground font-medium">
                                                            {val.to.full}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <p className="text-[10px] text-muted-foreground font-medium">
                                                            {val.from_date}
                                                        </p>
                                                        <p className="text-[10px] text-muted-foreground font-medium">
                                                            {val.to_date}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {val.id == 2 && (
                                        <div className="w-full">
                                            <CobeGlobe />
                                        </div>
                                    )}

                                    {val.id == 3 && (
                                        <div
                                            className="flex flex-col gap-1 mt-2 p-2">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 rounded-lg p-2.5 w-full border border-border/80 duration-500 hover:translate-x-5"
                                                >
                                                    <Skeleton
                                                        className={`min-h-8 min-w-8 rounded-lg bg-muted-foreground/20 ${index === 1
                                                            ? "rounded-full"
                                                            : index === 2
                                                                ? "rounded-md"
                                                                : ""
                                                            }`}
                                                    />

                                                    <div className="space-y-2">
                                                        <Skeleton
                                                            className={`h-2 bg-muted-foreground/20 ${index === 0
                                                                ? "w-50"
                                                                : index === 1
                                                                    ? "w-42"
                                                                    : index === 2
                                                                        ? "w-48"
                                                                        : index === 3
                                                                            ? "w-36"
                                                                            : "w-44"
                                                                }`}
                                                        />

                                                        <Skeleton
                                                            className={`h-2 bg-muted-foreground/20 ${index === 0
                                                                ? "w-45"
                                                                : index === 1
                                                                    ? "w-32"
                                                                    : index === 2
                                                                        ? "w-40"
                                                                        : index === 3
                                                                            ? "w-28"
                                                                            : "w-36"
                                                                }`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>

                                <div className="mt-5">
                                    <h2 className="text-[18px] text-foreground font-semibold mb-2">
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
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-center text-3xl md:text-5xl font-medium text-gradient-up w-full md:w-1/2 mx-auto">The only tool that works for itself
                        </motion.h1>

                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-15 mt-10 md:mt-14">
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
                                        scaleX: 1
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: 'easeInOut',
                                    }}
                                    viewport={{ once: true }}
                                    src="/media/system/choice-1.avif" alt="find ship" className="rounded-3xl w-full object-cover max-h-140" />
                            </div>
                            {/* tab */}
                            <div className="w-full md:w-[40%]">
                                {[
                                    {
                                        icon: <FaShip size={18} className="text-primary" />,
                                        title: "Track vessel arrivals",
                                        description:
                                            "Get real-time vessel ETAs, arrival schedules, and port activity in one place to stay ahead of every incoming vessel.",
                                    },
                                    {
                                        icon: <GiShipBow size={18} className="text-primary" />,
                                        title: "Manage vessel departures",
                                        description:
                                            "Monitor departure schedules, vessel movements, and operational updates to keep port operations running smoothly.",
                                    },
                                    {
                                        icon: <BsDatabaseFillCheck size={18} className="text-primary" />,
                                        title: "Centralize vessel data",
                                        description:
                                            "Access vessel details, movement history, schedules, and operational data from one centralized platform.",
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
                                            filter: 'blur(0)'
                                        }}
                                        transition={{
                                            delay: i * 0.3,
                                            duration: 0.4,
                                            ease: 'easeInOut',
                                        }}
                                        className="border-b-2 border-border pb-4 mb-4 duration-300 hover:border-b-primary"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 flex items-center justify-center rounded-full border border-primary/20 bg-linear-to-b from-primary/10 to-primary/5">
                                                {item.icon}
                                            </div>

                                            <h1 className="text-xl font-medium text-foreground">
                                                {item.title}
                                            </h1>
                                        </div>

                                        <p className="text-base text-muted-foreground mt-3">
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
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-center text-3xl md:text-5xl font-medium text-gradient-up w-full md:w-1/2 mx-auto">Flexible plans that grow with you
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
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.2,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-center text-base font-medium text-muted-foreground mt-3 w-full md:w-[40%] mx-auto">Use Inbox individually or upgrade to link more accounts and add seats for your team members. No hidden fees.
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
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-center text-3xl md:text-5xl font-medium text-gradient-up w-full md:w-1/2 mx-auto">Stories from the team building {appName}
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
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-center text-3xl md:text-5xl font-medium text-gradient-up w-full md:w-1/2 mx-auto">Trusted by teams who lead people
                        </motion.h1>

                        <div className="mt-10 md:mt-14">
                            <TestimonialsSection />
                        </div>
                    </div>
                </section>
            </main >
        </AppLayout>
    );
}
