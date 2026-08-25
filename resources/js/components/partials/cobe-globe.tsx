import createGlobe from "cobe";
import { useEffect, useRef } from "react";

type GlobeMarker = {
    location: [number, number];
    size: number;
};

const markers: GlobeMarker[] = [
    { location: [22.3569, 91.7832], size: 0.025 },
    { location: [1.3521, 103.8198], size: 0.02 },
    { location: [25.2048, 55.2708], size: 0.018 },
    { location: [35.6762, 139.6503], size: 0.02 },
    { location: [40.7128, -74.006], size: 0.018 },
    { location: [31.2304, 121.4737], size: 0.022 },
    { location: [51.5074, -0.1278], size: 0.018 },
    { location: [-33.8688, 151.2093], size: 0.02 },
];

export function CobeGlobe({
    className,
}: {
    className?: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
    const rafRef = useRef<number>(0);
    const phiRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let cancelled = false;

        const init = () => {
            if (cancelled || globeRef.current) return;

            const rect = canvas.getBoundingClientRect();
            const side = Math.floor(
                Math.min(rect.width, rect.height),
            );

            if (side <= 0) return;

            const dpr = Math.min(
                window.devicePixelRatio || 1,
                1.5,
            );

            // ============================================
            // COLOR DEFINITIONS
            // ============================================
            
            // Primary color: #01293d
            // RGB: (1, 41, 61)
            // Normalized: (0.004, 0.161, 0.239)
            const primaryColor: [number, number, number] = [0.004, 0.161, 0.239];
            
            // Marker color: Orange/Red
            // RGB: (240, 74, 20)
            // Normalized: (0.94, 0.29, 0.08)
            const markerColor: [number, number, number] = [0.94, 0.29, 0.08];
            
            // Glow/Highlight color: Orange/Red
            // RGB: (230, 64, 15)
            // Normalized: (0.9, 0.25, 0.06)
            const glowColor: [number, number, number] = [0.9, 0.25, 0.06];
            
            // Alternative glow colors (commented):
            // White glow: [1, 1, 1]
            // Blue glow: [0.2, 0.5, 0.9]
            // Green glow: [0.1, 0.9, 0.2]
            // Yellow glow: [1, 0.9, 0.1]

            // ============================================
            // GLOBE CONFIGURATION
            // ============================================

            globeRef.current = createGlobe(canvas, {
                // --- Display Settings ---
                devicePixelRatio: dpr,          // Device pixel ratio for sharpness
                width: side * dpr,              // Canvas width
                height: side * dpr,             // Canvas height

                // --- Rotation Settings ---
                phi: 0,                         // Initial horizontal rotation
                theta: 0,                       // Initial vertical rotation

                // --- Lighting Settings ---
                dark: 0,                     // Darkness level (0 = bright, 1 = dark)
                diffuse: 0.15,                   // Light diffusion/scattering

                // --- Map Settings ---
                mapSamples: 10000,              // Number of map sampling points
                mapBrightness: 5,               // Map brightness level

                // --- Color Settings ---
                baseColor: primaryColor,        // Main globe color (#01293d)
                markerColor: markerColor,       // Marker dots color (Orange)
                glowColor: glowColor,           // Glow/highlight color (Orange)

                // --- Marker Data ---
                markers,                        // Array of marker locations
            });

            const animate = () => {
                if (cancelled) return;

                phiRef.current += 0.001;        // Rotation speed

                globeRef.current?.update({
                    phi: phiRef.current,
                    theta: 0,
                });

                rafRef.current =
                    requestAnimationFrame(animate);
            };

            animate();
        };

        if (canvas.getBoundingClientRect().width > 0) {
            init();
        } else {
            const observer = new ResizeObserver(() => {
                if (
                    canvas.getBoundingClientRect().width > 0
                ) {
                    observer.disconnect();
                    init();
                }
            });

            observer.observe(canvas);

            return () => {
                cancelled = true;
                observer.disconnect();
                cancelAnimationFrame(rafRef.current);
                globeRef.current?.destroy();
                globeRef.current = null;
            };
        }

        return () => {
            cancelled = true;
            cancelAnimationFrame(rafRef.current);
            globeRef.current?.destroy();
            globeRef.current = null;
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                width: "400px",
                height: "100%",
                display: "block",
            }}
        />
    );
}