import React from 'react'
import AppLayout from '@/Layouts/AppLayout'
import PageHeader from '@/components/partials/PageHeader'
import { motion } from 'motion/react'
import { aboutOurCoreValue } from '@/constant/ui'
import Shield from '@/components/icon/Shield'
import Cpu from '@/components/icon/Cpu'
import ScanEye from '@/components/icon/Eye'
import { TestimonialsSection } from '@/components/partials/testimonials-section'
import Faq from '@/components/partials/Faq'

export default function about() {
    return (
        <AppLayout key='about'>
            <PageHeader title='Our Story' subtitle='We’re redefining vessel tracking with intelligent maritime data and real-time insights. Built for modern port teams, vessel operators, and maritime professionals.' />

            <div
                className='container'>
                <div
                    className="grid h-auto md:max-h-112.5 grid-cols-1 gap-5 md:grid-cols-2">
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
                        viewport={{ once: true }}
                        className="h-auto md:max-h-112.5 w-full overflow-hidden rounded-xl">
                        <img
                            src="/media/system/choice-1.avif"
                            alt="ship finder"
                            className="h-full w-full object-cover"
                        />
                    </motion.div>

                    <div className="grid h-auto md:max-h-112.5 grid-cols-1 gap-5 md:grid-rows-[1fr_auto]">
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
                            className="min-h-0 w-full overflow-hidden rounded-xl">
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
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                                delay: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="rounded-xl bg-[#466cf3] p-7 text-white">
                            <h1 className='text-xl font-medium'>Our Mission</h1>
                            <p className='text-base font-normal mt-4'>
                                To simplify maritime operations with reliable vessel data,
                                real-time tracking, and actionable insights—helping teams make
                                faster, smarter decisions with confidence.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className='py-25 grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <motion.h1
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
                        className='text-3xl md:text-4xl w-full md:max-w-[60%] text-foreground font-medium'>Powerful data to accelerate maritime operations</motion.h1>
                    <div className='space-y-7'>
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
                                delay: 0.2,
                            }}
                            viewport={{ once: true }}
                            className='text-lg text-foreground'>Reliable vessel data can be the catalyst for smarter, faster maritime operations—helping teams identify opportunities, streamline workflows, and stay ahead of every arrival and departure.</motion.p>
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
                                delay: 0.4,
                            }}
                            viewport={{ once: true }}
                            className='text-lg text-foreground'>With real-time tracking and actionable insights, ShipFinder turns complex vessel activity into clear information, enabling teams to make confident decisions and manage operations more efficiently.</motion.p>
                    </div>
                </div>
            </div>

            <section className='bg-primary/3 py-25'>
                <div className="container">
                    <motion.h1
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
                        className='text-3xl md:text-5xl font-medium text-gradient-up text-center'>Our core values</motion.h1>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 md:mt-14'>
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
                                    filter: 'blur(0)'
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: 'easeInOut',
                                    delay: 0.2 + i * 0.2,
                                }}
                                viewport={{ once: true }}
                                key={i} className='bg-white rounded-xl p-6'>
                                {val.icon == 'shield' && (
                                    <Shield className="size-10 text-primary mb-2" />
                                )}
                                {val.icon == 'cpu' && (
                                    <Cpu className="size-10 text-primary mb-2" />
                                )}
                                {val.icon == 'eye' && (
                                    <ScanEye className="size-10 text-primary mb-2" />
                                )}
                                <h1 className='text-xl font-medium text-foreground mb-14'>{val.title}</h1>
                                <p className='text-base text-muted-foreground'>{val.subtitle}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* testimonial */}
            <section className="py-25">
                <div className="container">
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 10,
                            filter: "blur(10px)",
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                            ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className="text-center text-3xl md:text-5xl font-medium text-gradient-up w-full md:w-1/2 mx-auto">Trusted by teams who lead people
                    </motion.h1>

                    <div className="mt-10 md:mt-14">
                        <TestimonialsSection />
                    </div>
                </div>
            </section>

            {/* faq */}
            <Faq />
        </AppLayout>
    )
}
