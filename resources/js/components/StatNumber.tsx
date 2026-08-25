import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import NumberFlow from '@number-flow/react';

export default function StatNumber({
    value,
    suffix,
    label,
}: {
    value: number;
    suffix?: string;
    label: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.5,
    });

    return (
        <div ref={ref}>
            <NumberFlow
                className="text-4xl font-medium [&::part(suffix)]:text-4xl [&::part(suffix)]:font-normal [&::part(suffix)]:text-foreground"
                format={{
                    style: 'decimal',
                    notation: 'standard',
                }}
                value={isInView ? value : 0}
                suffix={suffix}
                transformTiming={{
                    duration: 1800,
                    easing: 'ease-out',
                }}
            />

            <p className="text-xl text-muted-foreground">{label}</p>
        </div>
    );
}
