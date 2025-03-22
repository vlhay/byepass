import puppeteer from "puppeteer-core";

export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Thiếu URL" });

    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/google-chrome-stable"
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
