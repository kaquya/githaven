export type Weather = "sunny" | "cloudy" | "rainy";
export type WorldObjectType = "tree" | "house";

export interface GitHubStats {
    username: string;
    totalContributions: number;
    publicRepositories: number;
    currentStreak: number;
    contributionsLast7Days: number;
    contributionsLast14Days: number;
}

export interface WorldObject {
    id: string;
    type: WorldObjectType;
    x: number;
    y: number;
    variant: number;
}

export interface WorldState {
    level: number;
    treeCount: number;
    buildingCount: number;
    weather: Weather;
    lanternsGlowing: boolean;
    avatarActive: boolean;
    objects: WorldObject[];
}