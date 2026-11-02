
import type { GitHubStats, WorldState } from "./types";

export function generateWorld(stats: GitHubStats): WorldState {
  const level = Math.min(
    10,
    Math.max(1, Math.floor(Math.log2(stats.totalContributions + 1) / 2) + 1)
  );

  const treeCount = Math.min(12, 2 + level);
  const buildingCount = Math.min(
    5,
    Math.floor(stats.publicRepositories / 3)
  );

  const weather =
    stats.contributionsLast14Days >= 10
      ? "sunny"
      : stats.contributionsLast14Days >= 3
        ? "cloudy"
        : "rainy";

  return {
    level,
    treeCount,
    buildingCount,
    weather,
    lanternsGlowing: stats.currentStreak >= 3,
    avatarActive: stats.contributionsLast7Days >= 5,
  };
}
