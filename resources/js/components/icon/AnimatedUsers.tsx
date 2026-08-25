import { motion, type SVGMotionProps } from 'motion/react'

const paths = [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M16 3.128a4 4 0 0 1 0 7.744',
    'M22 21v-2a4 4 0 0 0-3-3.87',
]

export default function AnimatedUsers(
    props: SVGMotionProps<SVGSVGElement>,
) {
    return (
        <motion.svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {paths.map((d, i) => (
                <motion.path
                    key={d}
                    d={d}
                    initial={{ pathLength: 0 }}
                    animate={{
                        pathLength: [0, 1, 1, 0],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.15,
                        repeat: Infinity,
                        repeatDelay: 0.4,
                        ease: [0.65, 0, 0.35, 1],
                        times: [0, 0.35, 0.75, 1],
                    }}
                />
            ))}

            <motion.circle
                cx="9"
                cy="7"
                r="4"
                initial={{ pathLength: 0 }}
                animate={{
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, 1, 1, 0],
                }}
                transition={{
                    duration: 3,
                    delay: 0.3,
                    repeat: Infinity,
                    repeatDelay: 0.4,
                    ease: [0.65, 0, 0.35, 1],
                    times: [0, 0.35, 0.75, 1],
                }}
            />
        </motion.svg>
    )
}