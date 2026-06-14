import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { PhotoFrame } from "../components/PhotoFrame";
import { CinematicText } from "../components/CinematicText";

export const Slide1: React.FC<{ startFrame: number; duration: number }> = ({
  startFrame,
  duration,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const lineWidth = interpolate(localFrame, [30, 70], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#0a0a0a", overflow: "hidden" }}>
      <PhotoFrame
        src="photos/parroquia.jpg"
        startFrame={startFrame}
        endFrame={startFrame + duration}
        scaleFrom={1.0}
        scaleTo={1.12}
        cropFrom="50% 40%"
        cropTo="50% 50%"
        style={{ position: "absolute", inset: 0, filter: "blur(4px) brightness(0.4)" }}
      />

      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24,
      }}>
        <div style={{
          opacity: interpolate(localFrame, [10, 40], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          marginBottom: 24,
          fontSize: 100,
        }}>
          ⛪
        </div>

        <div style={{ width: lineWidth, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", marginBottom: 8 }} />

        <CinematicText text="Todo servicio comienza" startFrame={startFrame + 20} fontSize={68} color="#F5F0E8" fontWeight="300" letterSpacing="0.04em" effect="slide-up" />
        <CinematicText text="con un llamado" startFrame={startFrame + 35} fontSize={68} color="#C9A84C" fontWeight="600" letterSpacing="0.06em" effect="slide-up" />

        <div style={{ width: lineWidth, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", marginTop: 8 }} />
      </div>
    </div>
  );
};
