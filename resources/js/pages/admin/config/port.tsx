import Can from '@/components/Can';
import Confirmation from '@/components/Confirmation';
import GlobalTable from '@/components/GlobalTable';
import PageHeader from '@/components/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import AdminLayout from '@/Layouts/AdminLayout';
import { router, useForm } from '@inertiajs/react';
import { Loader, Pen, Plus, SearchIcon, Trash, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';

interface TableData {
    id: number;
    name: string;
    status: 'active' | 'inactive';
    port_code: string;
    created_at: string;
    updated_at: string;
    longitude?: string;
    latitude?: string;
    country?: {
        id: number;
        name: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    data: TableData[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

interface countryData {
    label: string;
    value: number;
}

interface PageProps {
    initData: PaginationData;
    filter?: {
        search?: string;
        country_id?: string;
    };
    country: countryData[];
}

interface FromData {
    id: number | null;
    country_id: string | '';
    name: string;
    port_code: string;
    status: 'active' | 'inactive';
}
export default function port({ initData, filter, country }: PageProps) {
    // delete bulk
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bulkDelete, setBulkDelete] = useState(false);
    const handleDelete = () => {
        setBulkDelete(true);

        router.delete(route('admin.port.delete.bulk'), {
            onFinish: () => {
                setBulkDelete(false);
                setSelectedIds([]);
            },
        });
    };

    // search
    const [search, setSearch] = useState(filter?.search || '');
    const [searchCountry, setSearchCountry] = useState(
        filter?.country_id || '',
    );
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            router.get(
                route('admin.port.index'),
                { search: search, country_id: searchCountry },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search,searchCountry]);

    // form
    const [formModel, setFormModel] = useState<boolean>(false);
    const { data, setData, processing, post, errors, reset } =
        useForm<FromData>({
            id: null,
            name: '',
            country_id: '',
            port_code: '',
            status: 'active',
        });

    const handleSaveAdmin = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.port.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setFormModel(false);
            },
        });
    };

    return (
        <AdminLayout title="DataDoc API Config">
            <PageHeader
                title="Ports"
                subtitle="Manage ports and their operational information."
            >
                <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
                    <InputGroup className="w-fit">
                        <InputGroupInput
                            id="inline-start-input"
                            placeholder="Search..."
                            type="search"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <InputGroupAddon align="inline-start">
                            <SearchIcon className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                    <Combobox
                        items={country}
                        onValueChange={(value) =>
                            setSearchCountry(String(value))
                        }
                        value={
                            country.find(
                                (item) =>
                                    Number(item.value) == Number(searchCountry),
                            )?.label ?? ''
                        }
                    >
                        <ComboboxInput
                            placeholder="Select a country"
                            showClear
                            className="h-8 rounded-xl"
                        />
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                                {(items, i) => (
                                    <ComboboxItem key={i} value={items.value}>
                                        {items.label}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>

                    {Can('port.create') && (
                        <Button onClick={() => setFormModel(true)}>
                            <Plus />
                            Add New
                        </Button>
                    )}

                    {selectedIds.length > 0 && Can('port.delete') && (
                        <>
                            <Confirmation
                                callBack={() => {
                                    router.post(
                                        route('admin.port.delete.bulk'),
                                        {
                                            ids: selectedIds,
                                        },
                                    );
                                }}
                            >
                                <Button
                                    disabled={bulkDelete}
                                    onClick={handleDelete}
                                    variant="destructive"
                                >
                                    {bulkDelete ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        <>
                                            <Trash /> Delete(
                                            {selectedIds.length})
                                        </>
                                    )}
                                </Button>
                            </Confirmation>

                            <Button onClick={() => setSelectedIds([])}>
                                <X /> Deselect All
                            </Button>
                        </>
                    )}
                </div>
            </PageHeader>

            <GlobalTable
                data={initData.data}
                columns={[
                    {
                        key: 'name',
                        label: 'Port',
                    },
                    {
                        key: 'port_code',
                        label: 'Code',
                    },
                    {
                        key: 'port_code',
                        label: 'Country',
                        render: (row) => <span>{row.country?.name}</span>,
                    },
                    {
                        key: 'status',
                        label: 'Status',
                        render: (row) => (
                            <Badge
                                className="capitalize"
                                variant={
                                    row.status == 'active'
                                        ? 'default'
                                        : 'destructive'
                                }
                            >
                                {row?.status}
                            </Badge>
                        ),
                    },
                    {
                        key: 'created_at',
                        label: 'Create',
                    },
                    {
                        key: 'updated_at',
                        label: 'Last update',
                    },
                    {
                        key: 'actions',
                        label: 'Actions',
                        render: (row) => (
                            <div className="flex max-w-5 items-center gap-2">
                                {Can('port.delete') && (
                                    <Confirmation
                                        callBack={() =>
                                            router.delete(
                                                route('admin.port.delete', {
                                                    id: row.id,
                                                }),
                                            )
                                        }
                                    >
                                        <Button
                                            variant="ghostDel"
                                            size="icon-sm"
                                        >
                                            <Trash />
                                        </Button>
                                    </Confirmation>
                                )}

                                {Can('port.update') && (
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => {
                                            setData('id', row.id);
                                            setData('name', row.name);
                                            setData('status', row.status);
                                            setData('port_code', row.port_code);
                                            setData(
                                                'country_id',
                                                String(row.country?.id),
                                            );
                                            setFormModel(true);
                                        }}
                                    >
                                        <Pen />
                                    </Button>
                                )}
                            </div>
                        ),
                    },
                ]}
                pagination={initData}
                selectable={Can('api.delete')}
                selectedIds={selectedIds}
                onSelectionChange={(ids) => {
                    setSelectedIds(ids as number[]);
                }}
            />

            {/* add or update model */}
            <Dialog open={formModel}>
                <DialogContent
                    showCloseButton={false}
                    className="w-full md:max-w-100"
                >
                    <DialogHeader>
                        <DialogTitle>
                            {data.id ? 'Update Port' : 'Add New Port'}
                        </DialogTitle>

                        <DialogDescription>
                            {data.id
                                ? 'Update the port details below.'
                                : 'Add a new port by providing the details below.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Field>
                            <Label>Name*</Label>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                inputSize="sm"
                            />
                            {errors.name && (
                                <FieldDescription className="text-destructive">
                                    {errors.name}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <Label>Port Code*</Label>
                            <Input
                                type="text"
                                value={data.port_code}
                                onChange={(e) =>
                                    setData('port_code', e.target.value)
                                }
                                inputSize="sm"
                            />
                            {errors.port_code && (
                                <FieldDescription className="text-destructive">
                                    {errors.port_code}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel>Country*</FieldLabel>

                            <Combobox
                                items={country}
                                onValueChange={(value) =>
                                    setData(
                                        'country_id',
                                        (value as string | null) ?? '',
                                    )
                                }
                                value={
                                    country.find(
                                        (item) =>
                                            Number(item.value) ==
                                            Number(data.country_id),
                                    )?.label ?? ''
                                }
                            >
                                <ComboboxInput
                                    placeholder="Select a country"
                                    showClear
                                    className="h-10 rounded-xl"
                                />
                                <ComboboxContent>
                                    <ComboboxEmpty>
                                        No items found.
                                    </ComboboxEmpty>
                                    <ComboboxList>
                                        {(items, i) => (
                                            <ComboboxItem
                                                key={i}
                                                value={items.value}
                                            >
                                                {items.label}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>

                            <FieldDescription className="text-destructive">
                                {errors.country_id}
                            </FieldDescription>
                        </Field>
                        <Field>
                            <Label>Status*</Label>
                            <Select
                                items={[
                                    { label: 'Active', value: 'active' },
                                    { label: 'Inactive', value: 'inactive' },
                                ]}
                                onValueChange={(value) =>
                                    setData(
                                        'status',
                                        value as 'active' | 'inactive',
                                    )
                                }
                                value={data.status}
                            >
                                <SelectTrigger className="max-h-10">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {[
                                            {
                                                label: 'Active',
                                                value: 'active',
                                            },
                                            {
                                                label: 'Inactive',
                                                value: 'inactive',
                                            },
                                        ].map((item) => (
                                            <SelectItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <FieldDescription className="text-destructive">
                                    {errors.status}
                                </FieldDescription>
                            )}
                        </Field>
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={() => {
                                reset();
                                setFormModel(false);
                            }}
                            variant="secondary"
                        >
                            Close
                        </Button>
                        <Button onClick={handleSaveAdmin} disabled={processing}>
                            {processing ? (
                                <Loader className="animate-spin" />
                            ) : (
                                'Save Now'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
