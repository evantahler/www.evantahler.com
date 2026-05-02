---
title: "Evan Tahler: Open Source Software"
description: "Evan Tahler's open-source work: Actionhero, Keryx, Grouparoo, Airbyte, node-resque, and more."
---

<script setup>
import RepoCard from "./.vitepress/theme/RepoCard.vue";
</script>

# Open Source

![open source](/images/open-source-3.png)

I contribute to open source because it's the best way I've found to learn new tech, share what I've figured out, and give back to a community that's given me a lot. Some of these projects I started; some I lead; some I'm just an active contributor to. The list below is in rough order of how much of my attention each one gets right now.

If any of this is useful to you, you can [sponsor my open-source work via GitHub Sponsors](https://github.com/users/evantahler/sponsorship).

## Featured Projects

The flagships: projects I started, BDFL, and where most of my open-source energy lives.

### [actionhero/keryx](https://github.com/actionhero/keryx)

<RepoCard name="actionhero/keryx" />

A fullstack TypeScript framework for APIs and MCP servers. Write one Action class. Get HTTP, WebSockets, an MCP server, a CLI, and a background task runner, all from the same code. The thinking behind it is in [Announcing Keryx](/blog/post/2026-03-13-announcing-keryx). This is where my evenings go right now.

<p class="flagship-links">
  <a href="https://www.keryxjs.com">keryxjs.com</a> ·
  <a href="/blog/post/2026-03-13-announcing-keryx">Announcement post</a>
</p>

### [actionhero/actionhero](https://www.actionherojs.com)

<RepoCard name="actionhero/actionhero" />

The realtime multi-transport Node.js framework I started in 2012 and still maintain. Stable, well-tested, and powering production traffic at companies I've never even heard of. [Why Choose Actionhero](/blog/post/2017-02-28-why-choose-actionhero) is the long version of the pitch.

### [grouparoo/grouparoo](https://github.com/grouparoo/grouparoo)

<RepoCard name="grouparoo/grouparoo" />

The open-source reverse-ETL company I co-founded as CTO. Acquired by Airbyte in 2021; the repo is archived but the ideas live on inside Airbyte's data sync foundation.

### [elasticsearch-dump/elasticsearch-dump](https://github.com/elasticsearch-dump/elasticsearch-dump)

<RepoCard name="elasticsearch-dump/elasticsearch-dump" />

The import/export swiss-army-knife for Elasticsearch and OpenSearch. Started at TaskRabbit, now a community-maintained project that's racked up nearly 8k stars.

## Active Maintenance

Newer side projects and smaller libraries I'm actively building on.

### [evantahler/mcpx](https://github.com/evantahler/mcpx)

<RepoCard name="evantahler/mcpx" />

A command-line interface for MCP servers. `curl` for MCP. Coding agents already know how to use the CLI; this lets them talk to MCP servers the same way. Background in [curl for MCP](/blog/post/2026-03-13-curl-for-mcp).

### [evantahler/botholomew](https://www.botholomew.com)

<RepoCard name="evantahler/botholomew" />

A local, autonomous AI agent for knowledge work. Hand it a task queue, walk away, let it grind through the backlog.

### [evantahler/macos-ts](https://github.com/evantahler/macos-ts)

<RepoCard name="evantahler/macos-ts" />

Typed APIs over your iCloud data: Notes, Messages, Photos, Contacts. Absorbs the SQLite weirdness so you don't have to.

### [actionhero/node-resque](https://github.com/actionhero/node-resque)

<RepoCard name="actionhero/node-resque" />

Redis-backed background jobs for Node.js. Part of the Actionhero ecosystem.

### [actionhero/ah-sequelize-plugin](https://github.com/actionhero/ah-sequelize-plugin)

<RepoCard name="actionhero/ah-sequelize-plugin" />

## Work Contributions

Major projects I contribute to as part of my day job.

### [ArcadeAI/arcade-mcp](https://github.com/ArcadeAI/arcade-mcp)

<RepoCard name="ArcadeAI/arcade-mcp" />

### [airbytehq/airbyte](https://github.com/airbytehq/airbyte)

<RepoCard name="airbytehq/airbyte" />

## Earlier Projects

Older projects I'm not actively developing but that still get used.

### [taskrabbit/empujar](https://github.com/taskrabbit/empujar)

<RepoCard name="taskrabbit/empujar" />

### [evantahler/dont-be-a-jerk](https://github.com/evantahler/dont-be-a-jerk)

<RepoCard name="evantahler/dont-be-a-jerk" />

## Support this work

If any of these projects has saved you an afternoon, [GitHub Sponsorships](https://github.com/users/evantahler/sponsorship) is the cleanest way to say thanks. Every sponsorship goes directly toward the time I spend maintaining the open-source side of my work: keeping issues moving, releases shipping, and docs vaguely up to date.

<style scoped>
.flagship-links {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.flagship-links a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.flagship-links a:hover {
  text-decoration: underline;
}
</style>
