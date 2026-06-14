import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing, Img, staticFile } from "remotion";

interface FloatingPhotoProps {
  src: string;
  style: React.CSSProperties;
  startFrame: number;
  delay?: number;
}

const FloatingPhoto: React.FC<FloatingPhotoProps> = ({ src, style, startFrame, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - startFrame - delay, fps, config: { damping: 80, stiffness: 60, mass: 1.2 } });
  const opacity = interpolate(frame, [startFrame + delay, startFrame + delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(progress, [0, 1], [0.85, 1]);

  return (
    <div style={{ ...style, opacity, transform: `${(style.transform as string) || ""} scale(${scale})`, overflow: "hidden", borderRadius: 8, boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
      <Img src={staticFile(src)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
};

export const Slide11: React.FC<{ startFrame: number; duration: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const bgOpacity = interpolate(localFrame, [0, 40], [0, 0.18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textProgress = spring({ frame: localFrame - 10, fps, config: { damping: 90, stiffness: 70, mass: 1 } });
  const textOpacity = interpolate(localFrame, [10, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textScale = interpolate(textProgress, [0, 1], [0.92, 1]);
  const lineW = interpolate(localFrame, [30, 70], [0, 480], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#080808", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, rgba(201,168,76,${bgOpacity}) 0%, transparent 65%)` }} />

      <FloatingPhoto src="photos/zonal.jpg" startFrame={startFrame} delay={40} style={{ position: "absolute", top: 60, left: 80, width: 280, height: 190, transform: "rotate(-3deg)" }} />
      <FloatingPhoto src="photos/complete.jpg" startFrame={startFrame} delay={55} style={{ position: "absolute", top: 60, right: 80, width: 280, height: 190, transform: "rotate(2.5deg)" }} />
      <FloatingPhoto src="photos/final.jpg" startFrame={startFrame} delay={65} style={{ position: "absolute", bottom: 60, left: 80, width: 280, height: 190, transform: "rotate(2deg)" }} />
      <FloatingPhoto src="photos/bless.jpg" startFrame={startFrame} delay={75} style={{ position: "absolute", bottom: 60, right: 80, width: 280, height: 190, transform: "rotate(-2.5deg)" }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, opacity: textOpacity, transform: `scale(${textScale})`, zIndex: 10, maxWidth: 860, padding: "0 40px" }}>
        <div style={{ width: lineW, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
        <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: 52, fontWeight: "300", color: "#F5F0E8", textAlign: "center", lineHeight: 1.35, letterSpacing: "0.03em", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
          "Un compromiso ante Dios,<br />
          <span style={{ color: "#C9A84C", fontWeight: "600" }}>la Iglesia y las familias</span>"
        </div>
        <div style={{ width: lineW, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
      </div>
    </div>
  );
};
