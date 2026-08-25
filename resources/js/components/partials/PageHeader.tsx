import React from 'react'
import { motion } from "motion/react"

export default function PageHeader({ title, subtitle }: { title: string, subtitle?: string }) {
    return (
        <header className='bg-primary'>
            <div className="container z-1 border-x border-border-light py-10 md:py-15">
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
                        className='text-center text-white text-[40px] md:text-[70px] font-semibold leading-10 md:leading-15 mb-5'>{title}</motion.h1>
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
                            className='text-center text-white text-sm font-normal md:text-base'>
                            {subtitle}
                        </motion.p>
                    )}
                </div>
            </div>
        </header>
    )
}
