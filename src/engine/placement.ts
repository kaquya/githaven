import type { WorldObject } from "./types";
import { createRandom, hashString } from "./random";

interface Point {
    x: number;
    y: number;
}

const TREE_SLOTS: Point[] = [
  { x: 100, y: 131 },
  { x: 125, y: 119 },
  { x: 150, y: 132 },
  { x: 175, y: 116 },
  { x: 195, y: 132 },
  { x: 220, y: 116 },
  { x: 245, y: 132 },
  { x: 270, y: 116 },
  { x: 295, y: 132 },
  { x: 320, y: 116 },
  { x: 345, y: 132 },
  { x: 375, y: 130 },
]

const HOUSE_SLOTS: Point[] = [
  { x: 210, y: 137 },
  { x: 260, y: 137 },
  { x: 160, y: 137 },
  { x: 310, y: 137 },
  { x: 235, y: 115 },
];

function shuffle<T>(items: T[], random: () => number): T[] {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    
    return result;
}

function isNearHouse(
    point: Point,
    houses: WorldObject[]
): boolean {
    return houses.some((house) => {
        return (
            Math.abs(point.x - house.x) < 28 &&
            Math.abs(point.y - house.y) < 28
        );
    });
}

export function generateObjects(
    username: string,
    treeCount: number,
    buildingCount: number
): WorldObject[] {
    const seed = hashString(username.toLowerCase());
    const random = createRandom(seed);

    const objects: WorldObject[] = [];

    const houseSlots = shuffle(HOUSE_SLOTS, random);

    for (let i = 0; i < Math.min(buildingCount, houseSlots.length); i++) {
        objects.push({
            id: `house-${i}`,
            type: "house",
            x: houseSlots[i].x,
            y: houseSlots[i].y,
            variant: Math.floor(random() * 3),
        });
    }

    const houses = objects.filter(
        (object) => object.type === "house"
    );

    const treeSlots = shuffle(TREE_SLOTS, random);
    let treeIndex = 0;

    for (const slot of treeSlots) {
        if (treeIndex >= treeCount) break
        if (!isNearHouse(slot, houses)) continue;

        objects.push({
            id: `tree-${treeIndex}`,
            type: "tree",
            x: slot.x,
            y: slot.y,
            variant: Math.floor(random() * 3),
        });

        treeIndex++;
    }

    return objects;
}