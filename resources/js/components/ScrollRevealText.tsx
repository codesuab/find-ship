import React, { useRef } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    type MotionValue,
} from 'motion/react'

interface ScrollRevealTextProps {
    text: string
    className?: string
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
    text,
    className,
}) => {
    const containerRef = useRef<HTMLParagraphElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.85', 'end 0.35'],
    })

    const words = text.split(/\s+/)

    return (
        <p
            ref={containerRef}
            className={className}
            style={{
                wordSpacing: '0.25rem',
            }}
        >
            {words.map((word, i) => {
                const start = i / words.length
                const end = Math.min(
                    start + 0.12,
                    1,
                )

                return (
                    <React.Fragment key={`${word}-${i}`}>
                        <Word
                            progress={scrollYProgress}
                            range={[start, end]}
                        >
                            {word}
                        </Word>
                        {i < words.length - 1 && ' '}
                    </React.Fragment>
                )
            })}
        </p>
    )
}

interface WordProps {
    children: string
    progress: MotionValue<number>
    range: [number, number]
}

const Word: React.FC<WordProps> = ({
    children,
    progress,
    range,
}) => {
    const opacity = useTransform(
        progress,
        range,
        [0.25, 1],
    )

    const y = useTransform(
        progress,
        range,
        [8, 0],
    )

    return (
        <motion.span
            style={{
                opacity,
                y,
                display: 'inline-block',
                willChange: 'transform, opacity, filter',
            }}
        >
            {children}
        </motion.span>
    )
}