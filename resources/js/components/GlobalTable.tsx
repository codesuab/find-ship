import React, { ReactNode, useState } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { router } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    path?: string;
    links?: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface TableColumn<T> {
    key: string;
    label: ReactNode;
    className?: string;
    headerClassName?: string;
    render?: (row: T, index: number) => ReactNode;
}

interface GlobalTableProps<T extends Record<string, any>> {
    data: T[];
    columns: TableColumn<T>[];

    pagination?: PaginationMeta;

    selectable?: boolean;

    selectedIds?: (string | number)[];
    rowKey?: keyof T | ((row: T) => string | number);

    onSelectionChange?: (ids: (string | number)[]) => void;

    emptyMessage?: ReactNode;

    className?: string;
}

export function GlobalTable<T extends Record<string, any>>({
    data,
    columns,
    pagination,
    selectable = false,
    selectedIds: controlledSelectedIds,
    rowKey = 'id',
    onSelectionChange,
    emptyMessage = 'No data found.',
    className = '',
}: GlobalTableProps<T>) {
    const [internalSelectedIds, setInternalSelectedIds] = useState<
        (string | number)[]
    >([]);

    const selectedIds = controlledSelectedIds ?? internalSelectedIds;

    const getRowId = (row: T) =>
        typeof rowKey === 'function'
            ? rowKey(row)
            : row[rowKey] as string | number;

    const updateSelection = (ids: (string | number)[]) => {
        if (controlledSelectedIds === undefined) {
            setInternalSelectedIds(ids);
        }

        onSelectionChange?.(ids);
    };

    const isAllSelected =
        data.length > 0 &&
        data.every((row) => selectedIds.includes(getRowId(row)));

    const toggleSelectAll = () => {
        if (isAllSelected) {
            updateSelection(
                selectedIds.filter(
                    (id) => !data.some((row) => getRowId(row) === id),
                ),
            );
        } else {
            const ids = data.map(getRowId);

            updateSelection([
                ...new Set([...selectedIds, ...ids]),
            ]);
        }
    };

    const toggleSelectOne = (id: string | number) => {
        updateSelection(
            selectedIds.includes(id)
                ? selectedIds.filter((item) => item !== id)
                : [...selectedIds, id],
        );
    };

    const goToPage = (url: string | null) => {
        if (!url) return;

        router.visit(url, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div
            className={`w-full overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-card ${className}`}
        >
            <div className="overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="border-b border-slate-200 dark:border-slate-800">
                            {selectable && (
                                <TableHead className="w-14 py-4 pr-2 pl-6">
                                    <Checkbox
                                        checked={isAllSelected}
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </TableHead>
                            )}

                            {columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={
                                        column.headerClassName ??
                                        'px-4 py-4 text-left text-sm font-semibold'
                                    }
                                >
                                    {column.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length > 0 ? (
                            data.map((row, index) => {
                                const id = getRowId(row);
                                const selected = selectedIds.includes(id);

                                return (
                                    <TableRow
                                        key={id}
                                        data-state={
                                            selected
                                                ? 'selected'
                                                : undefined
                                        }
                                        className="border-b border-slate-100 dark:border-slate-800"
                                    >
                                        {selectable && (
                                            <TableCell className="py-3.5 pr-2 pl-6">
                                                <Checkbox
                                                    checked={selected}
                                                    onCheckedChange={() =>
                                                        toggleSelectOne(id)
                                                    }
                                                />
                                            </TableCell>
                                        )}

                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.key}
                                                className={
                                                    column.className ??
                                                    'px-4 py-3.5'
                                                }
                                            >
                                                {column.render
                                                    ? column.render(
                                                          row,
                                                          index,
                                                      )
                                                    : row[column.key] ?? '-'}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        columns.length +
                                        (selectable ? 1 : 0)
                                    }
                                    className="h-32 text-center text-sm text-muted-foreground"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {pagination && pagination.last_page > 1 && (
                <div className="flex items-center justify-between border-t px-5 py-4">
                    <div className="text-sm text-muted-foreground">
                        Showing{' '}
                        <span className="font-medium text-foreground">
                            {pagination.from ?? 0}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium text-foreground">
                            {pagination.to ?? 0}
                        </span>{' '}
                        of{' '}
                        <span className="font-medium text-foreground">
                            {pagination.total}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            disabled={
                                pagination.current_page === 1
                            }
                            onClick={() =>
                                goToPage(
                                    pagination.links?.find(
                                        (link) =>
                                            link.label.includes(
                                                'Previous',
                                            ),
                                    )?.url ?? null,
                                )
                            }
                            className="inline-flex size-8 items-center justify-center rounded-md border disabled:pointer-events-none disabled:opacity-40"
                        >
                            <ChevronLeft className="size-4" />
                        </button>

                        {pagination.links
                            ?.filter(
                                (link) =>
                                    !link.label.includes('Previous') &&
                                    !link.label.includes('Next'),
                            )
                            .map((link, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() =>
                                        goToPage(link.url)
                                    }
                                    className={`inline-flex size-8 items-center justify-center rounded-md border text-sm ${
                                        link.active
                                            ? 'bg-primary text-primary-foreground'
                                            : ''
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}

                        <button
                            type="button"
                            disabled={
                                pagination.current_page ===
                                pagination.last_page
                            }
                            onClick={() =>
                                goToPage(
                                    pagination.links?.find(
                                        (link) =>
                                            link.label.includes(
                                                'Next',
                                            ),
                                    )?.url ?? null,
                                )
                            }
                            className="inline-flex size-8 items-center justify-center rounded-md border disabled:pointer-events-none disabled:opacity-40"
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GlobalTable;