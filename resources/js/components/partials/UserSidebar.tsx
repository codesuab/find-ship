import React from 'react'
import { router, usePage } from "@inertiajs/react";
import Logo from '@/components/Logo';
import { HiChevronUpDown } from "react-icons/hi2";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import { navGroups, secondNavGroups } from '@/constant/CustomerMenu';
import { BadgeCheck, Bell, CreditCard, LogOut, Search, Sparkles } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '../ui/button';


interface UserSidebarProps {
    searchToggler?: boolean;
    setSearchToggler?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserSidebar({ searchToggler, setSearchToggler }: UserSidebarProps) {
    const { name: appName, auth } = usePage().props;
    const { state } = useSidebar()
    const user = auth?.user;

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className={`${state == 'expanded' && 'px-3'} justify-center pt-4`}>
                <div className={`flex ${state == 'expanded' ? 'flex-row justify-between' : 'md:flex-col justify-between gap-3 md:justify-center'} items-center`}>
                    <div className="flex items-center gap-2.5 px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
                        <div
                            className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 p-2"
                            aria-hidden="true"
                        >
                            <Logo show={false} className="h-13 w-13" />
                        </div>
                        <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                            <p className="truncate text-sm font-bold tracking-tight">{appName}</p>
                            <p className="truncate text-xs text-muted-foreground">
                                Workspace
                            </p>
                        </div>
                    </div>

                    <div className={`flex ${state == 'expanded' ? 'flex-row gap-1' : 'md:flex-col-reverse gap-2'} items-center`}>
                        {/* search */}
                        <div className='hidden md:block'>
                            <Tooltip>
                                <TooltipTrigger
                                    render={
                                        <Button variant='outline' size='icon' onClick={() => setSearchToggler?.(!searchToggler)}>
                                            <Search />
                                        </Button>
                                    }
                                />
                                {state == "collapsed" && (
                                    <TooltipContent side="right">
                                        Search
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </div>

                        {/* menu trigger */}
                        <Tooltip>
                            <TooltipTrigger render={
                                <SidebarTrigger variant='outline' size='icon' />
                            } />
                            {state == 'collapsed' && (
                                <TooltipContent side='right'>
                                    Extended Menu
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className={`pt-1 ${state == 'expanded' && 'px-2'}`}>
                {/* primary */}
                {navGroups.map((group, i) => (
                    <SidebarGroup key={i}>
                        {group.heading && (
                            <SidebarGroupLabel className="text-[10px] font-semibold uppercase">
                                {group.heading}
                            </SidebarGroupLabel>
                        )}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item, i) => (
                                    <SidebarMenuItem key={i}>
                                        <SidebarMenuButton
                                            size='lg'
                                            isActive={item.active}
                                            tooltip={
                                                item.badge
                                                    ? `${item.label} (${item.badge})`
                                                    : item.label
                                            }
                                            render={<a href="#" />}
                                            aria-current={item.active ? "page" : undefined}
                                            className="group-data-[collapsible=icon]:justify-center"
                                        >
                                            <item.icon aria-hidden="true" />
                                            <span className="group-data-[collapsible=icon]:hidden">
                                                {item.label}
                                            </span>
                                        </SidebarMenuButton>
                                        {item.badge && (
                                            <SidebarMenuBadge className="top-1/2 -translate-y-1/2 tabular-nums">
                                                {item.badge}
                                            </SidebarMenuBadge>
                                        )}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}

                {/* secondary nav */}
                <SidebarGroup className="mt-auto">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondNavGroups.map((item, i) => (
                                <SidebarMenuItem key={i}>
                                    <SidebarMenuButton
                                        size='lg'
                                        tooltip={
                                            item.label
                                        }
                                        render={<a href="#" />}
                                        className="group-data-[collapsible=icon]:justify-center"
                                    >
                                        <item.icon aria-hidden="true" />
                                        <span className="group-data-[collapsible=icon]:hidden">
                                            {item.label}
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className={`${state == 'expanded' && 'px-3'}`}>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={user?.avatar} alt={user?.name} />
                                            <AvatarFallback className="rounded-lg">
                                                {user?.name?.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {user?.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {user?.email}
                                            </span>
                                        </div>

                                        <HiChevronUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                }
                            />

                            <DropdownMenuContent
                                side='top'
                                align="center"
                                sideOffset={8}
                                className="min-w-56 rounded-lg shadow-none"
                            >
                                <div className="p-1">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {user?.name}
                                            </span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                {user?.email}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem className='py-2'>
                                        <Sparkles />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem className='py-1.5' onClick={() => router.get(route('app.account.view'))}>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className='py-1.5'>
                                        <CreditCard />
                                        Billing
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className='py-1.5'>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem variant='destructive' onClick={() => router.get(route('logout'))}>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar >
    )
}
