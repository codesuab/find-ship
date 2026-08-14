"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import { cn } from "@/lib/utils";

interface SlideUpButtonProps {
  children: React.ReactNode;
  className?: string;
  textDuration?: number;
  cloneDuration?: number;
  cloneDelay?: number;
  buttonScale?: number;
  buttonOpacity?: number;
  onClick?: () => void;
}

const SlideUpButton = ({
  children,
  className = "",
  textDuration = 0.25,
  cloneDuration = 0.5,
  cloneDelay = 0.12,
  buttonScale = 0.98,
  buttonOpacity = 1,
  onClick,
}: SlideUpButtonProps) => {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: buttonScale, opacity: buttonOpacity }
  };

  const textVariants = {
    initial: { y: 0 },
    hover: { y: "-200%" },
  };

  const cloneVariants = {
    initial: { y: "200%", rotate: 20 },
    hover: { y: 0, rotate: 0 },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        onClick={onClick}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        className={cn(
          "relative bg-primary text-white overflow-hidden px-6 py-3 rounded-xl text-[16px] font-medium duration-300 leading-normal cursor-pointer",
          className
        )}
      >
        {/* container for stacked text */}
        <m.div className="relative overflow-hidden gap-2">
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
            className="absolute top-1/2 left-1/2 -translate-1/2 min-w-max gap-1 flex items-center justify-center"
          >
            {children}
          </m.span>
        </m.div>
      </m.button>
    </LazyMotion>
  );
};

export default SlideUpButton;
