import { cn } from '@/lib/utils'
import React from 'react'

export default function Logo({ show = 'dynamic', textClass, imageSize, className }: { show?: any, textClass?: string, imageSize?: string, className?: string }) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <img src="/media/system/find-ship-logo.avif" alt="find ship logo" className={cn('w-10 h-auto', imageSize)} />
            {show == 'dynamic' ? (
                <span className={
                    cn('font-semibold text-3xl capitalize hidden md:block', textClass)
                }>FindShip</span>
            ) : show && <span className={
                cn('font-semibold text-3xl capitalize', textClass)
            }>FindShip</span>}
        </div>
    )
}
