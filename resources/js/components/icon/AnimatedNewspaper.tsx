import { motion } from 'motion/react';

interface CpuProps {
    className?: string;
}

export function AnimatedNewspaper({ className }: CpuProps) {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, -1, 0] }}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className={className}
        >
            <motion.path
                d="M15 18h-5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1] }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: 'easeInOut',
                }}
            />
            <motion.path
                d="M18 14h-8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1] }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    delay: 0.15,
                    ease: 'easeInOut',
                }}
            />
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
            <motion.rect
                width="8"
                height="4"
                x="10"
                y="6"
                rx="1"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </motion.svg>
    );
}
