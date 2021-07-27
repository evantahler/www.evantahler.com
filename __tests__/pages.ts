import fs from "fs";
import path from "path";
import parser from "xml2json";
import fetch from "isomorphic-fetch";

import { createServer } from "http";
import URL from "url";
import next from "next";

const port = 3000;
const baseUrl = `http://localhost:${port}`;
const sitemap = path.join(__dirname, "..", "public", "sitemap.xml");
let sitemapParsed: {
  loc: string;
  changefreq: string;
  priority: number;
  lastmod: Date;
}[] = [];

const contents = fs.readFileSync(sitemap).toString();
const json = JSON.parse(parser.toJson(contents));
json.urlset.url.forEach((chunk) => {
  sitemapParsed.push({
    loc: chunk.loc.replace("https://www.evantahler.com", ""),
    changefreq: chunk.changefreq,
    priority: parseFloat(chunk.priority),
    lastmod: new Date(chunk.lastmod),
  });
});

let server;

describe("sitemap and pages", () => {
  beforeAll(async () => {
    const app = next({ dev: false });
    const handle = app.getRequestHandler();
    const _next = await app.prepare();
    server = createServer((req, res) => {
      const parsedUrl = URL.parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port);

    // boot up time
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  afterAll(async () => {
    server.close();
  });

  sitemapParsed.forEach(({ loc, changefreq, priority, lastmod }) => {
    test(`page: ${loc}`, async () => {
      const page = `${baseUrl}${loc}`;
      const res = await fetch(page);
      expect(res.status).toEqual(200);
    });
  });

  test("missing pages do not render", async () => {
    const page = `${baseUrl}/missing/page`;
    const res = await fetch(page);
    expect(res.status).toEqual(404);
  });
});
