import { Blog } from "../../lib/blog";

const site_url = process.env.SITE_URL ?? "https://www.evantahler.com";

const feedOptions = {
  title: "Evan's Blog @ www.EvanTahler.com",
  description: "Evan Tahler's Blog",
  image_url: `${site_url}/logo.png`,
};

const escapeHTML = (str: string | undefined) =>
  str ? str.replace(/&/g, "-") : "";

function addLeadingZero(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

function buildRFC822Date(dateString) {
  const dayStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthStrings = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const timeStamp = Date.parse(dateString);
  const date = new Date(timeStamp);

  const day = dayStrings[date.getDay()];
  const dayNumber = addLeadingZero(date.getDate());
  const month = monthStrings[date.getMonth()];
  const year = date.getFullYear();
  const time = `${addLeadingZero(date.getHours())}:${addLeadingZero(
    date.getMinutes()
  )}:00`;

  //Wed, 02 Oct 2002 13:00:00 GMT
  return `${day}, ${dayNumber} ${month} ${year} ${time} UTC`;
}

function generateRssFeed(posts: Blog.PostData[]) {
  const items = `
    ${posts.map((post) => {
      return `<item>
        <title>${escapeHTML(post.meta.title)}</title>
        <link>${site_url}/blog/post/${post.slug}</link>
        <description>${
          escapeHTML(post.meta.description) ?? "A blog post"
        }</description>
        <pubDate>${buildRFC822Date(post.meta.date)}</pubDate>
        <guid>${site_url}/blog/post/${post.slug}</guid>
        <media:thumbnail xmlns:media="http://search.yahoo.com/mrss/"
          url="${site_url}${post.meta.image}"
          height="600" width="900" />
      </item>`;
    })}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${feedOptions.title}</title>
        <link>${site_url}/blog</link>
        <description>${feedOptions.description}</description>
        <atom:link href="${site_url}/feeds/blog" rel="self"/>
        <language>en-US</language>
        <lastBuildDate>${buildRFC822Date(posts[0].meta.date)}</lastBuildDate>
        <image>
          <url>${feedOptions.image_url}</url>
          <title>${feedOptions.title}</title>
          <link>${site_url}/blog</link>
        </image>
        ${items}
      </channel>
    </rss>`;
}

function BlogFeed() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: any }) {
  const { posts } = await Blog.getAll({ count: 100 });
  const feed = generateRssFeed(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(feed);
  res.end();

  return { props: {} };
}

export default BlogFeed;
