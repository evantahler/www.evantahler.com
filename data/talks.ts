export type Talk = {
  title: string;
  date: string;
  where: string;
  image: string;
  description: string;
  links: TalkLink[];
};

export type TalkLink = { title: string; url: string };

export const talks: Talk[] = [
  {
    title: "Tools! — A History of Agents Doing Stuff",
    date: "December, 2025",
    where: "AI Agents SF #9: Past, Present, and Future",
    image: "/images/talks/ai-agents-sf-9.jpg",
    description:
      "How agents escaped the chat box and gained access to hundreds of MCP servers, the patterns emerging for keeping them safe, and where things are heading next — with risky live demos. Followed by a panel on the past, present, and future of AI Agents alongside Erik Meijer (Normal Computing), Vincent Koc, and Allie Jones.",
    links: [
      {
        title: "Event Page",
        url: "https://luma.com/kff29lg4",
      },
    ],
  },
  {
    title: "MCP After Dark: Live Demo of MongoDB × Arcade",
    date: "October, 2025",
    where: "SF Tech Week (Arcade.dev HQ)",
    image: "/images/talks/mcp-after-dark.png",
    description:
      "A live demo of the MongoDB integration with Arcade, co-presented with Anaiya R (Senior Technical Evangelist, MongoDB), at Arcade.dev's SF Tech Week event. The night also featured a panel on the next generation of products built on MCP with Nate Barbettini (Arcade), Max Gerber (Stytch), David Garnitz (Yapify), and Apoorva Joshi (MongoDB), moderated by Gabriela de Queiroz.",
    links: [
      {
        title: "Event Page",
        url: "https://partiful.com/e/6j92SfgQDCFZOJCHzPsT",
      },
    ],
  },
  {
    title: "AI in the Data Stack: From Dashboards to Agents",
    date: "August, 2025",
    where: "Arcade × Airbyte Webinar",
    image: "/images/talks/ai-in-the-data-stack.jpg",
    description:
      "A conversation with Alex Girard (Airbyte) about AI security in the modern data stack, landing on a mental model that changes everything: your LLM is just another user. We dig into the patterns and pitfalls of letting agents touch real data systems.",
    links: [
      {
        title: "Video",
        url: "https://www.youtube.com/watch?v=E39LhjEpo-I",
      },
    ],
  },
  {
    title: "Design Principles for ELT Database Destinations",
    date: "December, 2023",
    where: "move(data)",
    image: "/images/elt-db-design-principles-presentation.png",
    description:
      "The session will address issues such as data type errors, schema changes, and data accessibility. Attendees will learn about Airbyte's innovative approach to ensuring easy-to-query tables, decoupling sync errors from data errors, and enhancing overall data observability. ",
    links: [
      {
        title: "Speaker Page",
        url: "https://movedata.airbyte.com/event/design-principles-for-elt-database-destinations",
      },
    ],
  },
  {
    title: "git push your data stack with Airbyte, Airflow and dbt",
    date: "May, 2022",
    where: "Airflow Summit",
    image: "/images/talks/airflow-summit-2022.jpg",
    description:
      "Treat your data stack like a software project. Co-presented with Marcos Marx (Airbyte), this session walks through using Git, Airflow, and dbt to manage Airbyte connections as code — so the people who build your pipelines can ship them with the same workflow they use for everything else.",
    links: [
      {
        title: "Video",
        url: "https://www.youtube.com/watch?v=_pLDo04sv2U",
      },
      {
        title: "Session Page",
        url: "https://airflowsummit.org/sessions/2022/git-push-your-data-stack-with-airbyte-airflow-and-dbt/",
      },
    ],
  },
  {
    title: "How I learned to Stop Worrying and Let the Robot Publish to NPM",
    date: "September, 2020",
    where: "CascadiaJS",
    image: "/images/evan-tahler-illustration.png",
    description:
      "As professional developers, we /probably/ don’t deploy code directly to production and we /usually/ test things first. There’s a whole world of tools and best practices like Git Flow, Continuous Integration, and Review Apps to help us build and deploy our apps and websites... but what about the developer tools we use every day? This talk will focus on how to parallel some of these same best-practices when making developer tools and frameworks. Together we will build a CI/CD pipeline for publishing to packages to NPM.",
    links: [
      {
        title: "Speaker Page",
        url: "https://2020.cascadiajs.com/speakers/evan-tahler",
      },
    ],
  },
  {
    title: "Sharing Typescript Types Across the Stack",
    date: "February, 2020",
    where: "SeattleJS",
    image: "/images/types-presentation.png",
    description:
      "Use Typescript to share types between your Frontend and Backend.  Discover the shape of your data to avoid mistakes!",
    links: [
      {
        title: "Slides",
        url: "https://docs.google.com/presentation/d/1LrG0ptT7K-AG1d_1f_mefgVLUGm-TcEqzPdP7n0jf_4",
      },
      {
        title: "Code",
        url: "https://github.com/evantahler/pokemon-typescript",
      },
      {
        title: "Video",
        url: "https://www.youtube.com/watch?v=tJtL4LtKQnA",
      },
    ],
  },
  {
    title:
      "Using Next.JS to build Static Dynamic Websites… and never pay for font-end hosting again!",
    date: "September, 2019",
    where: "SeattleJS",
    image: "/images/seattlejs.jpg",
    description:
      "This talk was inspired by a group of students learning to code in Seattle who were being taught tools like React and Angular, but struggling to learn how to deploy their sites using modern methods. Specifically, how to set up CI/CD (Continuous Integration + Continuous Deployment) and HTTPS.",
    links: [
      {
        title: "Slides",
        url: "https://speakerdeck.com/evantahler/using-next-dot-js-to-build-static-dynamic-websites-dot-dot-dot-and-never-pay-for-font-end-hosting-again",
      },
      {
        title: "Code",
        url: "https://github.com/evantahler/next-static-hosting",
      },
    ],
  },
  {
    title: "Background Tasks in Node.js: A survey with Redis.",
    date: "May, 2016",
    where: "RedisConf",
    image: "/images/redisconf.jpg",
    description:
      "Node.js' Async programming model allows us to emulate many types of advanced systems. In this talk, we will use node and redis to recreate 7 different types of background job systems, from queues to kafka.",
    links: [
      {
        title: "Video",
        url: "https://www.youtube.com/watch?list=PL83Wfqi-zYZHtHoGv3PcGQA3lvE9p1eRl&time_continue=218&v=NNTsHzER31I",
      },
      {
        title: "Slides",
        url: "https://speakerdeck.com/evantahler/background-jobs-in-node-dot-js-redisconf-2016",
      },
      {
        title: "Article",
        url: "https://blog.evantahler.com/background-tasks-in-node-js-a-survey-with-redis-971d3575d9d2",
      },
    ],
  },
  {
    title: "Node for ! (not) HTTP",
    date: "Dec, 2015",
    where: "SF Node",
    image: "/images/sfnode.jpg",
    description:
      "Node.js is great for all sorts of projects. In this demo, we will use Node.js to control the lights in our house via the DMX protocol.",
    links: [
      {
        title: "Slides",
        url: "https://speakerdeck.com/evantahler/node-for-not-http",
      },
      {
        title: "Code",
        url: "https://github.com/evantahler/node_for_not_http",
      },
    ],
  },
];
