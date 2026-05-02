type Repo = {
  html_url: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  owner: { avatar_url: string };
};

const projects = [
  { org: "ArcadeAI", name: "arcade-mcp" },
  { org: "airbytehq", name: "airbyte" },
  { org: "actionhero", name: "keryx" },
  { org: "grouparoo", name: "grouparoo" },
  { org: "actionhero", name: "actionhero" },
  { org: "actionhero", name: "node-resque" },
  { org: "actionhero", name: "ah-sequelize-plugin" },
  { org: "evantahler", name: "mcpx" },
  { org: "evantahler", name: "botholomew" },
  { org: "evantahler", name: "macos-ts" },
  { org: "elasticsearch-dump", name: "elasticsearch-dump" },
  { org: "taskrabbit", name: "empujar" },
  { org: "evantahler", name: "dont-be-a-jerk" },
];

declare const data: Repo[];

export { data };

export default {
  watch: [],
  async load(): Promise<Repo[]> {
    const headers: Record<string, string> = {
      "User-Agent": "evantahler.com",
      Accept: "application/vnd.github+json",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const out: Repo[] = [];
    for (const { org, name } of projects) {
      try {
        const r = await fetch(`https://api.github.com/repos/${org}/${name}`, {
          headers,
        });
        if (!r.ok) {
          console.warn(
            `[github.data] ${org}/${name}: ${r.status} ${r.statusText}`,
          );
          continue;
        }
        const repo = (await r.json()) as Repo;
        out.push({
          html_url: repo.html_url,
          full_name: repo.full_name,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          owner: { avatar_url: repo.owner.avatar_url },
        });
      } catch (err) {
        console.warn(`[github.data] ${org}/${name}: ${err}`);
      }
    }
    return out;
  },
};
