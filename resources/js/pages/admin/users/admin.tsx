import AdminLayout from '@/Layouts/AdminLayout';
import Confirmation from '@/components/Confirmation';
import GlobalTable from '@/components/GlobalTable';
import PageHeader from '@/components/PageHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { PageProps } from '@/types/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { Loader, Pen, Plus, SearchIcon, Shield, Trash, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
    ComboboxValue,
} from '@/components/ui/combobox';
import Can from '@/components/Can';

interface AdminData {
    id: number;
    name: string;
    email: string;
    last_login_at: string | null;
    last_login_ip: string | null;
    avatar: string | null;
    is_active: boolean;
    role_id: number | null;
    role?: {
        name: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    data: AdminData[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

interface RoleData {
    id: number;
    name: string;
    slug: string;
}

interface PageData {
    data: PaginationData;
    roles: RoleData[];
    filter: {
        search?: string;
    };
}

interface FromData {
    id?: number | null;
    role_id: number | null;
    name: string;
    email: string;
    password: string;
    is_active: boolean | true;
}

export default function admin({ data: initData, filter, roles }: PageData) {
    const { auth } = usePage<PageProps>().props;
    const admin = auth.admin;

    // data
    const statusItems = [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
    ];

    // delete bulk
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bulkDelete, setBulkDelete] = useState(false);

    const handleDelete = () => {
        setBulkDelete(true);

        router.delete(route('admin.admin.delete.bulk'), {
            onFinish: () => {
                setBulkDelete(false);
                setSelectedIds([]);
            },
        });
    };

    // form
    const [formModel, setFormModel] = useState<boolean>(false);
    const { data, setData, processing, post, errors, reset } =
        useForm<FromData>({
            id: null,
            name: '',
            email: '',
            password: '',
            role_id: null,
            is_active: true,
        });

    const handleSaveAdmin = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.admin.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setFormModel(false);
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
                route('admin.admin.index'),
                { search: search },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <AdminLayout title="Admin list">
            <PageHeader
                title="All Admin"
                subtitle="Manage and view all administrator accounts"
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
                    {Can('admins.create') && (
                        <Button onClick={() => setFormModel(true)}>
                            <Plus />
                            Add New
                        </Button>
                    )}

                    {selectedIds.length > 0 && Can('admin.delete') && (
                        <>
                            <Confirmation
                                callBack={() => {
                                    router.post(
                                        route('admin.admin.delete.bulk'),
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

            <div className="overflow-x-auto">
                <GlobalTable
                    data={initData.data}
                    columns={[
                        {
                            key: 'name',
                            label: 'Name',
                            render: (row) => (
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={`/storage/${row.avatar}`}
                                        />
                                        <AvatarFallback>
                                            {row.name
                                                ?.slice(0, 2)
                                                .toLocaleUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h1>{row.name}</h1>
                                </div>
                            ),
                        },
                        {
                            key: 'email',
                            label: 'Email',
                        },
                        {
                            key: 'role',
                            label: 'Role',
                            render: (row) => (
                                <Badge variant="secondary">
                                    <Shield /> {row.role?.name || 'Super Admin'}
                                </Badge>
                            ),
                        },
                        {
                            key: 'is_active',
                            label: 'Status',
                            render: (row) => (
                                <Badge
                                    variant={
                                        Boolean(row.is_active)
                                            ? 'default'
                                            : 'destructive'
                                    }
                                >
                                    {Boolean(row.is_active)
                                        ? 'Active'
                                        : 'Inactive'}
                                </Badge>
                            ),
                        },
                        {
                            key: 'last_login_at',
                            label: 'last login',
                        },
                        {
                            key: 'last_login_ip',
                            label: 'Login Ip',
                        },
                        {
                            key: 'actions',
                            label: 'Actions',
                            render: (row) => (
                                <div className="flex max-w-5 items-center gap-2">
                                    {Can('admins.delete') && (
                                        <Confirmation
                                            callBack={() =>
                                                router.delete(
                                                    route(
                                                        'admin.admin.delete',
                                                        {
                                                            id: row.id,
                                                        },
                                                    ),
                                                )
                                            }
                                        >
                                            <Button
                                                variant="ghostDel"
                                                size="icon-sm"
                                                disabled={admin?.id == row.id}
                                            >
                                                <Trash />
                                            </Button>
                                        </Confirmation>
                                    )}

                                    {Can('admin.update') && (
                                        <Button
                                            onClick={() => {
                                                setData('id', row.id);
                                                setData('email', row.email);
                                                setData('name', row.name);
                                                setData(
                                                    'is_active',
                                                    row.is_active,
                                                );
                                                setData('role_id', row.role_id);
                                                setFormModel(true);
                                            }}
                                            variant="ghost"
                                            size="icon-sm"
                                        >
                                            <Pen />
                                        </Button>
                                    )}
                                </div>
                            ),
                        },
                    ]}
                    pagination={initData}
                    selectable={Can('admins.delete')}
                    selectedIds={selectedIds}
                    onSelectionChange={(ids) => {
                        setSelectedIds(ids as number[]);
                    }}
                />
            </div>

            {/* add or update model */}
            <Dialog open={formModel}>
                <DialogContent
                    showCloseButton={false}
                    className="w-full md:max-w-100"
                >
                    <DialogHeader>
                        <DialogTitle>
                            {data.id ? 'Update Admin' : 'Add Admin'}
                        </DialogTitle>
                        <DialogDescription>
                            {data.id
                                ? 'Update the administrator account details below.'
                                : 'Add a new administrator account by providing the details below.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-5">
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
                            <Label>Email*</Label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                inputSize="sm"
                            />
                            {errors.email && (
                                <FieldDescription className="text-destructive">
                                    {errors.email}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <Label>Password*</Label>
                            <Input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                inputSize="sm"
                            />
                            {errors.password && (
                                <FieldDescription className="text-destructive">
                                    {errors.password}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <Label>Status*</Label>
                            <Select
                                items={statusItems}
                                defaultValue={data.is_active}
                                onValueChange={(value) =>
                                    setData('is_active', Boolean(value))
                                }
                            >
                                <SelectTrigger size="md">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {statusItems.map((item, i) => (
                                            <SelectItem
                                                key={i}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.is_active && (
                                <FieldDescription className="text-destructive">
                                    {errors.is_active}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <Label>Role*</Label>
                            <Combobox
                                items={[
                                    {
                                        id: null,
                                        name: 'Select a Role',
                                        slug: '',
                                    },
                                    ...roles,
                                ]}
                                onValueChange={(val) =>
                                    setData('role_id', Number(val))
                                }
                            >
                                <ComboboxTrigger
                                    className="h-10"
                                    render={
                                        <Button
                                            variant="outline"
                                            className="justify-between font-normal"
                                        >
                                            {
                                                roles.find(
                                                    (val) =>
                                                        val.id == data.role_id,
                                                )?.name
                                            }
                                        </Button>
                                    }
                                />
                                <ComboboxContent>
                                    <ComboboxInput
                                        showTrigger={false}
                                        placeholder="Search"
                                    />
                                    <ComboboxEmpty>
                                        No items found.
                                    </ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                                {item.slug && `(${item.slug})`}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                            {errors.role_id && (
                                <FieldDescription className="text-destructive">
                                    {errors.role_id}
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
