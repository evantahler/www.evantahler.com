---
title: 2020 Actionhero Developer Survey Results
description: >-
  Thank you to everyone who took out 2020 developer survey — Here are the
  results. Also, the launch of Actionhero Office Hours!
date: '2020-03-01T17:53:57.706Z'
tags:
  - actionhero
  - code
  - javascript
  - node.js
featured: false
image: /images/medium-export/1__xttMYnX__HSXA2VFjXiS__Tw.png
---

Thank you to everyone who took out 2020 developer survey!

![](/images/medium-export/1__xttMYnX__HSXA2VFjXiS__Tw.png)

### Introduction

2019 was a great year for the Actionhero Project! We passed 2,000 Github stars 🌟, moved from Javascript to Typescript, and you have downloaded `actionhero` from the [npm, Inc.](https://medium.com/u/b06982b22bf4) repository more than 300,000 times! Thank you. Now it’s time to look to the future.

As the core maintainer, this survey has been very helpful to find our community’s pain-points and obtain structured feedback. 36 of you responded, and in this post, I want to analyze the survey results and discuss common themes, and share my plans for the future.

_A quick note on the survey methodology & bias: The survey link was posted on the Actionhero website, NPM page, Slack Team, and Github page for ~5 weeks. There’s a strong bias in these results toward folks that already use Actionhero regularly, as they’ll be visiting those pages the most often. The survey was also only posted in English and run via Google Forms, which may have influenced the types of folks who were able to respond._

### Actionhero is doing Well!

First and foremost… it seems that most Actionhero developers are satisfied! We received high marks on: "Developer Experience": **_4.1/5_**, "Ease of Use": **_4.0/5_** and "Documentation": **_3.3/5_**.

![](/images/medium-export/1__XhCAwanSmxdoVbp49BGNdg.png)

![](/images/medium-export/1__WdK0N1fNMx3HzJukFw7hOg.png)

![](/images/medium-export/1__8SgQaiayK7lLO5__1MfIPSw.png)

Of these 3 areas, "Documentation" is the area we need to focus on the most. This matches some of the free-form feedback received as well (more on this below).

### The Community Needs to Grow

The average Actionhero developer has been using Actionhero for over a year, and we don’t have many new users compared to "veterans".

![](/images/medium-export/1__f3D2LOupPYdNRtl__U6Ywug.png)

Folks are either finding out about Actionhero via Coworkers or [GitHub](https://medium.com/u/8df3bf3c40ae), but not at conferences or social media.

![](/images/medium-export/1__R7av8k9GSCVDxf3WKr3DsQ.png)

In the "_What would you like to see from Actionhero in 2020?_" free-response question a number of you wanted better examples and documentation… and hinted this might be a way to help attract and onboard new users.

### Plugins, Plugins, Plugins!

The most popular plugin by far is `[ah-sequulize-plugin](https://github.com/actionhero/ah-sequelize-plugin)`, with `[ah-resque-ui](https://github.com/actionhero/ah-resque-ui)` in second place. Which makes sense… folks want to to connect to the most popular databases and inspect the status of their tasks. The Task system is one of the main reasons folks are choosing Actionhero.

Many of you wanted more plugins to use in your projects. The most popular topics were:

- Authentication
- New servers/transports like gRPR, andHTTP/2
- New database connections, like MongoDB

So if you were to ask me what new features should we add to Actionhero in 2020, I would put on my best Steve Balmer voice and respond with "Plugins, Plugins, Plugins"!

![](/images/medium-export/1__F2OpxoI__u8C3uiu9foh__qg.jpeg)

I think that the core of Actionhero is in a great place now that we’ve moved to Typescript, so I don’t expect another change that drastic in 2020. I believe we should focus on adding new functionality via plugins. For example, I think we can support the [Serverless Framework](https://serverless.com/) via a plugin as a new "[Server](https://www.actionherojs.com/tutorials/servers)". I think we can make deployment "packs" for most of the popular platforms (AWS, GCE, etc) to help with the environment and more… also via plugins.

Speaking of plugins, many of the free-response comments listed that how Actionhero boots was problematic, as it didn’t allow a plugin to "inject" settings, change the environment variables, or otherwise deal with something needed by the environment. Our previous `boot.js` tool wasn’t enough. This early piece of feedback was already used to drive the [v22 release](https://github.com/actionhero/actionhero/releases/tag/v22.0.0), moving to a more developer-managed runtime.

### Miscellaneous

It looks like React and Angular are tied for popularity among the folks that use Actionhero, along with Vue.

![](/images/medium-export/1__rgH0J2fVppMtQ4kQDBDoIw.png)

Most people don’t use **_Chat_** while Most people do use **_Tasks_**.

![](/images/medium-export/1__3s7UQLTVNkis66yv4WI68Q.png)

![](/images/medium-export/1__zV5HloyJ1QaF5H6OXyRIcg.png)

Actionhero is deployed in _so_ _many_ different ways.

![](/images/medium-export/1__MrPfSL7qVqoof7byUeATyg.png)

Our community is almost ~50/50 on Typescript.

![](/images/medium-export/1__Q0qAI5nochXDZnQZrsivhw.png)

And finally, the majority of Actionhero users are in the USA, and speak English when developing Actionhero. Germany and the Ukraine (with their respective languages) are #2 and #3 in popularity. 🇺🇸🇩🇪🇺🇦

### Next Steps: "Actionhero Office Hours"

Putting on my Product Manager hat, here’s my priority list of what to work on, in order based on this survey:

1.  ✅ Change how actionhero boots to allow modification in `server.ts` to allow for local modifications, loading config into the env, etc. This was the core change in the [v22 release of Actionhero](https://github.com/actionhero/actionhero/releases/tag/v22.0.0).
2.  ✅ Update the `[actionhero-tutorial](https://github.com/actionhero/actionhero-tutorial)` project to Typescript. Done!
3.  (in progress) Update `[ah-resque-ui](https://github.com/actionhero/ah-resque-ui)` to work with v20+ of Actionhero… and perhaps include it in newly generated Actionhero projects?
4.  Display the "[Tutorials](https://www.actionherojs.com/tutorials)" part of the website more prominently, as some folks didn’t know it existed.
5.  Better explaining/handling the "shutdown" of the sever, and how to handle tasks (see: [https://blog.evantahler.com/production-node-applications-with-docker-3-devops-tips-for-shutting-down-properly-ed54f09f0a7f)](https://blog.evantahler.com/production-node-applications-with-docker-3-devops-tips-for-shutting-down-properly-ed54f09f0a7f%29~~). Better explain this forActionhero directly.
6.  Translate the documentation & website to other languages.
7.  Evangelize Actionhero at Conferences and online.
8.  Make awesome plugins.

I would love enable more members of the community to help with this work, so I am making an open commitment of my time to help you work on these features! I think we’ve made Actionhero easy to work on, as it uses so many of its own concepts internally, has a great test suite, and many dependancies. If you are new to programming, or new to Actionhero — I’m committing a few hours a week to help new developers learn how Actionhero works and to make it better. Let’s call these **Actionhero Office Hours** . Please join me on [slack.actionherojs.com](http://slack.actionherojs.com) to choose a feature to work on, and talk about ideas!

I hope for these to be like Office Hours in a University — while we all have the same general topic (Actionhero!), it will be unstructured time to dive deep into a particular area, both with me and the other attendees. Within the first few minutes, we’ll collect the topics you come with, and divide up the time in the session between them. Hopefully I or the other attendees can help unblock you, or you might find a peer interested in the same topic to work with! After a few initial Office Hours, we can see which other times make the most sense for the community, and perhaps do 2-per-week. We can work on Pull Requests, new plugins… or even that Actionhero-centric tech talk you are working on!

_The first inaugural "Actionhero Office Hours" will be between 5–6PM (USA Pacific Time) on March 4th, and then repeat every Wednesday. The google hangout URL will be posted in our_ [_slack.actionherojs.com_](http://slack.actionherojs.com) _and_ [_Twitter_](https://twitter.com/actionherojs) _a few hours beforehand._

Thank you, and I look forward to seeing you at Office Hours 🎓!

![](/images/medium-export/1__U66BPxslmDSBi__iqGgtNEg.png)
