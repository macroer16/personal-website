import { ImageResponse } from "next/og";

// Generates the social preview image shown when the site link is shared (LinkedIn, X, WhatsApp).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Victor Benson — Computer Science student & cloud builder";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(800px 400px at 50% 0%, #2a2160, #0a0a0a)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#8b7bff", letterSpacing: 4 }}>VICTOR.BENSON</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 20 }}>Victor Benson</div>
        <div style={{ fontSize: 40, color: "#d4d4d4", marginTop: 12 }}>
          Computer Science student & cloud builder
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 40, fontSize: 26 }}>
          <span style={{ background: "rgba(255,153,0,0.15)", color: "#ff9900", padding: "8px 18px", borderRadius: 999 }}>
            AWS Solutions Architect
          </span>
          <span style={{ background: "rgba(255,255,255,0.08)", padding: "8px 18px", borderRadius: 999 }}>
            University of Westminster
          </span>
        </div>
      </div>
    ),
    size,
  );
}
