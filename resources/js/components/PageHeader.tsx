import React, { PropsWithChildren } from 'react'
type Props = {
    title?: string;
    subtitle?: string;
};

export default function PageHeader({ children, title, subtitle }: PropsWithChildren<Props>) {
    return (
        <div className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1.5">
                <h1 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-sm text-muted-foreground">
                        {subtitle}
                    </p>
                )}
            </div>
            {children && (
                <div className="flex items-center gap-2">
                    {children}
                </div>
            )}
        </div>
    )
}
