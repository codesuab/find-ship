import { motion } from "motion/react";

interface ScanEyeProps {
    className?: string;
}

export default function ScanEye({ className }: ScanEyeProps) {
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
            className={className}
        >
            <motion.path
                d="M3 7V5a2 2 0 0 1 2-2h2"
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: "easeInOut",
                }}
            />

            <motion.path
                d="M17 3h2a2 2 0 0 1 2 2v2"
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    delay: 0.15,
                    ease: "easeInOut",
                }}
            />

            <motion.path
                d="M21 17v2a2 2 0 0 1-2 2h-2"
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    delay: 0.3,
                    ease: "easeInOut",
                }}
            />

            <motion.path
                d="M7 21H5a2 2 0 0 1-2-2v-2"
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    delay: 0.45,
                    ease: "easeInOut",
                }}
            />

            <motion.path
                d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"
                animate={{
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, 1, 1, 0.3],
                }}
                transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: "easeInOut",
                }}
            />

            <motion.circle
                cx="12"
                cy="12"
                r="1"
                animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </motion.svg>
    );
}