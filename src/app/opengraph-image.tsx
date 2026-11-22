import { ImageResponse } from "next/og";

// Social preview image (LinkedIn, X, WhatsApp), in the same paper-and-ink style as the site.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Victor Benson — computer science student & cloud builder";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", background: "#f5f2ea", color: "#1b1a17", fontFamily: "serif" }}>
        <div style={{ fontSize: 40, display: "flex" }}>vb<span style={{ color: "#c8102e" }}>.</span></div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, lineHeight: 1 }}>victor benson</div>
          <div style={{ fontSize: 34, color: "#55524b", marginTop: 24, fontFamily: "monospace" }}>computer science student &amp; cloud builder</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8a867c", fontFamily: "monospace", borderTop: "2px dashed #d9d4c7", paddingTop: 24 }}>
          <span>university of westminster · london</span>
          <span>aws certified solutions architect</span>
        </div>
      </div>
    ),
    size,
  );
}
