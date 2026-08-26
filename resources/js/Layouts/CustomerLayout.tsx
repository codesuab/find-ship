import { PropsWithChildren, useEffect, useState } from 'react';
import {
    Sidebar,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import UserSidebar from '@/components/partials/UserSidebar';
import Logo from '@/components/Logo';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { toast, Toaster } from '@/components/ui/toast';
import { PageProps } from '@/types/types';

export default function CustomerLayout({ children }: PropsWithChildren) {
    const [searchToggler, setSearchToggler] = useState(false);
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
        <SidebarProvider
            className="min-h-svh text-foreground"
            defaultOpen={false}
        >
            <Toaster />
            <div className="relative flex">
                <UserSidebar
                    searchToggler={searchToggler}
                    setSearchToggler={setSearchToggler}
                />
                {/* search card */}
                {searchToggler && (
                    <Sidebar
                        collapsible="none"
                        className="fixed top-0 left-0 z-90 flex-1 shadow-sm md:static md:z-auto md:flex md:shadow-none"
                    >
                        <SidebarHeader className="gap-3.5 border-b p-4">
                            <div className="flex w-full items-center justify-between">
                                <div className="text-base font-medium text-foreground">
                                    Tracking List
                                </div>
                            </div>
                            <SidebarInput placeholder="Type to search..." />
                        </SidebarHeader>
                    </Sidebar>
                )}
            </div>

            <SidebarInset className="bg-white">
                <div className="flex w-full items-center justify-between bg-white px-4.5 py-2 md:hidden border-b border-border">
                    <div className="flex items-center gap-2 px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
                        <Logo show="false" imageSize="text-primary h-8 w-8" />
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
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSearchToggler?.(!searchToggler)}
                        >
                            {searchToggler ? <X /> : <Search />}
                        </Button>
                        {!searchToggler && (
                            <SidebarTrigger variant="outline" size="icon" />
                        )}
                    </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-8">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
