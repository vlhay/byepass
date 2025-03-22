import express from "express";
import bypass from "./bypass.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Cloudflare Bypass API is running!");
});

app.get("/bypass", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Thiếu URL!" });
  }

  try {
    const data = await bypass(url);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu!", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
