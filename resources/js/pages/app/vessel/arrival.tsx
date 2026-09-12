import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInput,
} from '@/components/ui/sidebar';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Filter, Ship, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { RiArrowRightSFill } from '@remixicon/react';
import { Card, CardContent } from '@/components/ui/card';
import { Map } from '@/components/ui/map';

export default function arrival() {
    const [showFilter, setShowFilter] = useState<Boolean>(false);
    const [userTheme, setUserTheme] = useState<'light' | 'dark'>('light');
    useEffect(() => {
        const localTheme = localStorage.getItem('shipfind-theme') || 'system';

        if (localTheme === 'system') {
            const systemTheme = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches
                ? 'dark'
                : 'light';

            setUserTheme(systemTheme);
        } else if (localTheme === 'light' || localTheme === 'dark') {
            setUserTheme(localTheme);
        }
    }, []);

    const frameworks = [
        'Next.js',
        'SvelteKit',
        'Nuxt.js',
        'Remix',
        'Astro',
    ] as const;
    return (
        <CustomerLayout bodyClass="flex flex-row p-0 sm:p-0">
            {/* sidebar */}
            <Sidebar
                collapsible="none"
                className="fixed top-0 left-0 z-90 min-w-75 flex-1 border-r border-border shadow-sm md:static md:z-auto md:flex md:shadow-none"
            >
                {/* header */}
                <SidebarHeader className="gap-3.5 border-b p-3">
                    <div className="flex w-full items-center justify-between">
                        <div className="text-base font-medium text-foreground">
                            Arrivals List
                        </div>

                        <Button
                            onClick={() => setShowFilter(!showFilter)}
                            variant="outline"
                            size="icon"
                        >
                            {showFilter ? <X /> : <Filter />}
                        </Button>
                    </div>
                    {showFilter && (
                        <div className="space-y-4 rounded-xl border border-border p-3">
                            <p className="mb-4 text-sm font-medium text-muted-foreground">
                                Filter:
                            </p>
                            <Field>
                                <Label>From</Label>
                                <Input type="date" inputSize="xs" />
                            </Field>
                            <Field>
                                <Label>To</Label>
                                <Input type="date" inputSize="xs" />
                            </Field>
                            <Field>
                                <Label>Type</Label>
                                <Combobox items={frameworks}>
                                    <ComboboxInput placeholder="Vessel type" />
                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No items found.
                                        </ComboboxEmpty>
                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </Field>
                            <Button className="w-full">Filter</Button>
                        </div>
                    )}
                    <SidebarInput placeholder="Imo or mmsi..." />
                </SidebarHeader>

                {/* data */}
                <SidebarContent className="space-y-2 p-3">
                    <Card>
                        <CardContent>
                            <h1 className="text-sm font-bold text-foreground">
                                9247431/655919000
                            </h1>

                            <div className="mt-2 flex items-center justify-between gap-1">
                                <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                                    SG
                                </span>

                                <div className="flex w-full items-center gap-px">
                                    <div
                                        className="border border-dotted border-muted-foreground"
                                        style={{
                                            width: 10 + '%',
                                        }}
                                    />

                                    <div className="min-w-fit">
                                        <Ship
                                            size={18}
                                            className="text-primary"
                                        />
                                    </div>

                                    <div className="flex w-full items-center">
                                        <div className="w-full border border-muted-foreground" />
                                        <RiArrowRightSFill
                                            size={18}
                                            className="-ml-2 min-w-fit"
                                        />
                                    </div>
                                </div>

                                <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium">
                                    CTG
                                </span>
                            </div>

                            <div className="mt-1 flex items-center justify-between">
                                <p className="text-xs font-medium text-muted-foreground">
                                    Singapore
                                </p>
                                <p className="text-xs font-medium text-muted-foreground">
                                    Chittagong
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-medium text-muted-foreground">
                                    SEP 12, 2026
                                </p>
                                <p className="text-[10px] font-medium text-muted-foreground">
                                    SEP 12, 2026
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <h1 className="text-sm font-bold text-foreground">
                                9247431/655919000
                            </h1>

                            <div className="mt-2 flex items-center justify-between gap-1">
                                <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                                    SG
                                </span>

                                <div className="flex w-full items-center gap-px">
                                    <div
                                        className="border border-dotted border-muted-foreground"
                                        style={{
                                            width: 10 + '%',
                                        }}
                                    />

                                    <div className="min-w-fit">
                                        <Ship
                                            size={18}
                                            className="text-primary"
                                        />
                                    </div>

                                    <div className="flex w-full items-center">
                                        <div className="w-full border border-muted-foreground" />
                                        <RiArrowRightSFill
                                            size={18}
                                            className="-ml-2 min-w-fit"
                                        />
                                    </div>
                                </div>

                                <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium">
                                    CTG
                                </span>
                            </div>

                            <div className="mt-1 flex items-center justify-between">
                                <p className="text-xs font-medium text-muted-foreground">
                                    Singapore
                                </p>
                                <p className="text-xs font-medium text-muted-foreground">
                                    Chittagong
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-medium text-muted-foreground">
                                    SEP 12, 2026
                                </p>
                                <p className="text-[10px] font-medium text-muted-foreground">
                                    SEP 12, 2026
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </SidebarContent>
            </Sidebar>

            <div className="w-full">
                <div className="h-screen overflow-hidden">
                    <Map
                        center={[-74.006, 40.7128]}
                        zoom={4}
                        theme={userTheme}
                    />
                </div>
            </div>
        </CustomerLayout>
    );
}
