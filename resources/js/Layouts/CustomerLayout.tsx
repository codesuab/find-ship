import { PropsWithChildren, useState } from 'react';
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

export default function CustomerLayout({ children }: PropsWithChildren) {
    const [searchToggler, setSearchToggler] = useState(false);
    const { name: appName } = usePage().props;
    return (
        <SidebarProvider
            className="min-h-svh text-foreground"
            defaultOpen={false}
        >
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

            <SidebarInset className="bg-muted">
                <div className="flex w-full items-center justify-between bg-white px-4.5 py-2 md:hidden">
                    <div className="flex items-center gap-2.5 px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
                        <div
                            className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 p-2"
                            aria-hidden="true"
                        >
                            <Logo show={false} className="h-10 w-10" />
                        </div>
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
