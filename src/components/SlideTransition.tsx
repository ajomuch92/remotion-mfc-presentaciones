import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface SlideTransitionProps {
  /** Frame de inicio de la transición */
  startFrame: number;
  /** Duración de la transición en frames (default: 20) */
  transitionFrames?: number;
  /** Tipo de transición */
  type?: "fade" | "cross-dissolve" | "dip-black";
}

/**
 * Capa de transición entre slides.
 * Úsala encima de cada slide para crear suaves dissolves.
 */
export const SlideTransition: React.FC<SlideTransitionProps> = ({
  startFrame,
  transitionFrames = 20,
  type = "cross-dissolve",
}) => {
  const frame = useCurrentFrame();

  if (type === "dip-black") {
    // Oscurece y vuelve a aclarar
    const dipOpacity = interpolate(
      frame,
      [startFrame, startFrame + transitionFrames / 2, startFrame + transitionFrames],
      [0, 1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.ease),
      }
    );
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000000",
          opacity: dipOpacity,
          pointerEvents: "none",
          zIndex: 100,
        }}
      />
    );
  }

  return null;
};

/**
 * Componente que envuelve un slide con fade in/out
 */
export const SlideWrapper: React.FC<{
  children: React.ReactNode;
  startFrame: number;
  endFrame: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
}> = ({ children, startFrame, endFrame, fadeInFrames = 0, fadeOutFrames = 0 }) => {
  const frame = useCurrentFrame();

  const fadeIn =
    fadeInFrames > 0
      ? interpolate(frame, [startFrame, startFrame + fadeInFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const fadeOut =
    fadeOutFrames > 0
      ? interpolate(frame, [endFrame - fadeOutFrames, endFrame], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const opacity = Math.min(fadeIn, fadeOut);

  if (frame < startFrame || frame >= endFrame) return null;

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      {children}
    </div>
  );
};
