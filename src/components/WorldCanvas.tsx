import { useEffect, useRef } from "react";
import type { WorldState } from "../engine/types";
import {
    renderWorld,
    WORLD_WIDTH,
    WORLD_HEIGHT,
} from "../engine/renderer";

interface Props {
    world: WorldState;
}

export default function WorldCanvas({ world }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (!ctx) return;

        let frameId = 0;
        let previousTime = 0;
        let elapsed = 0;

        const animate = (timestamp: number) => {
            if (previousTime !== 0) {
                elapsed += Math.min(
                    (timestamp - previousTime) / 1000,
                    0.1
                );
            }

            previousTime = timestamp;

            renderWorld(ctx, world, elapsed);
            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, [world]);

    return (
        <canvas
            ref={canvasRef}
            width={WORLD_WIDTH}
            height={WORLD_HEIGHT}
            aria-label="Animated GitHaevn pixel-art island"
            role="img"
            style={{
                width: "100%",
                height: "auto",
                imageRendering: "pixelated",
                display: "block",   
            }}
        />  
    );
}