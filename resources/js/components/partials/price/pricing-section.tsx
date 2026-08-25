import { cn } from '@/lib/utils';
import NumberFlow from '@number-flow/react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import {
    type FREQUENCY,
    FrequencyToggle,
} from '@/components/partials/price/frequency-toggle';
import { IconStar, IconCircleCheck } from '@tabler/icons-react';
import { router } from '@inertiajs/react';
import SlideUpButton from '@/components/slideup-button';
import { ChevronRight } from 'lucide-react';

type Plan = {
    name: string;
    info: string;
    price: {
        monthly: number;
        yearly: number; // yearly per month
    };
    features: string[];
    btn: {
        text: string;
        href: string;
    };
    highlighted?: boolean;
};

const plans: Plan[] = [
    {
        name: 'Basic',
        info: 'For most individuals',
        price: {
            monthly: 1499,
            yearly: 1299,
        },
        features: [
            'Up to 3 Blog posts',
            'Up to 3 Transcriptions',
            'Up to 3 Posts stored',
            'Markdown support',
            'Community support',
            'AI powered suggestions',
        ],
        btn: {
            text: 'Get Started Now',
            href: '#',
        },
    },
    {
        highlighted: true,
        name: 'Pro',
        info: 'For small businesses',
        price: {
            monthly: 2499,
            yearly: 2299,
        },
        features: [
            'Up to 500 Blog Posts',
            'Up to 500 Transcriptions',
            'Up to 500 Posts stored',
            'Unlimited Markdown support',
            'SEO optimization tools',
            'Priority support',
            'AI powered suggestions',
        ],
        btn: {
            text: 'Get Started Now',
            href: '#',
        },
    },
    {
        name: 'Business',
        info: 'For large organizations',
        price: {
            monthly: 3499,
            yearly: 3399,
        },
        features: [
            'Unlimited Blog Posts',
            'Unlimited Transcriptions',
            'Unlimited Posts stored',
            'Unlimited Markdown support',
            'SEO optimization tools',
            'Priority support',
            'AI powered suggestions',
        ],
        btn: {
            text: 'Get Started Now',
            href: '#',
        },
    },
];

export function PricingSection() {
    const [frequency, setFrequency] = React.useState<'monthly' | 'yearly'>(
        'monthly',
    );

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-7">
            <div>
                <FrequencyToggle
                    frequency={frequency}
                    setFrequency={setFrequency}
                />
            </div>
            <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                {plans.map((plan, i) => (
                    <div key={i}>
                        <PricingCard
                            frequency={frequency}
                            key={plan.name}
                            plan={plan}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

type PricingCardProps = React.ComponentProps<'div'> & {
    plan: Plan;
    frequency?: FREQUENCY;
};

export function PricingCard({
    plan,
    className,
    frequency = 'monthly',
    ...props
}: PricingCardProps) {
    return (
        <div
            className={cn(
                'relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white p-2',
                className,
                plan.highlighted ? 'border-primary/50 shadow-light' : 'border-border',
            )}
            key={plan.name}
            {...props}
        >
            <div
                className={cn(
                    'rounded-xl p-5',
                    plan.highlighted ? 'bg-primary' : 'bg-accent/50',
                )}
            >
                <AnimatePresence mode="wait">
                    <div className="absolute top-6 right-0 z-10 flex items-center gap-2">
                        {plan.highlighted && (
                            <motion.div
                                className="flex items-center gap-1 rounded-md bg-background px-3 py-1 text-xs"
                                key="popular-badge"
                                layout
                                transition={{ duration: 0.1 }}
                            >
                                <IconStar className="size-3 fill-current text-destructive" />
                                Popular
                            </motion.div>
                        )}
                    </div>
                </AnimatePresence>

                <div
                    className={cn(
                        'text-xl font-medium',
                        plan.highlighted ? 'text-white' : 'text-foreground',
                    )}
                >
                    {plan.name}
                </div>
                <h3
                    className={cn(
                        '= flex w-max items-end gap-1',
                        plan.highlighted ? 'text-white' : 'text-foreground',
                    )}
                >
                    <NumberFlow
                        className={cn(
                            'text-3xl font-medium [&::part(suffix)]:text-base [&::part(suffix)]:font-normal',
                            plan.highlighted
                                ? '[&::part(suffix)]:text-white'
                                : '[&::part(suffix)]:text-foreground',
                        )}
                        format={{
                            style: 'currency',
                            currency: 'BDT',
                            notation: 'standard',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }}
                        suffix="/month"
                        value={plan.price[frequency]}
                    />
                </h3>
                <p
                    className={cn(
                        'text-base font-normal',
                        plan.highlighted
                            ? 'text-white'
                            : 'text-muted-foreground',
                    )}
                >
                    {plan.info}
                </p>

                <SlideUpButton
                    onClick={() => router.get(plan.btn.href)}
                    variant={plan.highlighted ? 'primary' : 'light'}
                    className={cn(
                        'mt-8 w-full',
                        plan.highlighted ? '' : 'border border-border/70',
                    )}
                >
                    {plan.btn.text} <ChevronRight className="size-4" />
                </SlideUpButton>
            </div>

            <div
                className={cn(
                    'flex h-full flex-col justify-between gap-3 rounded-3xl p-4 text-sm text-muted-foreground',
                )}
            >
                <p className="mt-4 text-xl font-medium text-foreground">
                    What's Included:
                </p>

                {plan.features.map((feature) => (
                    <div className="flex items-center gap-2" key={feature}>
                        <IconCircleCheck className="size-3.5 text-foreground" />
                        <p className="text-foreground">{feature}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
