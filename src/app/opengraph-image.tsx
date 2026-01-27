import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Micii Campioni - Educatie acvatica pentru copii";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0d9488 0%, #0f766e 50%, #115e59 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative waves */}
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0, opacity: 0.1 }}
        >
          <path
            d="M0 400C200 350 400 450 600 400C800 350 1000 450 1200 400V630H0V400Z"
            fill="white"
          />
          <path
            d="M0 480C200 430 400 530 600 480C800 430 1000 530 1200 480V630H0V480Z"
            fill="white"
            opacity="0.5"
          />
        </svg>

        {/* Swimmer icon */}
        <div
          style={{
            display: "flex",
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 40 }}>🏊</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          Micii Campioni
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            marginTop: 16,
            maxWidth: 700,
          }}
        >
          Primul club de educatie acvatica din Romania
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            marginTop: 32,
            padding: "8px 24px",
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.9)",
            fontSize: 18,
          }}
        >
          Din 2001 · Metoda Sultana · Bucuresti
        </div>
      </div>
    ),
    { ...size }
  );
}
