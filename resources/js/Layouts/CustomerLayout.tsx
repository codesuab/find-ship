import { PropsWithChildren, ReactNode, useEffect } from 'react';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import UserSidebar from '@/components/partials/UserSidebar';
import Logo from '@/components/Logo';
import { usePage } from '@inertiajs/react';
import { toast, Toaster } from '@/components/ui/toast';
import { PageProps } from '@/types/types';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

interface pageData {
    children: ReactNode;
    bodyClass?: string;
}

export default function CustomerLayout({ children, bodyClass }: pageData) {
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
        <ThemeProvider defaultTheme="light" storageKey="shipfind-theme">
            <SidebarProvider
                className="min-h-svh text-foreground"
                defaultOpen={false}
            >
                <Toaster />
                <div className="relative flex">
                    <UserSidebar />
                </div>

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
                                    Workspace
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <SidebarTrigger variant="outline" size="icon" />
                        </div>
                    </div>

                    <div
                        className={cn(
                            'flex min-w-0 flex-1 flex-col p-6 sm:p-8',
                            bodyClass,
                        )}
                    >
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}
