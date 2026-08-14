import { motion } from "motion/react";

interface ShieldProps {
    className?: string;
}

export default function Shield({ className }: ShieldProps) {
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
                d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                animate={{
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, 1, 1, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.8, 1],
                }}
            />

            <motion.path
                d="m9 12 2 2 4-4"
                animate={{
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, 1, 1, 0],
                }}
                transition={{
                    duration: 3,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.8, 1],
                }}
            />
        </motion.svg>
    );
}