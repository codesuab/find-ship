import { router } from '@inertiajs/react';
import { motion, Variants } from 'motion/react';
import Logo from '../Logo';

interface PropsInterface {
    title: string;
    subtitle: string;
}

export default function AuthHeader({ title, subtitle }: PropsInterface) {
    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 18,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 24,
            },
        },
    };
    return (
        <div>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                }}
                viewport={{ once: true }}
                className="mb-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-primary/10"
                onClick={() => router.get(route('home'))}
            >
                <Logo show="false" imageSize="h-8 text-primary" />
            </motion.div>
            <motion.div variants={itemVariants} className="mb-8">
                <h1 className="mb-1 leading-[1.05] font-semibold tracking-tight text-foreground text-[25px]">
                    {title}
                </h1>

                <p className="text-sm text-balance text-muted-foreground">
                    {subtitle}
                </p>
            </motion.div>
        </div>
    );
}
