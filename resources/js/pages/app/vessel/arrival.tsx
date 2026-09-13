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
import { Filter, Loader, Ship, X } from 'lucide-react';
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
import { InfiniteScroll, router, Link } from '@inertiajs/react';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';

interface country {
    value: number;
    label: string;
}
interface ports {
    country_id: number;
    value: number;
    label: string;
}
interface SearchData {
    country: number | '';
    port: number | '';
    from: string | '';
    to: string | '';
    type: string | '';
}

interface DataProps {
    id: number;
    imo: string;
    mmsi: string;
    type: string;
    year: string;
    sizes: string;
    formattedETA: string;
    last_port: string;
    port_id: number;
    target: string;
    port?: {
        id: number;
        name: string;
    };
}

interface pageProps {
    country?: country[];
    ports?: ports[];
    vesselType: [string];
    data: {
        data: DataProps[];
    };
    filter?: {
        country?: number;
        port?: number;
        form?: string;
        to?: string;
        type?: string;
    };
}

interface SearchData {
    country: number | '';
    port: number | '';
    from: string | '';
    to: string | '';
    type: string | '';
}

export default function arrival({
    country,
    ports,
    vesselType,
    filter,
    data,
}: pageProps) {
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

    // filter
    const [processing, setProcessing] = useState(false);
    const [search, setSearch] = useState<SearchData>({
        country: filter?.country || '',
        port: filter?.port || '',
        from: filter?.form || '',
        to: filter?.to || '',
        type: filter?.type || '',
    });
    const FilterPort = ports?.filter(
        (p) =>
            !search.country || String(p.country_id) === String(search.country),
    );
    const handleFilter = () => {
        setProcessing(true);

        router.get(
            route('app.arrival.index'),
            {
                port: search.port,
                from: search.from,
                to: search.to,
                type: search.type,
            },
            {
                onFinish: () => setProcessing(false),
            },
        );
    };

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
                                <Label>Country</Label>
                                <Combobox
                                    items={country}
                                    onInputValueChange={(value) =>
                                        setSearch((prev) => ({
                                            ...prev,
                                            country: Number(value),
                                        }))
                                    }
                                >
                                    <ComboboxInput
                                        placeholder="Select a country"
                                        showClear
                                        value={
                                            country?.find(
                                                (item) =>
                                                    Number(item.value) ==
                                                    Number(search.country),
                                            )?.label ?? ''
                                        }
                                    />
                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No items found.
                                        </ComboboxEmpty>
                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem
                                                    key={item}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </Field>
                            <Field>
                                <Label>Port</Label>
                                <Combobox
                                    items={FilterPort}
                                    onInputValueChange={(value) => [
                                        setSearch((prev) => ({
                                            ...prev,
                                            port: Number(value),
                                        })),
                                    ]}
                                >
                                    <ComboboxInput
                                        placeholder="Select a port"
                                        showClear
                                        value={
                                            ports?.find(
                                                (item) =>
                                                    Number(item.value) ==
                                                    Number(search.port),
                                            )?.label ?? ''
                                        }
                                    />
                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No items found.
                                        </ComboboxEmpty>
                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem
                                                    key={item}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </Field>
                            <Field>
                                <Label>From</Label>
                                <Input
                                    type="date"
                                    inputSize="xs"
                                    value={search.from}
                                    onChange={(e) =>
                                        setSearch((prev) => ({
                                            ...prev,
                                            from: e.target.value,
                                        }))
                                    }
                                />
                            </Field>
                            <Field>
                                <Label>To</Label>
                                <Input
                                    type="date"
                                    inputSize="xs"
                                    value={search.to}
                                    onChange={(e) =>
                                        setSearch((prev) => ({
                                            ...prev,
                                            to: e.target.value,
                                        }))
                                    }
                                />
                            </Field>
                            <Field>
                                <Label>Type</Label>
                                <Combobox
                                    items={vesselType}
                                    defaultInputValue="All Type"
                                    onInputValueChange={(value) =>
                                        setSearch((prev) => ({
                                            ...prev,
                                            type: value,
                                        }))
                                    }
                                >
                                    <ComboboxInput
                                        placeholder="Vessel type"
                                        showClear
                                        value={search.type}
                                    />
                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No items found.
                                        </ComboboxEmpty>
                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem
                                                    key={item}
                                                    value={
                                                        item == 'All Type'
                                                            ? ''
                                                            : item
                                                    }
                                                >
                                                    {item}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </Field>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={handleFilter}
                                    disabled={processing}
                                    className="flex-1"
                                >
                                    {processing && (
                                        <Loader className="animate-spin" />
                                    )}
                                    Filter
                                </Button>
                                {(filter?.country ||
                                    filter?.form ||
                                    filter?.port ||
                                    filter?.to ||
                                    filter?.type) && (
                                    <Button
                                        onClick={() =>
                                            router.get(
                                                route('app.arrival.index'),
                                            )
                                        }
                                        variant="destructive"
                                        size="icon"
                                        className="shrink-0"
                                    >
                                        <X />
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                    <SidebarInput placeholder="Imo or mmsi..." />
                </SidebarHeader>

                {/* data */}
                <SidebarContent className="space-y-2 p-3">
                    <InfiniteScroll
                        data="data"
                        preserveUrl
                        loading={() => 'Loading more vessel...'}
                    >
                        {data?.data?.length > 0 ? (
                            data?.data?.map((item, i) => (
                                <Card key={i}>
                                    <CardContent>
                                        <h1 className="text-sm font-bold text-foreground">
                                            {item.imo}/{item.mmsi}
                                        </h1>

                                        <div className="mt-2 flex items-center justify-between gap-1">
                                            <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                                                {item.last_port
                                                    ?.slice(0, 2)
                                                    .toLocaleUpperCase()}
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
                                                {item.port?.name
                                                    ?.slice(0, 2)
                                                    .toLocaleUpperCase()}
                                            </span>
                                        </div>

                                        <div className="mt-1 flex items-center justify-between">
                                            <p className="text-xs font-medium text-muted-foreground">
                                                {item.last_port}
                                            </p>
                                            <p className="text-xs font-medium text-muted-foreground">
                                                {item.port?.name}
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
                            ))
                        ) : (
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <Ship />
                                    </EmptyMedia>

                                    <EmptyTitle>
                                        No Vessel Arrivals Found
                                    </EmptyTitle>

                                    <EmptyDescription>
                                        There are currently no vessel arrival
                                        records available.
                                    </EmptyDescription>
                                </EmptyHeader>

                                <Button
                                    variant="link"
                                    className="text-muted-foreground"
                                    size="sm"
                                    nativeButton={false}
                                    render={
                                        <Link href={route('app.arrival.index')}>
                                            Refresh page
                                        </Link>
                                    }
                                />
                            </Empty>
                        )}
                    </InfiniteScroll>
                </SidebarContent>
            </Sidebar>

            <div className="w-full">
                <div className="h-screen overflow-hidden">
                    <Map center={[91.8, 22.313]} zoom={8} theme={userTheme} />
                </div>
            </div>
        </CustomerLayout>
    );
}
