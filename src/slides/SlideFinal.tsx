import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing, Img, staticFile } from "remotion";
import { PhotoFrame } from "../components/PhotoFrame";

export const SlideFinal: React.FC<{ startFrame: number; duration: number }> = ({ startFrame, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const slideOpacity = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });
  const slideFadeOut = interpolate(localFrame, [duration - 30, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const textProgress = spring({ frame: localFrame - 40, fps, config: { damping: 90, stiffness: 60, mass: 1.2 } });
  const textOpacity = interpolate(localFrame, [40, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textY = interpolate(textProgress, [0, 1], [30, 0]);
  const logoOpacity = interpolate(localFrame, [70, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW = interpolate(localFrame, [50, 90], [0, 500], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });
  const overlayOpacity = interpolate(localFrame, [0, 60], [0, 0.65], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#050505", overflow: "hidden", opacity: Math.min(slideOpacity, slideFadeOut) }}>
      <PhotoFrame
        src="photos/final.jpg"
        startFrame={startFrame}
        endFrame={startFrame + duration}
        cropFrom="50% 45%"
        cropTo="50% 50%"
        scaleFrom={1.08}
        scaleTo={1.0}
        style={{ position: "absolute", inset: 0 }}
      />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,${overlayOpacity}) 0%, rgba(0,0,0,0) 50%)` }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 100%)" }} />

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 80px 80px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div style={{ width: lineW, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />

        <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: 64, fontWeight: "300", color: "#F5F0E8", textAlign: "center", letterSpacing: "0.05em", textShadow: "0 2px 24px rgba(0,0,0,0.9)", opacity: textOpacity, transform: `translateY(${textY}px)`, lineHeight: 1.2 }}>
          "Servir es{" "}
          <span style={{ color: "#C9A84C", fontStyle: "italic", fontWeight: "600" }}>amar en acción</span>"
        </div>

        <div style={{ width: lineW, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />

        <div style={{ opacity: logoOpacity, marginTop: 8, display: "flex", alignItems: "center", gap: 16 }}>
          <Img src={staticFile("logos/mfc-logo.jpg")} alt="MFC" style={{ height: 50, width: "auto", filter: "brightness(0.9)" }} />
          <div style={{ width: 1, height: 40, background: "rgba(201,168,76,0.5)" }} />
          <div style={{ fontFamily: "'Arial', sans-serif", fontSize: 14, color: "#C9A84C", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>
            Movimiento Familiar Cristiano
          </div>
        </div>
      </div>
    </div>
  );
};
