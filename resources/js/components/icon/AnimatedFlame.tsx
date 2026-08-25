import { motion } from "motion/react";

export default function AnimatedFlame() {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="rgba(255, 106, 0, 0.15)"
            stroke="#ff6a00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
                scale: [1, 1.025, 1.01, 1.02, 1],
                rotate: [0, 1, -0.5, 0.5, 0],
            }}
            transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <motion.path
                d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1] }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </motion.svg>
    );
}