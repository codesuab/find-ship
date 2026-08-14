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

            globeRef.current = createGlobe(canvas, {
                devicePixelRatio: dpr,
                width: side * dpr,
                height: side * dpr,

                phi: 0,
                theta: 0,

                dark: 0.15,
                diffuse: 1.8,

                mapSamples: 10000,
                mapBrightness: 5,

                baseColor: [0.08, 0.35, 0.42],
                markerColor: [0.94, 0.29, 0.08],
                glowColor: [0.9, 0.25, 0.06],

                markers,
            });

            const animate = () => {
                if (cancelled) return;

                phiRef.current += 0.001;

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