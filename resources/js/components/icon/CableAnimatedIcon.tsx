import { motion, type Variants } from "motion/react";

const pathVariants: Variants = {
    initial: {
        pathLength: 0,
        opacity: 0,
    },
    animate: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 1.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.4,
        },
    },
};

export default function CableAnimatedIcon(): React.JSX.Element {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
        >
            <motion.path variants={pathVariants} initial="initial" animate="animate" d="M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z" />
            <motion.path variants={pathVariants} initial="initial" animate="animate" d="M17 21v-2" />
            <motion.path variants={pathVariants} initial="initial" animate="animate" d="M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10" />
            <motion.path variants={pathVariants} initial="initial" animate="animate" d="M21 21v-2" />
            <motion.path variants={pathVariants} initial="initial" animate="animate" d="M3 5V3" />
            <motion.path variants={pathVariants} initial="initial" animate="animate" d="M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z" />
            <motion.path variants={pathVariants} initial="initial" animate="animate" d="M7 5V3" />
        </motion.svg>
    );
}