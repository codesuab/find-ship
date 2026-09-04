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
import { router, useForm } from '@inertiajs/react';
import {
    Check,
    Eye,
    Loader,
    Pen,
    Plus,
    SearchIcon,
    Trash,
    X,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface AdminData {
    id: number | null;
    name: string;
    email: string;
    phone: string;
    gender: string;
    country: string;
    city: string;
    zip: string;
    address: string;
    company_logo?: string | null;
    company_name?: string;
    company_type?: string;
    company_address?: string;
    balance: number | 0;
    status: 'active' | 'pending' | 'suspend';
    status_message: string;
    avatar: string | null;
    onboarding_completed: 0 | 1;
    google_id?: string;
    facebook_id?: string;

    last_login_at: string | null;
    last_login_ip: string | null;
    login_device_id: string | null;
    login_device_name: string | null;
    login_browser: string | null;
    login_os: string | null;
}

interface FormData {
    id?: number | null;
    name: string;
    email: string;
    phone: string;
    password: string;
    balance: number | 0;
    status: 'active' | 'pending' | 'suspend';
    status_message: string;
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

interface PageData {
    data: PaginationData;
    filter: {
        search?: string;
    };
}

export default function customer({ data: initData, filter }: PageData) {
    // data
    const statusItems = [
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Suspend', value: 'suspend' },
    ];

    // delete bulk
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bulkDelete, setBulkDelete] = useState(false);

    const handleDelete = () => {
        setBulkDelete(true);

        router.delete(route('admin.customer.delete.bulk'), {
            onFinish: () => {
                setBulkDelete(false);
                setSelectedIds([]);
            },
        });
    };

    // form
    const [formModel, setFormModel] = useState<boolean>(false);
    const { data, setData, processing, post, errors, reset } =
        useForm<FormData>({
            id: null,
            name: '',
            email: '',
            phone: '',
            password: '',
            balance: 0,
            status: 'active',
            status_message: '',
        });

    const handleSaveAdmin = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.customer.store'), {
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
                route('admin.customer.index'),
                { search: search },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // preview dialog
    const [preview, setPreview] = useState<AdminData | null>(null);

    return (
        <AdminLayout title="Admin list">
            <PageHeader
                title="All Customers"
                subtitle="Manage and view all customer accounts"
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
                    <Button onClick={() => setFormModel(true)}>
                        <Plus />
                        Add New
                    </Button>

                    {selectedIds.length > 0 && (
                        <>
                            <Confirmation
                                callBack={() => {
                                    router.post(
                                        route('admin.customer.delete.bulk'),
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
                            key: 'customer',
                            label: 'Customer',
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
                                    <div className="flex flex-col">
                                        <h1>#{row.id}</h1>
                                        <h1>{row.name}</h1>
                                        <small>{row.phone || '--'}</small>
                                        <small>{row.email || '--'}</small>
                                    </div>
                                </div>
                            ),
                        },
                        {
                            key: 'company',
                            label: 'Company',
                            render: (row) => (
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={`/storage/${row.company_logo}`}
                                        />
                                        <AvatarFallback>
                                            {row.company_name
                                                ?.slice(0, 2)
                                                .toLocaleUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <h1>{row.company_name}</h1>
                                        <small>
                                            {row.company_type || '--'}
                                        </small>
                                    </div>
                                </div>
                            ),
                        },
                        {
                            key: 'country',
                            label: 'Location',
                            render: (row) => (
                                <div>
                                    <p className="capitalize">{row.country}</p>
                                    <small className="capitalize">
                                        {row.city} - {row.zip}
                                    </small>
                                </div>
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
                            key: 'is_active',
                            label: 'Status',
                            render: (row) => (
                                <Badge
                                    className="capitalize"
                                    variant={
                                        Boolean(row.status == 'active')
                                            ? 'default'
                                            : 'destructive'
                                    }
                                >
                                    {row.status}
                                </Badge>
                            ),
                        },
                        {
                            key: 'actions',
                            label: 'Actions',
                            render: (row) => (
                                <div className="flex items-center gap-2 md:max-w-5">
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => setPreview(row)}
                                    >
                                        <Eye />
                                    </Button>
                                    <Confirmation
                                        callBack={() =>
                                            router.delete(
                                                route('admin.customer.delete', {
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
                                    <Button
                                        onClick={() => {
                                            setData('id', row.id);
                                            setData('email', row.email);
                                            setData('name', row.name);
                                            setData(
                                                'balance',
                                                row.balance || 0,
                                            );
                                            setData('phone', row.phone);
                                            setData('status', row.status);
                                            setData(
                                                'status_message',
                                                row.status_message,
                                            );
                                            setFormModel(true);
                                        }}
                                        variant="ghost"
                                        size="icon-sm"
                                    >
                                        <Pen />
                                    </Button>
                                </div>
                            ),
                        },
                    ]}
                    pagination={initData}
                    selectable
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
                    className="w-full md:max-w-150"
                >
                    <DialogHeader>
                        <DialogTitle>
                            {data.id ? 'Update Customer' : 'Add Customer'}
                        </DialogTitle>
                        <DialogDescription>
                            {data.id
                                ? 'Update the customer account details below.'
                                : 'Add a new customer account by providing the details below.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 gap-4 py-5 md:grid-cols-2">
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
                            <Label>Phone*</Label>
                            <Input
                                type="tel"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                inputSize="sm"
                            />
                            {errors.phone && (
                                <FieldDescription className="text-destructive">
                                    {errors.phone}
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
                                defaultValue={data.status}
                                onValueChange={(value) =>
                                    setData('status', value || 'active')
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
                            {errors.status && (
                                <FieldDescription className="text-destructive">
                                    {errors.status}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <Label>Balance*</Label>
                            <Input
                                type="number"
                                value={data.balance}
                                onChange={(e) =>
                                    setData(
                                        'balance',
                                        Number(e.target.value || 0),
                                    )
                                }
                                inputSize="sm"
                            />
                            {errors.balance && (
                                <FieldDescription className="text-destructive">
                                    {errors.balance}
                                </FieldDescription>
                            )}
                        </Field>

                        {data.status == 'suspend' && (
                            <Field className="col-span-1 md:col-span-2">
                                <Label>Status Message*</Label>
                                <Textarea
                                    value={data.status_message}
                                    onChange={(e) =>
                                        setData(
                                            'status_message',
                                            e.target.value,
                                        )
                                    }
                                />
                                {errors.status_message && (
                                    <FieldDescription className="text-destructive">
                                        {errors.status_message}
                                    </FieldDescription>
                                )}
                            </Field>
                        )}
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

            {/* preview dialog */}
            <Dialog open={preview ? true : false}>
                <DialogContent
                    showCloseButton={false}
                    className="w-full md:max-w-150"
                >
                    <DialogHeader>
                        <DialogTitle>Customer Details</DialogTitle>
                        <DialogDescription>
                            Preview the customer account details below.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="no-scrollbar max-h-[50vh] space-y-3 overflow-y-auto p-2">
                        <div className="flex items-center justify-end gap-2">
                            <Badge
                                className="capitalize"
                                variant={
                                    preview?.onboarding_completed == 0
                                        ? 'destructive'
                                        : 'default'
                                }
                            >
                                Account:{' '}
                                {preview?.onboarding_completed == 0
                                    ? 'Incomplete'
                                    : 'Complete'}
                            </Badge>
                            <Badge
                                className="capitalize"
                                variant={
                                    preview?.status == 'suspend'
                                        ? 'destructive'
                                        : 'default'
                                }
                            >
                                {preview?.status}
                            </Badge>
                            <Badge>Balance: {preview?.balance || 0}</Badge>
                        </div>
                        {/* personal */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                <Avatar size="lg">
                                    <AvatarImage
                                        src={`/storage/${preview?.avatar}`}
                                    />
                                    <AvatarFallback>
                                        {preview?.name
                                            .slice(0, 2)
                                            .toLocaleUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Name:</TableCell>
                                            <TableCell className="border-r border-border">
                                                {preview?.name}
                                            </TableCell>
                                            <TableCell>Email:</TableCell>
                                            <TableCell>
                                                {preview?.email}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Gender:</TableCell>
                                            <TableCell className="border-r border-border">
                                                {preview?.gender}
                                            </TableCell>
                                            <TableCell>Country:</TableCell>
                                            <TableCell>
                                                {preview?.country}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>City:</TableCell>
                                            <TableCell className="border-r border-border">
                                                {preview?.city}
                                            </TableCell>
                                            <TableCell>Zip:</TableCell>
                                            <TableCell>
                                                {preview?.zip}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Address:</TableCell>
                                            <TableCell className="border-r border-border">
                                                {preview?.address}
                                            </TableCell>
                                            <TableCell>Zip:</TableCell>
                                            <TableCell>
                                                {preview?.zip}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* company */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Company Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                <Avatar size="lg">
                                    <AvatarImage
                                        src={`/storage/${preview?.company_logo}`}
                                    />
                                    <AvatarFallback>
                                        {preview?.company_name
                                            ?.slice(0, 2)
                                            .toLocaleUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Name:</TableCell>
                                            <TableCell className="border-r border-border">
                                                {preview?.company_name}
                                            </TableCell>
                                            <TableCell>Type:</TableCell>
                                            <TableCell>
                                                {preview?.company_type}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Address:</TableCell>
                                            <TableCell colSpan={3}>
                                                {preview?.company_address}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* security */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Last login:</TableCell>
                                            <TableCell className="border-r border-border">
                                                {preview?.last_login_at}
                                            </TableCell>
                                            <TableCell>Last Ip:</TableCell>
                                            <TableCell>
                                                {preview?.last_login_ip}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Last Os:</TableCell>
                                            <TableCell>
                                                {preview?.login_os}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* account */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Social Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Google:</TableCell>
                                            <TableCell className="border-r border-border">
                                                <Badge
                                                    variant={
                                                        preview?.google_id
                                                            ? 'default'
                                                            : 'destructive'
                                                    }
                                                >
                                                    {preview?.google_id ? (
                                                        <>
                                                            <Check /> Connected
                                                        </>
                                                    ) : (
                                                        <>
                                                            <X /> Not connected
                                                        </>
                                                    )}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>Facebook:</TableCell>
                                            <TableCell className="border-r border-border">
                                                <Badge
                                                    variant={
                                                        preview?.facebook_id
                                                            ? 'default'
                                                            : 'destructive'
                                                    }
                                                >
                                                    {preview?.facebook_id ? (
                                                        <>
                                                            <Check /> Connected
                                                        </>
                                                    ) : (
                                                        <>
                                                            <X /> Not connected
                                                        </>
                                                    )}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={() => {
                                setPreview(null);
                            }}
                            variant="secondary"
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
