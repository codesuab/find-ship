import React from 'react'
import { motion } from "motion/react"

export default function PageHeader({ title, subtitle }: { title: string, subtitle?: string }) {
    return (
        <header className='relative min-h-60 pt-23 md:pt-34 pb-13 flex items-center justify-center overflow-hidden'>
            <div className="container z-1">
                <div className='max-w-xl mx-auto'>
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
                        className='text-center text-gradient-up text-[50px] md:text-[80px] font-semibold'>{title}</motion.h1>
                    {subtitle && (
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
                            className='text-center text-foreground text-base md:text-lg'>
                            {subtitle}
                        </motion.p>
                    )}
                </div>
            </div>

            {/* hero bg */}
            <motion.img
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 0.6,
                }}
                transition={{
                    duration: 0.9,
                    delay: 0.5,
                    ease: "easeOut",
                }}
                viewport={{ once: true }}
                src="/media/system/page-header-bg.avif" className="w-full absolute left-0 h-80 md:h-160 top-0 opacity-60" />
        </header>
    )
}
