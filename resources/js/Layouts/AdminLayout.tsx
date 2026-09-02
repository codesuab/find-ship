import Logo from '@/components/Logo';
import AdminSidebar from '@/components/partials/AdmiSidebar';
import { ThemeProvider } from '@/components/theme-provider';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { toast, Toaster } from '@/components/ui/toast';
import { PageProps } from '@/types/types';
import { Head, usePage } from '@inertiajs/react';
import React, { ReactNode, useEffect } from 'react';

interface PageData {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: PageData) {
    const { name: appName, flash } = usePage<PageProps>().props;

    // show error
    useEffect(() => {
        if (flash?.error) {
            toast.add({
                type: 'error',
                description: flash.error,
                priority: 'high',
            });
        }

        if (flash?.success) {
            toast.add({
                type: 'success',
                description: flash.success,
                priority: 'high',
            });
        }
    }, [flash?.id]);
    return (
        <ThemeProvider defaultTheme="dark" storageKey="shipfind-admin-theme">
            <Toaster />
            <Head>
                <title>{title}</title>
            </Head>
            <SidebarProvider
                className="min-h-svh text-foreground"
                defaultOpen={false}
            >
                {/* sidebar */}
                <AdminSidebar />

                {/* content */}
                <SidebarInset className="bg-background">
                    <div className="flex w-full items-center justify-between border-b border-border bg-background px-4.5 py-2 md:hidden">
                        <div className="flex items-center gap-2 px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
                            <Logo
                                show="false"
                                imageSize="text-primary h-8 w-8"
                            />
                            <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                                <p className="truncate text-sm font-bold tracking-tight">
                                    {appName}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                    Controller
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <SidebarTrigger variant="outline" size="icon" />
                        </div>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-8">
                        <h1 className='text-2xl text-foreground font-medium mb-5'>{title}</h1>
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}
