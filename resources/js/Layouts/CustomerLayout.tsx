import { PropsWithChildren, useState } from 'react'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import UserSidebar from '@/components/partials/UserSidebar'
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';


export default function CustomerLayout({ children }: PropsWithChildren) {
    const [searchToggler, setSearchToggler] = useState(false);
    const { name: appName } = usePage().props;
    return (
        <SidebarProvider className="min-h-svh text-foreground" defaultOpen={false}>
            <div className='flex relative'>
                <UserSidebar searchToggler={searchToggler} setSearchToggler={setSearchToggler} />

                {/* search card */}
                <div
                    className={cn(
                        "fixed z-50 overflow-y-auto bg-white p-4 transition-all duration-200",
                        "bottom-0 left-0 h-full w-full rounded-t-2xl",
                        "md:absolute md:bottom-auto md:left-full md:top-0 md:h-screen md:w-75 md:rounded-none",
                        searchToggler
                            ? "translate-y-0 opacity-100 md:translate-x-0 md:translate-y-0"
                            : "translate-y-full opacity-0 md:-translate-x-2.5 md:translate-y-0"
                    )}
                >
                    <div className='flex items-center justify-between border-b border-border pb-3 mb-3'>
                        <div>
                            <h1 className='text-base font-medium text-foreground capitalize'>Tracking List</h1>
                            <p className='text-xs font-normal text-muted-foreground'>Search Imo, Name</p>
                        </div>

                        <Button variant='destructive' size='icon' onClick={() => setSearchToggler?.(!searchToggler)}>
                            <X />
                        </Button>
                    </div>
                </div>
            </div>

            <SidebarInset className="bg-muted">
                <div className='bg-white w-full flex items-center justify-between px-4.5 py-2 md:hidden'>
                    <div className="flex items-center gap-2.5 px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
                        <div
                            className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 p-2"
                            aria-hidden="true"
                        >
                            <Logo show={false} className="h-10 w-10" />
                        </div>
                        <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                            <p className="truncate text-sm font-bold tracking-tight">{appName}</p>
                            <p className="truncate text-xs text-muted-foreground">
                                Workspace
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Button variant='outline' size='icon' onClick={() => setSearchToggler?.(!searchToggler)}>
                            <Search />
                        </Button>
                        <SidebarTrigger variant='outline' size='icon' />
                    </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-8">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>

    )
}
