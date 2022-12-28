// based on: https://advancedweb.hu/how-to-speed-up-puppeteer-scraping-with-parallelization/
const express = require("express");
const puppeteer = require("puppeteer");
const { requireUrls } = require("./middleware");

const withBrowser = async (fn) => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  try {
    return await fn(browser);
  } finally {
    await browser.close();
  }
};

const withPage = (browser) => async (fn) => {
  const page = await browser.newPage({
    waitUntil: ["domcontentloaded", "networkidle0"],
  });
  try {
    return await fn(page);
  } finally {
    await page.close();
  }
};

const app = express();

app.get("/", requireUrls, async (req, res, next) => {
  let {
    query: { urls },
  } = req;

  if (!Array.isArray(urls)) {
    urls = [urls];
  }

  try {
    const results = await withBrowser(async (browser) => {
      return Promise.all(
        urls.map(async (url) => {
          return withPage(browser)(async (page) => {
            await page.goto(url);
            return { url, content: await page.content() };
          });
        })
      );
    });

    res.json(results);
  } catch (err) {
    next(err);
  }
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
