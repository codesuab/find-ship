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
import { Field, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { permission } from '@/constant/Permission';
import { Checkbox } from '@/components/ui/checkbox';
import Can from '@/components/Can';

interface RoleData {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    admins_count:number | 0;
    permissions: {
        [module: string]: string[];
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    data: RoleData[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

interface PageData {
    data: PaginationData;
    filter: {
        search?: string;
    };
}

interface FromData {
    id: number | null;
    name: string;
    slug: string;
    permissions: Record<string, string[]>;
}

export default function role({ data: initData, filter }: PageData) {
    // delete bulk
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bulkDelete, setBulkDelete] = useState(false);
    const handleDelete = () => {
        setBulkDelete(true);

        router.delete(route('admin.role.delete.bulk'), {
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
                route('admin.role.index'),
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
            name: '',
            slug: '',
            permissions: {},
        });

    const togglePermission = (module: string, action: string) => {
        const current = data.permissions[module] ?? [];

        setData('permissions', {
            ...data.permissions,
            [module]: current.includes(action)
                ? current.filter((item) => item !== action)
                : [...current, action],
        });
    };

    const handleSaveAdmin = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.role.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setFormModel(false);
            },
        });
    };
    return (
        <AdminLayout title="Role and Permission">
            <PageHeader
                title="Roles & Permissions"
                subtitle="Manage roles and control access to system permissions."
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

                    {Can('roles.create') && (
                        <Button onClick={() => setFormModel(true)}>
                            <Plus />
                            Add New
                        </Button>
                    )}

                    {selectedIds.length > 0 && Can('roles.delete') && (
                        <>
                            <Confirmation
                                callBack={() => {
                                    router.post(
                                        route('admin.role.delete.bulk'),
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
                        label: 'Name',
                    },
                    {
                        key: 'slug',
                        label: 'Slug',
                    },
                    {
                        key: 'permission',
                        label: 'Permission',
                        render: (row) => (
                            <Badge>
                                {Object.values(row.permissions).reduce(
                                    (total, permissions) =>
                                        total + permissions.length,
                                    0,
                                )}{' '}
                                Permission
                            </Badge>
                        ),
                    },
                    {
                        key: 'admins_count',
                        label: 'Total Admins',
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
                                {Can('roles.delete') && (
                                    <Confirmation
                                        callBack={() =>
                                            router.delete(
                                                route('admin.role.delete', {
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

                                {Can('roles.update') && (
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => {
                                            setData('id', row.id);
                                            setData('name', row.name);
                                            setData('slug', row.slug);
                                            setData(
                                                'permissions',
                                                row.permissions,
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
                selectable={Can('roles.delete')}
                selectedIds={selectedIds}
                onSelectionChange={(ids) => {
                    setSelectedIds(ids as number[]);
                }}
            />

            {/* add or update model */}
            <Dialog open={formModel}>
                <DialogContent
                    showCloseButton={false}
                    className="w-full md:max-w-150"
                >
                    <DialogHeader>
                        <DialogTitle>
                            {data.id ? 'Update Role' : 'Add Role'}
                        </DialogTitle>
                        <DialogDescription>
                            {data.id
                                ? 'Update the role details and permissions below.'
                                : 'Create a new role and assign the required permissions below.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                <Label>Slug*</Label>
                                <Input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) =>
                                        setData('slug', e.target.value)
                                    }
                                    inputSize="sm"
                                />
                                {errors.slug && (
                                    <FieldDescription className="text-destructive">
                                        {errors.slug}
                                    </FieldDescription>
                                )}
                            </Field>
                        </div>
                        <p>Select Permission</p>
                        <div className="no-scrollbar max-h-50 space-y-3 overflow-y-auto border-t border-border px-2 pt-4">
                            {Object.entries(permission).map(
                                ([module, actions]) => (
                                    <div key={module} className="space-y-2">
                                        <p className="font-medium capitalize">
                                            {module}
                                        </p>

                                        <div className="mt-1 flex flex-wrap gap-3">
                                            {actions.map((action) => (
                                                <label
                                                    key={action}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Checkbox
                                                        checked={
                                                            data.permissions[
                                                                module
                                                            ]?.includes(
                                                                action,
                                                            ) ?? false
                                                        }
                                                        onCheckedChange={() =>
                                                            togglePermission(
                                                                module,
                                                                action,
                                                            )
                                                        }
                                                    />
                                                    <span className="capitalize">
                                                        {action}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
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
