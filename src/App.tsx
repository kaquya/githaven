
import { useMemo, useState } from "react";
import WorldCanvas from "./components/WorldCanvas";
import { generateWorld } from "./engine/world";
import type { GitHubStats } from "./engine/types";
import "./styles/global.css";

const initialStats: GitHubStats = {
  username: "developer",
  totalContributions: 850,
  publicRepositories: 12,
  currentStreak: 7,
  contributionsLast7Days: 15,
  contributionsLast14Days: 27,
};

export default function App() {
  const [stats, setStats] = useState(initialStats);

  const world = useMemo(
    () => generateWorld(stats),
    [stats]
  );

  function updateStat(
    key: keyof GitHubStats,
    value: number
  ) {
    setStats((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <main className="app">
      <header className="header">
        <span className="eyebrow">OPEN SOURCE • PIXEL WORLD</span>
        <h1>GitHaven</h1>
        <p>Your code. Your world.</p>
      </header>

      <section className="preview">
        <div className="preview-header">
          <span>WORLD PREVIEW</span>
          <span>LEVEL {world.level}</span>
        </div>

        <WorldCanvas world={world} />

        <div className="preview-footer">
          <span>@{stats.username}</span>
          <span>{world.weather.toUpperCase()}</span>
        </div>
      </section>

      <section className="controls">
        <h2>Customize your world</h2>
        <p>
          Experiment with sample GitHub activity.
          Live account integration comes next.
        </p>

        {(
          [
            ["totalContributions", "Total contributions", 5000],
            ["publicRepositories", "Public repositories", 60],
            ["currentStreak", "Current streak", 100],
            ["contributionsLast7Days", "Last 7 days", 100],
            ["contributionsLast14Days", "Last 14 days", 200],
          ] as const
        ).map(([key, label, max]) => (
          <label className="control" key={key}>
            <div className="control-label">
              <span>{label}</span>
              <strong>{stats[key]}</strong>
            </div>

            <input
              type="range"
              min={0}
              max={max}
              value={stats[key]}
              onChange={(event) =>
                updateStat(key, Number(event.target.value))
              }
            />
          </label>
        ))}
      </section>
    </main>
  );
}
