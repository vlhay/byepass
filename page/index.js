import { useState, useEffect } from "react";

export default function Home() {
    const [url, setUrl] = useState("");
    const [content, setContent] = useState("");

    const fetchData = async () => {
        if (!url) return;
        try {
            const res = await fetch(`/api/bypass?url=${encodeURIComponent(url)}`);
            const data = await res.json();
            setContent(data.content || "Không lấy được dữ liệu!");
        } catch (error) {
            setContent("Lỗi khi lấy dữ liệu!");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>Cloudflare Bypass API</h1>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Nhập URL cần bypass..."
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <button onClick={fetchData} style={{ padding: "10px 20px" }}>
                Lấy Dữ Liệu
            </button>
            <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
                <h3>Kết Quả:</h3>
                <p>{content}</p>
            </div>
        </div>
    );
}
