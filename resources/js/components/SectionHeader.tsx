import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface SectionProps {
    title?: string;
    subtitle?: string;
    tag?: {
        title: string;
        icon: React.ElementType;
        iconSize?: string;
        position?: 'left' | 'center';
    };
    position?: 'left' | 'center';
    color?: 'white' | 'dark';
    titleClass?: string;
    subTitleClass?: string;
}

export default function SectionHeader({
    title,
    subtitle,
    tag,
    position,
    color,
    titleClass,
    subTitleClass,
}: SectionProps) {
    const TagIcon = tag?.icon;
    return (
        <>
            {tag && TagIcon && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                        scaleX: 0.9,
                        filter: 'blur(5px)',
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scaleX: 1,
                        filter: 'blur(0)',
                    }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut',
                    }}
                    className={`shadow-light ${tag.position == 'left' ? '' : 'mx-auto'} mb-3 flex w-fit items-center gap-2.5 rounded-full border border-border/50 px-3.5 py-2`}
                >
                    <TagIcon className={tag.iconSize ?? 'size-4'} />
                    <span
                        className={cn(
                            'text-sm font-medium',
                            color == 'white' ? 'text-white' : 'text-foreground',
                        )}
                    >
                        {tag.title}
                    </span>
                </motion.div>
            )}
            {title && (
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                        scaleX: 0.9,
                        filter: 'blur(5px)',
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scaleX: 1,
                        filter: 'blur(0)',
                    }}
                    transition={{
                        duration: 0.4,
                        delay: 0.1,
                        ease: 'easeInOut',
                    }}
                    viewport={{ once: true }}
                    className={cn(
                        'mx-auto w-full text-3xl font-medium md:text-5xl',
                        position == 'left' ? 'text-left' : 'text-center',
                        color == 'white' ? 'text-white' : 'text-foreground',
                        titleClass
                    )}
                >
                    {title}
                </motion.h1>
            )}
            {subtitle && (
                <motion.p
                    initial={{
                        opacity: 0,
                        y: 20,
                        scaleX: 0.9,
                        filter: 'blur(5px)',
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scaleX: 1,
                        filter: 'blur(0)',
                    }}
                    transition={{
                        duration: 0.4,
                        delay: 0.3,
                        ease: 'easeInOut',
                    }}
                    viewport={{ once: true }}
                    className={cn(
                        'mt-3 w-full text-base font-normal text-muted-foreground md:w-[40%]',
                        position == 'left'
                            ? 'text-left'
                            : 'mx-auto text-center',
                        color == 'white'
                            ? 'text-white'
                            : 'text-muted-foreground',
                            subTitleClass
                    )}
                >
                    {subtitle}
                </motion.p>
            )}
        </>
    );
}
