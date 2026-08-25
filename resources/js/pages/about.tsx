import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import PageHeader from '@/components/partials/PageHeader';
import { motion } from 'motion/react';
import { aboutOurCoreValue } from '@/constant/ui';
import Shield from '@/components/icon/Shield';
import Cpu from '@/components/icon/Cpu';
import ScanEye from '@/components/icon/Eye';
import Faq from '@/components/partials/Faq';
import SectionHeader from '@/components/SectionHeader';
import AnimatedRocket from '@/components/icon/AnimatedRocket';
import SlideUpButton from '@/components/slideup-button';
import { ChevronRight } from 'lucide-react';
import InfiniteQuestionBadge from '@/components/icon/InfiniteQuestionBadge';
import { router } from '@inertiajs/react';

export default function about() {
    return (
        <AppLayout key="about">
            <PageHeader
                title="Our Story"
                subtitle="We’re redefining vessel tracking with intelligent maritime data and real-time insights. Built for modern port teams, vessel operators, and maritime professionals."
            />

            <div className="container mt-20">
                <div className="grid h-auto grid-cols-1 gap-5 md:max-h-112.5 md:grid-cols-2">
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
                            ease: 'easeInOut',
                        }}
                        viewport={{ once: true }}
                        className="h-auto w-full overflow-hidden rounded-xl md:max-h-112.5"
                    >
                        <img
                            src="/media/system/choice-1.avif"
                            alt="ship finder"
                            className="h-full w-full object-cover"
                        />
                    </motion.div>

                    <div className="grid h-auto grid-cols-1 gap-5 md:max-h-112.5 md:grid-rows-[1fr_auto]">
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
                            className="min-h-0 w-full overflow-hidden rounded-xl"
                        >
                            <img
                                src="/media/system/ship-in-port.avif"
                                alt="ship finder"
                                className="h-full w-full object-cover"
                            />
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
                                filter: 'blur(0)',
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                                delay: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="rounded-xl bg-[#466cf3] p-7 text-white"
                        >
                            <h1 className="text-xl font-medium">Our Mission</h1>
                            <p className="mt-4 text-base font-normal">
                                To simplify maritime operations with reliable
                                vessel data, real-time tracking, and actionable
                                insights—helping teams make faster, smarter
                                decisions with confidence.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="grid grid-cols-1 gap-4 py-25 md:grid-cols-2">
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
                        className="w-full text-3xl font-medium text-foreground md:max-w-[60%] md:text-4xl"
                    >
                        Powerful data to accelerate maritime operations
                    </motion.h1>
                    <div className="space-y-7">
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
                                delay: 0.2,
                            }}
                            viewport={{ once: true }}
                            className="text-lg text-foreground"
                        >
                            Reliable vessel data can be the catalyst for
                            smarter, faster maritime operations—helping teams
                            identify opportunities, streamline workflows, and
                            stay ahead of every arrival and departure.
                        </motion.p>
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
                                delay: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="text-lg text-foreground"
                        >
                            With real-time tracking and actionable insights,
                            ShipFinder turns complex vessel activity into clear
                            information, enabling teams to make confident
                            decisions and manage operations more efficiently.
                        </motion.p>
                    </div>
                </div>
            </div>

            <section className="bg-primary/3 py-25">
                <div className="container">
                    <SectionHeader
                        title="Our core values"
                        subtitle="Built around accuracy, transparency, and smarter maritime decisions."
                        tag={{
                            title: 'Power Pack',
                            icon: AnimatedRocket,
                            iconSize: 'size-4',
                        }}
                    />

                    <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3">
                        {aboutOurCoreValue?.map((val, i) => (
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
                                    ease: 'easeInOut',
                                    delay: 0.2 + i * 0.2,
                                }}
                                viewport={{ once: true }}
                                key={i}
                                className="rounded-xl bg-white p-6"
                            >
                                {val.icon == 'shield' && (
                                    <Shield className="mb-2 size-10 text-primary" />
                                )}
                                {val.icon == 'cpu' && (
                                    <Cpu className="mb-2 size-10 text-primary" />
                                )}
                                {val.icon == 'eye' && (
                                    <ScanEye className="mb-2 size-10 text-primary" />
                                )}
                                <h1 className="mb-14 text-xl font-medium text-foreground">
                                    {val.title}
                                </h1>
                                <p className="text-base text-muted-foreground">
                                    {val.subtitle}
                                </p>
                            </motion.div>
                        ))}
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
