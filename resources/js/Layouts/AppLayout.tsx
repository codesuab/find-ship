import { PropsWithChildren, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { usePage } from "@inertiajs/react";
import {
    FaXTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaHeadset,
} from 'react-icons/fa6'
import { Footer } from "@/components/partials/footer";
import { PageProps } from "@/types/types";
import Logo from "@/components/Logo";
import Navbar from "@/components/partials/Navbar";
import Lenis from "lenis";

export default function AppLayout({ children }: PropsWithChildren) {
    const { name: appName } = usePage<PageProps>().props;

    // footer info
    const socialLinks = [
        { icon: <FaXTwitter className="h-4 w-4" />, href: '#', label: 'Twitter' },
        { icon: <FaInstagram className="h-4 w-4" />, href: '#', label: 'Instagram' },
        { icon: <FaLinkedinIn className="h-4 w-4" />, href: '#', label: 'LinkedIn' },
    ]
    const contactCta = {
        icon: <FaHeadset className="h-5 w-5" />,
        title: 'Talk to our sales team',
        description: 'Our specialists typically respond within 2 hours.',
        href: '#',
    }
    const linkGroups = [
        {
            title: 'Products',
            links: [
                { label: 'Workflow Engine', href: '#' },
                { label: 'Data Pipeline', href: '#' },
                { label: 'Analytics Suite', href: '#' },
            ],
        },
        {
            title: 'Learn',
            links: [
                { label: 'Tutorials', href: '#' },
                { label: 'Changelog', href: '#' },
                { label: 'API Docs', href: '#' },
            ],
        },
        {
            title: 'Support',
            links: [
                { label: 'FAQ', href: '#' },
                { label: 'Live Chat', href: '#' },
                { label: 'Status Page', href: '#' },
            ],
        },
    ]
    const legalLinks = [
        { label: 'Terms of Service', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Cookie Policy', href: '#' },
    ]

    // smooth
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 0.7,
            touchMultiplier: 1.2,
        });

        let rafId: number;

        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {/* header ----------- */}
            <section className="fixed top-0 left-0 w-full flex items-center justify-center z-2 ">
                <Navbar />
            </section>

            {/* main */}
            <MotionConfig transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
            }}>
                {children}
            </MotionConfig>

            {/* footer */}
            <Footer
                logo={<Logo show={false} />}
                brandName={appName}
                socialLinks={socialLinks}
                contactCta={contactCta}
                linkGroups={linkGroups}
                brandWatermark="FindShip"
                copyright={`© 2026 ${appName}. All rights reserved.`}
                legalLinks={legalLinks}
            />
        </AnimatePresence>
    );
}