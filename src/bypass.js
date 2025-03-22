import puppeteer from "puppeteer-core";

export default async function bypass(url) {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  await page.goto(url, { waitUntil: "networkidle2" });

  const content = await page.content();
  await browser.close();

  return content;
}
