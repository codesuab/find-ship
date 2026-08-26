import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Logo from '../Logo';
import SlideUpButton from '../slideup-button';
import { navigationMenuItems } from '@/constant/ui';
import { Link, router, usePage } from '@inertiajs/react';
import { RiMenu4Fill } from '@remixicon/react';
import { motion } from 'motion/react';

const Navbar = () => {
    const { current_route, auth } = usePage().props;
    const user = auth?.user;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header
            className={cn(
                'w-full border-b border-border-light bg-primary duration-300',
            )}
        >
            <div className="relative container border-x border-border-light py-5">
                <nav className="flex h-fit w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Logo show="dynamic" />
                        </Link>
                        <NavigationMenu className={`max-lg:hidden`}>
                            <NavigationMenuList className="flex gap-0">
                                {navigationMenuItems.map((navItem, i) => (
                                    <NavigationMenuItem
                                        key={i}
                                        className="flex h-9 items-center"
                                    >
                                        <Link
                                            href={navItem?.link ?? '#'}
                                            className={cn(
                                                'rounded-full px-2 py-1.5 text-sm font-medium tracking-normal text-white outline outline-transparent transition hover:bg-white/10 lg:px-4',
                                                current_route ==
                                                    navItem?.link?.replace(
                                                        '/',
                                                        '',
                                                    )
                                                    ? 'bg-white/10'
                                                    : '',
                                            )}
                                        >
                                            {navItem.label}
                                        </Link>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="flex items-center gap-2">
                        <SlideUpButton
                            onClick={() =>
                                router.get(
                                    user
                                        ? route('app.dashboard')
                                        : route('login'),
                                )
                            }
                            variant="link"
                            size="sm"
                            className="font-normal"
                        >
                            {user ? 'Go to app' : 'Login'}
                        </SlideUpButton>
                        <div className="hidden md:block">
                            <SlideUpButton
                                onClick={() =>
                                    router.get(route('ux.contact.index'))
                                }
                                variant="light"
                                size="sm"
                            >
                                Book a Demo
                            </SlideUpButton>
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="rounded-full border border-border-light bg-border-light p-1.5"
                            >
                                <RiMenu4Fill className="size-6 text-white" />
                            </button>
                        </div>
                    </div>
                </nav>
                {/* mobile menu */}
                <motion.div
                    animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                        height: { duration: 0.3, ease: 'easeInOut' },
                        opacity: { duration: 0.2 },
                    }}
                    className="h-0 w-full overflow-hidden bg-primary"
                >
                    <NavigationMenu className="mt-4 mb-5">
                        <NavigationMenuList className="flex flex-col items-start justify-start gap-3">
                            {navigationMenuItems.map((navItem, i) => (
                                <NavigationMenuItem key={i}>
                                    <Link
                                        href={navItem?.link ?? '#'}
                                        className="text-2xl font-medium text-white"
                                    >
                                        {navItem.label}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <SlideUpButton
                        onClick={() =>
                            router.get(
                                user ? route('app.dashboard') : route('login'),
                            )
                        }
                        className="w-full md:w-fit"
                    >
                        Start Free Trial
                    </SlideUpButton>
                </motion.div>
            </div>
        </header>
    );
};

export default Navbar;
