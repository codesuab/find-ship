import React from 'react';
import { motion } from 'motion/react';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

export default function Illustrator() {
    return (
        <div className="relative hidden w-[45%] lg:flex lg:min-h-screen">
            <div className="relative h-full w-full overflow-hidden bg-neutral-100 shadow-xl">
                <img
                    src="/media/system/auth-banner.avif"
                    alt=""
                    className="absolute inset-0 h-full w-full object-fill"
                />

                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80" />

                <div className="absolute bottom-10 left-10 w-[60%]">
                    <motion.h2
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
                        className="text-base text-white capitalize"
                    >
                        You can easily
                    </motion.h2>
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
                            delay: 0.2,
                        }}
                        viewport={{ once: true }}
                        className="mt-3 text-4xl font-normal text-white"
                    >
                        Get complete visibility into every vessel movement
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
                            ease: 'easeInOut',
                            delay: 0.3,
                        }}
                        viewport={{ once: true }}
                        className="mt-3 text-base font-light text-white"
                    >
                        Track arrivals, departures, schedules, and port activity
                        from one centralized hub built for modern maritime
                        operations.
                    </motion.p>
                </div>

                <div className="absolute top-10 left-10 flex w-[90%] items-center justify-between">
                    <motion.h1
                        initial={{
                            opacity: 0,
                            x: -30,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: 'easeOut',
                        }}
                        viewport={{ once: true }}
                        className="text-xl font-bold text-white"
                    >
                        FindShip
                    </motion.h1>

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 30,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 1,
                            ease: 'easeOut',
                        }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/"
                            className="group flex items-center gap-1 text-base font-medium text-white capitalize duration-300 hover:underline"
                        >
                            <ChevronLeft
                                size={16}
                                className="mt-0.5 duration-300 group-hover:mr-1"
                            />
                            <span>Back to Website</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
