import { motion } from "motion/react";

interface CpuProps {
    className?: string;
}

export default function Cpu({ className }: CpuProps) {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <motion.rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="3"
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.95, 1, 0.95],
                }}
                transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 0.4,
                    ease: "easeInOut",
                }}
            />

            <motion.rect
                x="8"
                y="8"
                width="8"
                height="8"
                rx="1.5"
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{
                    scale: [0.8, 1, 0.8],
                    opacity: [0.3, 1, 0.3],
                }}
                transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatDelay: 0.3,
                    ease: "easeInOut",
                }}
            />

            <motion.g
                animate={{
                    opacity: [0.35, 1, 0.35],
                }}
                transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatDelay: 0.4,
                    ease: "easeInOut",
                }}
            >
                <path d="M9 2v2" />
                <path d="M15 2v2" />
                <path d="M9 20v2" />
                <path d="M15 20v2" />

                <path d="M2 9h2" />
                <path d="M2 15h2" />
                <path d="M20 9h2" />
                <path d="M20 15h2" />
            </motion.g>

            <motion.circle
                cx="12"
                cy="12"
                r="1"
                fill="currentColor"
                stroke="none"
                animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.4, 1, 0.4],
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                    ease: "easeInOut",
                }}
            />
        </motion.svg>
    );
}