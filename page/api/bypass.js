import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Fake headers để tránh bị phát hiện là bot
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    await page.goto(url, { waitUntil: "networkidle2" });

    const content = await page.content();
    await browser.close();

    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
