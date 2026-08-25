'use client';

import React from 'react';
import { LazyMotion, domAnimation, m } from 'motion/react';
import { cn } from '@/lib/utils';

const variants = {
    primary: 'bg-secondary text-foreground',
    secondary: 'bg-secondary/5 hover:bg-secondary/8 text-white',
    light: 'bg-white text-foreground',
    link: 'bg-transparent hover:bg-white/10 text-white',
    base: 'bg-primary text-white',
};
const sizes = {
    default: 'px-6 py-2.5 text-[16px]',
    sm: 'px-4 py-2 text-[14px]',
};

interface SlideUpButtonProps {
    children: React.ReactNode;
    className?: string;
    textDuration?: number;
    cloneDuration?: number;
    cloneDelay?: number;
    buttonScale?: number;
    buttonOpacity?: number;
    onClick?: () => void;
    disabled?: boolean;
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
}

const SlideUpButton = ({
    children,
    className = '',
    textDuration = 0.25,
    cloneDuration = 0.5,
    cloneDelay = 0.12,
    buttonScale = 0.98,
    buttonOpacity = 1,
    onClick,
    disabled = false,
    variant = 'primary',
    size = 'default',
}: SlideUpButtonProps) => {
    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: buttonScale, opacity: buttonOpacity },
    };

    const textVariants = {
        initial: { y: 0 },
        hover: { y: '-200%' },
    };

    const cloneVariants = {
        initial: { y: '200%', rotate: 20 },
        hover: { y: 0, rotate: 0 },
    };

    return (
        <LazyMotion features={domAnimation}>
            <m.button
                onClick={onClick}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                disabled={disabled}
                className={cn(
                    'relative overflow-hidden rounded-xl leading-normal font-medium duration-300',
                    variants[variant],
                    sizes[size],
                    className,
                    disabled && 'pointer-events-none cursor-no-drop opacity-60',
                )}
            >
                {/* container for stacked text */}
                <m.div className="relative gap-2 overflow-hidden">
                    {/* ORIGINAL TEXT */}
                    <m.span
                        variants={textVariants}
                        transition={{
                            duration: textDuration,
                            ease: [0.55, 0.085, 0.68, 0.53],
                        }}
                        className="flex items-center justify-center gap-1"
                    >
                        {children}
                    </m.span>

                    {/* CLONE TEXT */}
                    <m.span
                        variants={cloneVariants}
                        transition={{
                            duration: cloneDuration,
                            ease: [0.165, 0.84, 0.44, 1],
                            delay: cloneDelay,
                        }}
                        className="absolute top-1/2 left-1/2 flex min-w-max -translate-1/2 items-center justify-center gap-1"
                    >
                        {children}
                    </m.span>
                </m.div>
            </m.button>
        </LazyMotion>
    );
};

export default SlideUpButton;
