import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    ChartPie,
    EllipsisVertical,
    TrendingDown,
    TrendingUp,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { router } from '@inertiajs/react';

interface linksData {
    label: string;
    link: string;
}

interface PropsData {
    title?: string;
    value?: string;
    popularity?: number;
    popularityLevel?: number;
    popularityLabel?: string;
    popularityPosition?: 'up' | 'down';

    linkLabel?: string;
    links?: linksData[];

    icon?: React.ElementType;
}

export default function StateCard({
    title = 'Title',
    value = '৳1000',
    popularityLabel,
    popularityLevel,
    popularityPosition,
    links,
    linkLabel,

    icon,
}: PropsData) {
    const Icon = icon;
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <CardDescription>{title}</CardDescription>

                {(links?.length || 0) > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="link" />}>
                            <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                                {linkLabel && (
                                    <DropdownMenuLabel>
                                        {linkLabel}
                                    </DropdownMenuLabel>
                                )}
                                {links?.map((val, i) => (
                                    <DropdownMenuItem
                                        onClick={() =>
                                            router.get(route(val.link))
                                        }
                                        key={i}
                                    >
                                        {val.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </CardHeader>
            <CardContent className="relative">
                <h1 className="text-xl">{value}</h1>
                <div className="mt-2 flex items-center gap-2">
                    {popularityLevel && (
                        <Badge variant="secondary">
                            {popularityPosition == 'up' ? (
                                <TrendingUp />
                            ) : (
                                <TrendingDown />
                            )}
                            <span>{popularityLevel}</span>
                        </Badge>
                    )}
                    {popularityLabel && (
                        <p>{popularityLabel || 'than to last month'}</p>
                    )}
                </div>

                {Icon && (
                    <Icon className="absolute -right-5 -bottom-10 size-25 opacity-5" />
                )}
            </CardContent>
        </Card>
    );
}
