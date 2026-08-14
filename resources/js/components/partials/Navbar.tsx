import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Logo from "../Logo";
import SlideUpButton from "../slideup-button";
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { navigationMenuItems } from "@/constant/ui";
import { Link, router, usePage } from "@inertiajs/react";


const CollaborateButton = () => (
    <SlideUpButton onClick={() => router.visit('/auth/login')} className="bg-foreground text-white hover:bg-primary hidden md:flex py-2.5">
        Let's Get Start
    </SlideUpButton>
);

const Navbar = () => {
    const { current_route } = usePage().props;

    const [sticky, setSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleScroll = useCallback(() => {
        setSticky(window.scrollY >= 50);
    }, []);

    const handleResize = useCallback(() => {
        if (window.innerWidth >= 768) setIsOpen(false);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [handleScroll, handleResize]);

    return (
        <header
            className={cn('w-full py-4 duration-300',
                sticky
                    ? "backdrop-blur-lg border-b border-border/40 shadow-2xl shadow-primary/5"
                    : "bg-transparent border-transparent"
            )}>
            <div className="container">
                <nav
                    className='w-full flex items-center h-fit justify-between'
                >
                    <Link href="/">
                        <Logo show='dynamic' />
                    </Link>
                    <div>
                        <NavigationMenu className={`max-lg:hidden ${sticky ? 'bg-white' : 'bg-muted'} duration-300 p-0.5 rounded-full`}>
                            <NavigationMenuList className="flex gap-0">
                                {navigationMenuItems.map((navItem, i) => (
                                    <NavigationMenuItem key={i} className='h-9 flex items-center'>
                                        <Link
                                            href={navItem?.link ?? "#"}
                                            className={cn('px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-background outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal',
                                                current_route == navItem?.link?.replace('/', '') ? 'bg-white text-foreground' : ''
                                            )}
                                        >
                                            {navItem.label}
                                        </Link>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <CollaborateButton />

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(true)} className="rounded-full bg-background border border-border p-2 outline-none flex items-center justify-center cursor-pointer transition-colors">
                            <Menu size={20} />
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "-100%" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                        mass: 0.8,
                                    }}
                                    className="fixed inset-0 z-50 flex flex-col justify-between w-full h-screen bg-white p-4"
                                >
                                    <div>
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                                filter: "blur(10px)",
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: "easeOut",
                                            }}
                                            className="flex items-center justify-between py-3">
                                            <Logo
                                                show={true}
                                                textClass="text-xl"
                                                imageSize="w-8"
                                            />

                                            <Button
                                                onClick={() => setIsOpen(false)}
                                                variant="outline"
                                                size="icon"
                                            >
                                                <X size={12} />
                                            </Button>
                                        </motion.div>

                                        <NavigationMenu className="mt-4">
                                            <NavigationMenuList className="flex flex-col items-start justify-start gap-0">
                                                {navigationMenuItems.map((navItem, i) => (
                                                    <NavigationMenuItem key={i}>
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                y: 20,
                                                                filter: "blur(10px)",
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                                filter: "blur(0px)",
                                                            }}
                                                            transition={{
                                                                duration: 0.5,
                                                                delay: 0.4 + i * 0.1,
                                                                ease: "easeOut",
                                                            }}
                                                            className="py-2"
                                                        >
                                                            <Link href={navItem?.link ?? "#"} className="text-xl font-medium text-foreground">
                                                                {navItem.label}
                                                            </Link>
                                                        </motion.div>
                                                    </NavigationMenuItem>
                                                ))}
                                            </NavigationMenuList>
                                        </NavigationMenu>
                                    </div>

                                    <div className="space-y-3">
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                                filter: "blur(10px)",
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                delay: navigationMenuItems.length * 0.3,
                                                ease: "easeOut",
                                            }}>
                                            <SlideUpButton className="w-full md:w-fit">
                                                Start Free Trial
                                            </SlideUpButton>
                                        </motion.div>
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                                filter: "blur(10px)",
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                delay: navigationMenuItems.length * 0.4,
                                                ease: "easeOut",
                                            }}>
                                            <SlideUpButton className="w-full bg-foreground hover:bg-primary text-white md:w-fit">
                                                See How It Works
                                            </SlideUpButton>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>
            </div >
        </header >
    );
};

export default Navbar;
