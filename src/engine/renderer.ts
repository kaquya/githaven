import type { WorldState } from "./types";

export const WORLD_WIDTH = 480;
export const WORLD_HEIGHT = 270;

function rect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
) {
    ctx.fillStyle = color;
    ctx.fillRect(
        Math.round(x),
        Math.round(y),
        Math.round(w),
        Math.round(h)
    );
}

function drawTree(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
) {
    // Tree trunk
    rect(ctx, x - 2, y - 5, 4, 13, "#8055332");

    // Pixelated tree foliage
    rect(ctx, x - 8, y - 17, 16, 8, "#245b43");
    rect(ctx, x - 6, y - 23, 12, 8, "#32845a");
    rect(ctx, x - 4, y - 27, 8, 6, "#48a36c");

    // Foliage highlihghts
    rect(ctx, x - 5, y - 21, 4, 4, "#70c58a")
}

function drawHouse(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
) {
    rect(ctx, x - 12, y - 16, 24, 21, "#c99b68");
    rect(ctx, x - 15, y - 21, 30, 7, "#754a43");
    rect(ctx, x - 10, y - 27, 20, 6, "#965e50");

    // Door and window
    rect(ctx, x - 3, y - 5, 7, 10, "#604331");
    rect(ctx, x + 6, y - 10, 4, 5, "#f5d77b");
}

function drawIsland(ctx: CanvasRenderingContext2D) {
    // Pixelated floating island silhouette
    ctx.fillStyle = "#73533c";
    ctx.beginPath();
    ctx.moveTo(70, 151);
    ctx.lineTo(410, 151);
    ctx.lineTo(375, 178);
    ctx.lineTo(345, 192);
    ctx.lineTo(300, 211);
    ctx.lineTo(250, 230);
    ctx.lineTo(215, 222);
    ctx.lineTo(165, 200);
    ctx.lineTo(110, 183);
    ctx.closePath();
    ctx.fill;

    // Grass platform
    rect(ctx, 70, 140, 340, 15, "#4c9c63");
    rect(ctx, 85, 135, 310, 7, "#74be77");

    // Soil highlights
    rect(ctx, 135, 173, 32, 5, "#956b49");
    rect(ctx, 280, 186, 24, 5, "#956b49");
    rect(ctx, 225, 211, 18, 4, "#493b36");
}

export function renderWorld(
    ctx: CanvasRenderingContext2D,
    world: WorldState,
    time: number
) {
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // Sky
    const sky =
        world.weather === "sunny"
            ? "#91c8e8"
            : world.weather === "cloudy"
                ? "#829db8"
                : "#566b87";

    rect(ctx, 0, 0, WORLD_WIDTH, WORLD_HEIGHT, sky);

    // Animated clouds
    ctx.fillStyle = "#e7f1f5";

    for (let i = 0; i < 3; i++) {
        const x = ((i * 175 + time * 5) % 580) - 60;
        const y = 35 + i * 17;

        rect(ctx, x, y, 55, 10, "e7f1f5");
        rect(ctx, x + 10, y - 7, 30, 10, "e7f1f5");
    }

    drawIsland(ctx);

    // Deterministic tree positions
    const positions = [
        [110, 133], [145, 130], [185, 132],
        [285, 132], [330, 130], [370, 134],
        [125, 115], [170, 113], [310, 112],
        [350, 114], [ 95, 120], [390, 121],
    ];

    for (let i = 0; i < world.treeCount; i++) {
        const [x, y] = positions[i];
        drawTree(ctx, x, y);
    }

    // Buildings
    for (let i = 0; i < world.buildingCount; i++) {
        drawHouse(ctx, 205 + i * 24, 139 - (i % 2) * 8);
    }

    // Magical streak lights
    if (world.lanternsGlowing) {
        const glow = Math.sin(time * 3) > 0 ? "#ffe38a" : "ffbe55";

        rect(ctx, 192, 108, 5, 5, glow);
        rect(ctx, 290, 105, 5, 5, glow);
    }

    if (world.avatarActive) {
        const offset = Math.round(Math.sin(time * 2) * 5);

        rect(ctx, 238 + offset, 115, 6, 8, "#355a91");
        rect(ctx, 239 + offset, 110, 4, 5, "#f1bd90");
    }
}