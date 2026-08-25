import { PropsWithChildren} from 'react';
import { MotionConfig } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import Navbar from '@/components/partials/Navbar';
import Footer from '@/components/partials/footer';

export default function AppLayout({ children }: PropsWithChildren) {

    return (
        <ReactLenis
            root
            options={{ lerp: 0.01, duration: 2, smoothWheel: true }}
        >
            {/* header ----------- */}
            <Navbar />

            {/* main */}
            <MotionConfig
                transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                {children}
            </MotionConfig>

            {/* footer */}
            <Footer/>
        </ReactLenis>
    );
}
