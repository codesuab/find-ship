import PageHeader from '@/components/PageHeader';
import AdminLayout from '@/Layouts/AdminLayout';
import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import Confirmation from '@/components/Confirmation';
import GlobalTable from '@/components/GlobalTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Loader, Pen, Plus, SearchIcon, Trash, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { permission } from '@/constant/Permission';
import { Checkbox } from '@/components/ui/checkbox';
import Can from '@/components/Can';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import StateCard from '@/components/StateCard';
import { GiToken } from 'react-icons/gi';
import {
    MdOutlineElectricalServices,
    MdOutlineRunningWithErrors,
} from 'react-icons/md';
import { RxReload } from 'react-icons/rx';

interface ApiData {
    id: number;
    label: string;
    uri: string;
    key: string;
    token: number;
    status: 'active' | 'inactive';
}

interface FromData {
    id: number | null;
    label: string;
    uri: string;
    key: string;
    token: number;
    status: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    data: ApiData[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

interface PageProps {
    initData: PaginationData;
    filter: {
        search: string;
    };
    totalToken: number;
    totalApi: number;
    currentActive: {
        label: string;
        token: number;
    };
}

export default function dataDoc({
    initData,
    filter,
    totalToken,
    totalApi,
    currentActive,
}: PageProps) {
    // delete bulk
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bulkDelete, setBulkDelete] = useState(false);
    const handleDelete = () => {
        setBulkDelete(true);

        router.delete(route('admin.datadoc.delete.bulk'), {
            onFinish: () => {
                setBulkDelete(false);
                setSelectedIds([]);
            },
        });
    };

    // search
    const [search, setSearch] = useState(filter?.search || '');
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            router.get(
                route('admin.datadoc.index'),
                { search: search },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // form
    const [formModel, setFormModel] = useState<boolean>(false);
    const { data, setData, processing, post, errors, reset } =
        useForm<FromData>({
            id: null,
            label: '',
            token: 0,
            uri: 'https://datadocked.com/api',
            key: '',
            status: 'inactive',
        });

    const handleSaveAdmin = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.datadoc.post'), {
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
                title="DataDock API Configuration"
                subtitle="Configure your DataDock API connection and settings."
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

                    {Can('api.create') && (
                        <Button onClick={() => setFormModel(true)}>
                            <Plus />
                            Add New
                        </Button>
                    )}

                    {selectedIds.length > 0 && Can('api.delete') && (
                        <>
                            <Confirmation
                                callBack={() => {
                                    router.post(
                                        route('admin.datadoc.delete.bulk'),
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

            <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-5">
                <StateCard
                    title="Total Token"
                    value={`${String(totalToken)} Token`}
                    icon={GiToken}
                />
                <StateCard
                    title="Total API"
                    value={String(totalApi)}
                    icon={MdOutlineElectricalServices}
                />
                <StateCard
                    title="Current Running"
                    value={`${currentActive.label}(${String(currentActive.token.toLocaleString('en-BD'))})`}
                    icon={MdOutlineRunningWithErrors}
                />
            </div>

            <GlobalTable
                data={initData.data}
                columns={[
                    {
                        key: 'label',
                        label: 'Label',
                    },
                    {
                        key: 'token',
                        label: 'Token',
                    },
                    {
                        key: 'uri',
                        label: 'Uri',
                    },
                    {
                        key: 'key',
                        label: 'Key',
                        render: (row) => (
                            <div className="flex items-center">
                                <span>{row.key?.slice(0, 5)}</span>
                                <span>xxxxxxxxx</span>
                                <span>{row.key?.slice(5, 10)}</span>
                            </div>
                        ),
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
                        label: 'Created At',
                    },
                    {
                        key: 'actions',
                        label: 'Actions',
                        render: (row) => (
                            <div className="flex max-w-5 items-center gap-2">
                                {Can('api.delete') && (
                                    <Confirmation
                                        callBack={() =>
                                            router.delete(
                                                route('admin.datadoc.delete', {
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

                                {Can('api.update') && (
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => {
                                            setData('id', row.id);
                                            setData('key', row.key);
                                            setData('label', row.label);
                                            setData('status', row.status);
                                            setData('uri', row.uri);
                                            setData('token', row.token);
                                            setFormModel(true);
                                        }}
                                    >
                                        <Pen />
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={() => {
                                        router.get(
                                            route('admin.datadoc.balance', {
                                                id: row.id,
                                            }),
                                        );
                                    }}
                                >
                                    <RxReload />
                                </Button>
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
                            {data.id ? 'Update API' : 'Add New API'}
                        </DialogTitle>

                        <DialogDescription>
                            {data.id
                                ? 'Update the API configuration details below.'
                                : 'Add a new API configuration by providing the details below.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Field>
                            <Label>Label*</Label>
                            <Input
                                type="text"
                                value={data.label}
                                onChange={(e) =>
                                    setData('label', e.target.value)
                                }
                                inputSize="sm"
                            />
                            {errors.label && (
                                <FieldDescription className="text-destructive">
                                    {errors.label}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <Label>Token*</Label>
                            <Input
                                type="number"
                                value={data.token}
                                onChange={(e) =>
                                    setData(
                                        'token',
                                        Number(e.target.value || 0),
                                    )
                                }
                                inputSize="sm"
                            />
                            {errors.token && (
                                <FieldDescription className="text-destructive">
                                    {errors.token}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <Label>Uri*</Label>
                            <Input
                                type="url"
                                value={data.uri}
                                onChange={(e) => setData('uri', e.target.value)}
                                inputSize="sm"
                            />
                            {errors.uri && (
                                <FieldDescription className="text-destructive">
                                    {errors.uri}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <Label>Key*</Label>
                            <Input
                                type="text"
                                value={data.key}
                                onChange={(e) => setData('key', e.target.value)}
                                inputSize="sm"
                            />
                            {errors.key && (
                                <FieldDescription className="text-destructive">
                                    {errors.key}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <Label>Status*</Label>
                            <Select
                                items={[
                                    { label: 'Active', value: 'active' },
                                    { label: 'Inactive', value: 'inactive' },
                                ]}
                                onValueChange={(value) =>
                                    setData('status', String(value))
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
