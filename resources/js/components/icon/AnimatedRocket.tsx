import { motion, type SVGMotionProps } from 'motion/react';

const paths = [
    'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
    'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09',
    'M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z',
    'M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05',
];

export default function AnimatedRocket({
    className,
    ...props
}: SVGMotionProps<SVGSVGElement>) {
    return (
        <motion.svg
            {...props}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {paths.map((d, index) => (
                <motion.path
                    key={d}
                    d={d}
                    initial={{
                        pathLength: 0,
                        pathOffset: 0,
                        opacity: 0,
                    }}
                    animate={{
                        pathLength: [0, 1, 1, 0],
                        pathOffset: [0, 0, 0, 0],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 2.8,
                        delay: index * 0.15,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        times: [0, 0.45, 0.82, 1],
                        ease: [0.4, 0, 0.2, 1],
                    }}
                />
            ))}
        </motion.svg>
    );
}
