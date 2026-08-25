import { motion } from 'motion/react';

interface FloatingCardProps {
    children: React.ReactNode;
    className?: string;
    rotate?: number;
}

export function FloatingCard({
    children,
    className,
    rotate = 0,
}: FloatingCardProps) {
    return (
        <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.35}
            whileDrag={{
                scale: 1.05,
                cursor: 'grabbing',
                zIndex: 50,
            }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
            }}
            style={{
                rotate,
                touchAction: 'none',
            }}
            className={`absolute cursor-grab rounded-full px-5 py-1.5 shadow-light font-semibold text-white shadow-sm select-none ${className}`}
        >
            {children}
        </motion.div>
    );
}
