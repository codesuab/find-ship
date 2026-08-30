import { motion } from 'motion/react';

export default function Illustrator() {
    return (
        <div className="relative hidden h-screen w-[40%] lg:flex">
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
                </div>
            </div>
        </div>
    );
}
