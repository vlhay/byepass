import chromium from "chrome-aws-lambda";

export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Thiếu URL" });

    try {
        const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        const content = await page.content();
        await browser.close();

        res.status(200).json({ content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
