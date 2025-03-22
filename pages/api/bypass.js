import cloudscraper from "cloudscraper";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Thiếu URL!" });
  }

  try {
    const response = await cloudscraper.get({
      uri: url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu!", details: error.message });
  }
}
