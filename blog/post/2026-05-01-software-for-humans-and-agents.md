---
title: "Building Software for Humans and Agents"
date: "2026-05-01"
author: Evan Tahler
description: >-
  I've been building a library and a framework in parallel, and the same design
  constraint keeps showing up in both: every piece of software now has two
  audiences, humans and agents. Here's what that changes — for libraries, and
  for frameworks.
image: /images/posts/2026-05-01-software-for-humans-and-agents/image.png
tags:
  - engineering
  - typescript
  - ai
  - open-source
featured: true
---

![Building software for humans and agents](/images/posts/2026-05-01-software-for-humans-and-agents/image.png)

I've been building a few things in my spare time. A library — [macos-ts](https://github.com/evantahler/macos-ts), which gives you typed APIs over your iCloud data (Notes, Messages, Photos, Contacts) and absorbs the SQLite madness so you don't have to. And a framework — [Keryx](https://www.keryxjs.com/), the fullstack TypeScript framework for MCP and APIs: one Action class, five transports, your API is automatically an MCP server, a WebSocket handler, a CLI tool, and a background task runner.

I've learned that every piece of software I write now has two audiences: a human, and an agent acting on a human's behalf. They want different things. They forgive different things. They fail differently. And building for both at once changes how you write the code.

That sounds like a fluffy thought-leader sentence, so let me make it concrete.

## Libraries: ship MCP next to your SDK

Let's start with libraries, because the library is the simpler case. A good library does a few small things on a focused topic — the [Unix principle](https://en.wikipedia.org/wiki/Unix_philosophy). It probably manipulates data. Your app wants that data and now your agent does too.

A library used to mean one thing: a typed surface a developer imports into their code, written in a specific language for a specific runtime. If your stack matched, great. If not, you went and found another library. You design it for the engineer reading the docstrings, you write it to be ergonomic from the IDE, you ship it with a README that opens with "Install."

That's not enough anymore. Your users are running agents now, and those agents want to do the same things they'd reach for your library to do directly. If your library doesn't show up over MCP, it doesn't show up at all in the workflows that matter most.

Half the internet is calling MCP "USB for agents." It's a goofy phrase, but it's basically right. MCP is the universal bus — and the underrated part is that it transcends the language your library was written in. A Python agent can call a TypeScript library. A Rust agent can call a Ruby library. The protocol is the contract; whatever your library is written in is now an implementation detail.

The good news: the rules for shipping a good MCP server are the same rules for shipping a good library. Hide complexity. Return errors that explain what to do next. Write documentation that actually documents.

The bad news: most existing libraries fail those rules in ways that humans politely tolerate and agents don't.

### Tool descriptions are documentation. Take them seriously.

[Arcade's tool description pattern](https://www.arcade.dev/patterns/tool-description) puts it bluntly:

> Do not assume the AI model will be able to infer anything that is not explicitly stated in the tool description, even if it's obvious from a human reasoning standpoint.

Humans infer. They skim a function signature, glance at the type, click through to a usage example, and figure it out (or fail at compile time). Agents need it spelled out. Prerequisites, related tools, expected formats, when to use this tool versus that one. If you've ever written a really good docstring — the kind a junior engineer can pick up and use without asking questions — that's the bar. Now write every tool description that way.

### Shape your responses for the next call, not just this one

Here's the response envelope every macos-ts tool returns. This one's from `list_notes`:

```json
{
  "data": [
    { "id": 42, "title": "Shopping List" },
    { "id": 17, "title": "Q2 Planning Notes" },
    { "id": 9, "title": "Recipes from Mom" }
  ],
  "totalResults": 3,
  "_next": [
    { "tool": "read_note", "description": "Read a note's full markdown content" }
  ]
}
```

That `_next` field is the part you'd never put in a normal SDK because a human would find it patronizing. Of course they know what to call next — they have an autocomplete and a documentation tab open. An agent has a tool list and a context window. Telling it "you probably want to call `read_note` after this" is a kindness, not a crutch. It saves a token round-trip and stops the agent from guessing.

The errors do the same thing:

```json
{
  "error": "NoteNotFoundError",
  "message": "Note not found: 999",
  "category": "not_found",
  "retryable": false,
  "recovery": "Use list_notes or search_notes to find valid note IDs."
}
```

`retryable` tells the agent whether to back off or try something different. `recovery` tells it *what* something different looks like. An agent cannot recover from a failure it can't read — and "ENOENT: no such file or directory" is not, despite our long affection for it, a readable failure.

This idea isn't original. [mcpx](https://github.com/evantahler/mcpx) does the same trick at a different layer — it pre-validates tool inputs locally against the JSON Schema before round-tripping to the server, so the agent gets `missing required field "repo"` instead of an opaque server error fifty milliseconds later. Cheap to write. Saves the agent a confused retry every time.

### The library gets better when you do this

Here's the part that surprised me. macos-ts has a downstream consumer — [icloud-backup](https://github.com/evantahler/icloud-backup), a CLI tool that uses the *human* TypeScript API, not MCP. When I added the agent-facing surface (structured envelopes, `_next`, recovery hints), I expected to write more code for less ergonomic returns. The opposite happened. Designing for an agent forced me to be explicit about things I'd been hand-waving for the human caller too — which photos are local versus iCloud-only, which attachments live on disk versus inline, which errors are retryable. The CLI got cleaner because the MCP server forced the conversation.

A library that's good for agents is a library that's just *good*.

## Frameworks: MCP is a transport

Now zoom out. If a library is the unit of "here's a thing you can call," a framework is the scaffolding for "here's a service that exposes things." The framework's job is to take your business logic and put it in front of users. Plural.

For the last decade-plus, "users" meant clients over HTTP, browsers over WebSocket, and operators on the CLI. Maybe a background queue. That was the contract: write your logic once, the framework picks the transport. Same logic on `GET /user`, on `socket.send("user:view")`, on `myapp user:view --id 42`.

MCP is a new entry on that list. Not a layer above HTTP. Not a sidecar. A peer. You don't "add MCP support" to your service any more than you "add HTTP support" — you pick the transports your business logic should be reachable over, and the framework wires them up.

This is the assumption [Keryx](/blog/post/2026-03-13-announcing-keryx) is built on. A single Action class declares its inputs once with Zod, its middleware once, its `run()` method once, and then the transport configs sit side by side as parallel properties:

```typescript
class MyAction implements Action {
  inputs = z.object({ ... });
  middleware = [ ... ];

  web = { route: "/thing", method: HTTP_METHOD.PUT };
  task = { queue: "default" };
  mcp = { tool: true };

  async run(params: ActionParams<MyAction>) { ... }
}
```

Five transports in one controller. (HTTP, WebSocket, CLI, background tasks, MCP.) The transport is the only thing that changes about a request — its arrival, and its response shape. The validation, the auth, the audit log, the metrics, the error handling: all the same. That's the entire pitch.

A few things this reframing buys you, beyond the obvious "write less code":

- **MCP isn't just tools.** It's also resources and prompts. A framework should expose all three the way it exposes routes, sockets, and commands — first-class, declared on the action, generated from your existing types.
- **OAuth becomes a framework concern, not an app concern.** When agents call your API, "logged in as Evan" is a load-bearing assumption. Your framework's auth needs to mean the same thing across HTTP and MCP, or you've shipped a backdoor.
- **llms.txt is the new sitemap.** The framework should generate it for you, the way it generates `sitemap.xml`. Keryx doesn't yet — that's probably the next thing I add. ([llmstxt.org](https://llmstxt.org/) has the spec.)

## What this is really about

It's tempting to read all of this as "ship MCP," and stop there. That's not the point.

The shift is the audience. "The consumer of your software" used to mean a person at a keyboard, or another piece of code a person wrote. Now it includes an agent acting on someone's behalf — sometimes the same person, sometimes not. That audience needs the same care you'd give a human reader of your README. Clear names. Useful errors. Docs that don't make them guess.

The libraries that ship that way will be the libraries that get used. The frameworks that ship that way will be the frameworks that build them. And honestly — having now done both — the work is mostly the work I should have been doing for human readers all along. The agents just don't let me cheat.

Onward.
