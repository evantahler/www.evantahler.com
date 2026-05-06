---
title: 'Announcing Keryx: A Full-Stack TypeScript Framework for APIs and MCP Servers'
date: '2026-03-13'
author: Evan Tahler
description: >-
  After 14 years of building Actionhero, I built a new framework from scratch.
  Keryx lets you write one Action class and deploy it across HTTP, WebSocket,
  CLI, background tasks, and MCP — all with the same validation and middleware.
image: /images/posts/2026-03-13-announcing-keryx/image.png
tags:
  - engineering
  - typescript
  - node.js
  - ai
  - open-source
featured: true
---

![Announcing Keryx: A Full-Stack TypeScript Framework for APIs and MCP Servers](/images/posts/2026-03-13-announcing-keryx/image.png)

I've been building [Actionhero](https://github.com/actionhero/actionhero) for over 14 years. It started as a side project in 2011 — a Node.js server that could speak HTTP and WebSocket from the same codebase, with background jobs built in. That was novel at the time! The core idea was simple: write your business logic once, expose it everywhere. Over the years, Actionhero picked up a few thousand GitHub stars, got used in production by companies I never expected, and even got approved by the VA for healthcare systems. I'm proud of it.

The world has changed. TypeScript won. Bun happened. Zod became the standard for validation. And then MCP showed up. **[Keryx](https://www.keryxjs.com/)** is the framework I'd want today — built from scratch, on Bun, with MCP as a first-class transport.

## What Is Keryx?

Keryx is a full-stack TypeScript framework for building APIs and MCP servers. The core philosophy is the same one that drove Actionhero: you write your controller once, and it works across every transport your application needs. But "every transport" means something different in 2026 than it did in 2012.

A single Keryx Action automatically becomes:

- An **HTTP endpoint** with JSON/form data support
- A **WebSocket handler** for real-time communication
- A **CLI command** with auto-generated flags
- A **background task** via Resque workers
- An **MCP tool, resource, or prompt** that AI agents can discover and call

Same validation, same middleware, same error handling. Five transports, one class. Oh, and Actions are composable now.

## One Action, Every Transport

Here's what that looks like in practice:

```typescript
export class UserView implements Action {
  name = "user:view";
  description = "View a user's profile by ID or email";
  inputs = z.object({
    id: z.number().optional(),
    email: z.string().email().optional(),
  });
  web = { route: "/user", method: HTTP_METHOD.GET };
  mcp = { tool: true };

  async run(params: ActionParams<UserView>) {
    const user = await findUser(params);
    return { user: serializeUser(user) };
  }
}
```

That's it. This class is simultaneously a `GET /user` endpoint, a WebSocket action, a `user:view` CLI command, and an MCP tool. The Zod schema drives input validation for every transport, and it auto-generates your OpenAPI documentation. An AI agent running `user:view` gets the same validation and error handling as a curl request hitting `/user` — because it's the same code path.

If you've used Actionhero, this should feel familiar. If you haven't, the idea is straightforward: your business logic shouldn't care how a request arrived. Any sophisticated application will need multiple transports anyway.

## What You Get on Day One

A scaffolded Keryx app boots with cookie sessions, OAuth 2.1, rate limiting, security headers, CORS, WebSocket origin validation, OpenTelemetry metrics, structured logging with correlation IDs, automatic Drizzle migrations, an OpenAPI 3 spec at `/api/swagger`, an MCP server, fan-out background tasks, real-time channels with presence tracking, and a CLI that registers every action as a command. None of these are plugins you bolt on later — but there's also a plugin system and a nascent collection of plugins.

## Why MCP Changes Things

The first four transports — HTTP, WebSocket, CLI, tasks — every full-stack framework should have those. Actionhero had all of them (well, CLI was a stretch). The reason I built Keryx instead of continuing to evolve Actionhero is the fifth one: MCP.

[MCP](https://modelcontextprotocol.io/) (Model Context Protocol) is how AI agents discover and use tools. It's becoming the standard interface between agents and the services they interact with. If you're already defining your actions with typed inputs, descriptions, and structured outputs… you're 90% of the way to an MCP tool. The shape of a good Action and the shape of a good MCP tool are nearly identical.

Keryx makes the last 10% automatic. Every Action can be registered as an MCP tool with zero additional configuration. Your Zod schema becomes the tool's input schema. Your Action's name becomes the tool name. An AI agent can discover your API the same way a human developer reads your OpenAPI docs — except the agent gets a protocol it natively understands.

That also means Keryx gives you per-session agent isolation and OAuth 2.1 with PKCE out of the box. Because when agents are calling your API, authentication and scoping aren't optional. (To be clear: this is MCP over HTTP, not stdio. Keryx is for deployed, remote applications.)

The same Action class can also become an MCP **resource** (URI-addressed, read-only context that agents fetch) or an MCP **prompt** (a named template surfaced as a slash command in clients like Claude Desktop). Keryx aims to support *all* of MCP.

## Design Tools as Intentions, Not CRUD

Agents don't want your CRUD endpoints.

The instinct is to expose `user:create`, `email:send-welcome`, and `workspace:create-default` as three separate tools and let the agent orchestrate them. Don't. The agent doesn't know the order, doesn't know your business rules, and will drop one of them halfway through when its context fills up. You'll end up with half-created users and no welcome emails, and you'll blame the model.

Expose `user:onboard` instead. One tool, one call, three side effects, no missed steps. And here's the part Actionhero never had: the parent action doesn't reimplement the work — it composes the existing low-level actions via `connection.act()`.

```typescript
export class UserOnboard implements Action {
  name = "user:onboard";
  description = "Create a user, send the welcome email, and set up their default workspace";
  middleware = [TransactionMiddleware];
  inputs = z.object({
    name: z.string().min(3).describe("Display name"),
    email: z.string().email().describe("Email address (used for login)"),
    password: secret(z.string().min(8).describe("Password")),
    company: z.string().optional().describe("Company name for the workspace"),
  });
  web = { route: "/user/onboard", method: HTTP_METHOD.PUT };
  mcp = { tool: true };

  async run(params: ActionParams<UserOnboard>, connection: Connection) {
    const { response: created, error: createErr } = await connection.act(
      "user:create",
      { name: params.name, email: params.email, password: params.password },
    );
    if (createErr) throw createErr;
    const user = created.user;

    const { error: emailErr } = await connection.act(
      "email:send-welcome",
      { userId: user.id },
    );
    if (emailErr) throw emailErr;

    const { error: wsErr } = await connection.act(
      "workspace:create-default",
      { userId: user.id, company: params.company },
    );
    if (wsErr) throw wsErr;

    return { user };
  }
}
```

`user:create`, `email:send-welcome`, and `workspace:create-default` are all real Actions in their own right — exposed as HTTP endpoints, callable from the CLI, runnable as background tasks. `UserOnboard` is just the orchestrator. And because `TransactionMiddleware` is re-entrant, every sub-action runs inside the same database transaction the parent opened. If the workspace setup fails, the user creation rolls back. Atomic across three actions, no manual transaction plumbing.

This is the part Actionhero never had. In the old world, "compose three actions" meant extracting an Ops helper and calling it from each of them, or writing a fourth handler that duplicated the logic. Actions were endpoints, not building blocks. In Keryx, an Action calling another Action is the pattern — same validation, same middleware, same transaction.

For agents, the payoff is hiding the building blocks. Set `mcp = { tool: false }` on `user:create`, `email:send-welcome`, and `workspace:create-default`, and only `user:onboard` shows up in the agent's tool list. Your humans still get fine-grained control over the underlying actions. Your agents get the right level of abstraction. Two audiences, one codebase.

## Modern Defaults

Actionhero was built in a world of callbacks and `npm install`. Keryx is built for how we write TypeScript today:

- **Bun** as the runtime — native TypeScript execution, no compilation step, sub-second cold starts.
- **Zod** for validation — one schema generates your CLI flags, your OpenAPI docs, your MCP tool input schemas, and your OAuth login form. One source of truth, four downstream surfaces.
- **Drizzle ORM** with auto-migrations — your database schema lives in TypeScript and is auto-applied at boot.
- **Streaming** as a first-class concern — return a `StreamingResponse` for SSE token streams, file downloads, or LLM output. The same action degrades automatically across transports: chunked over HTTP, incremental messages over WebSocket, MCP logging notifications for connected agents.
- **Background tasks** with fan-out — distribute "process all users" across hundreds of child jobs with one call to `api.actions.fanOut()`, then poll progress and collect results from Redis. Built on [node-resque](https://github.com/actionhero/node-resque), which also got a refresh.
- **Real-time channels** — Redis-backed PubSub with middleware-based authorization, pattern-matched channel names, and presence tracking that works across multiple server instances.
- **OpenTelemetry observability** — built-in metrics on a `/metrics` endpoint, plus a separate `@keryxjs/tracing` plugin for OTLP distributed tracing that propagates W3C trace context all the way from an HTTP request, through an enqueued background task, into the worker that picks it up. One trace, every transport.
- **Lifecycle hooks** — `api.hooks` lets plugins observe and wrap every HTTP request, WebSocket message, MCP session, action execution, and task run. The tracing plugin is built entirely on these hooks. It doesn't fork the framework, it observes it.

## What About Actionhero?

Actionhero isn't going anywhere. It's stable, it works, and people depend on it. But I'm not going to pretend it's where my energy is going. Keryx is the framework I want to build with, and I think it's the better choice for new projects.

If you're running Actionhero in production today, there's no urgency to migrate. If you're starting something new… take a look at Keryx.

## Getting Started

```bash
bunx keryx new my-app
cd my-app
cp .env.example .env
bun install
bun dev
```

You'll need Bun, PostgreSQL, and Redis installed locally. The scaffolded project comes with example Actions, database migrations, and a working MCP server — so you can point an AI agent at it immediately.

The docs are at [keryxjs.com](https://www.keryxjs.com/), and the project is MIT licensed.

Source: [keryxjs.com](https://www.keryxjs.com/)