import { motion } from "motion/react";

interface InfiniteQuestionBadgeProps {
  className?: string;
}

export default function InfiniteQuestionBadge({
  className = "",
}: InfiniteQuestionBadgeProps) {
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
      className={className}
      animate={{ rotate: 360 }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.45, 0.7, 1],
        }}
      />

      <motion.path
        d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
          times: [0, 0.45, 0.7, 1],
        }}
      />

      <motion.line
        x1="12"
        x2="12.01"
        y1="17"
        y2="17"
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
          times: [0, 0.45, 0.7, 1],
        }}
      />
    </motion.svg>
  );
}