import React from "react";
import {
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { PhotoFrame } from "../components/PhotoFrame";

export const Slide2: React.FC<{ startFrame: number; duration: number }> = ({
  startFrame,
  duration,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const logoOpacity = interpolate(localFrame, [0, 20, 55, 80], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const photoOpacity = interpolate(localFrame, [55, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = interpolate(localFrame, [55, 90], [1, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(localFrame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textY = interpolate(localFrame, [90, 110], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const lineW = interpolate(localFrame, [90, 120], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0d0d0d",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: photoOpacity }}>
        <PhotoFrame
          src="photos/estandarte.jpg"
          startFrame={startFrame + 55}
          endFrame={startFrame + duration}
          scaleFrom={1.0}
          scaleTo={1.05}
          overlayOpacity={0.5}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {/* Logo MFC */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          zIndex: 2,
        }}
      >
        <Img
          src={staticFile("logos/mfc-logo.jpg")}
          alt="Logo MFC"
          style={{
            width: 220,
            height: "auto",
            filter: "drop-shadow(0 4px 24px rgba(201,168,76,0.4))",
          }}
        />
        <Img
          src={staticFile("logos/mfcj-logo.jpg")}
          alt="Logo MFC"
          style={{
            width: 220,
            height: "auto",
            filter: "drop-shadow(0 4px 24px rgba(201,168,76,0.4))",
          }}
        />
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 28,
            color: "#C9A84C",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            fontWeight: "300",
          }}
        >
          Movimiento Familiar Cristiano
        </div>
      </div>
      {/* Texto del evento */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          zIndex: 3,
        }}
      >
        <Img
          src={staticFile("photos/estandarte.jpg")}
          alt="Logo MFC"
          style={{ width: 1500, height: "auto" }}
        />
        <div
          style={{
            width: lineW,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            marginBottom: 8,
          }}
        />
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 42,
            color: "#F5F0E8",
            fontWeight: "600",
            letterSpacing: "0.05em",
            textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            textAlign: "center" as const,
          }}
        >
          Toma de Posesión
        </div>
        <div
          style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: 24,
            color: "#C9A84C",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            textShadow: "0 1px 8px rgba(0,0,0,0.8)",
          }}
        >
          Equipo Parroquial · 2026-2029
        </div>
      </div>
    </div>
  );
};
