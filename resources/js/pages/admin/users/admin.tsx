import AdminLayout from '@/Layouts/AdminLayout';
import GlobalTable from '@/components/GlobalTable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Eye, Pen, Plus, SearchIcon, Trash } from 'lucide-react';
import { useState } from 'react';

interface AdminData {
    id: number;
    name: string;
    email: string;
    last_login_at: string | null;
    last_login_ip: string | null;
    avatar: string | null;
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
}

export default function admin({ data: initData }: PageData) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    return (
        <AdminLayout title="Admin list">
            <div className="m-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <InputGroup>
                        <InputGroupInput
                            id="inline-start-input"
                            placeholder="Search..."
                        />
                        <InputGroupAddon align="inline-start">
                            <SearchIcon className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                    <Button>
                        <Plus />
                        Add New
                    </Button>
                </div>
            </div>
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
                                    <Button variant="ghostDel" size="icon-sm">
                                        <Trash />
                                    </Button>
                                    <Button variant="ghost" size="icon-sm">
                                        <Pen />
                                    </Button>
                                    <Button variant="ghost" size="icon-sm">
                                        <Eye />
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
        </AdminLayout>
    );
}
