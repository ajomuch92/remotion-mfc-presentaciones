import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from "remotion";

interface CinematicTextProps {
  text: string;
  /** Frame en que aparece el texto */
  startFrame?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  letterSpacing?: string;
  textAlign?: "left" | "center" | "right";
  style?: React.CSSProperties;
  /** Efecto de entrada: 'fade', 'slide-up', 'scale' */
  effect?: "fade" | "slide-up" | "scale";
  /** Línea secundaria (subtítulo) */
  subtitle?: string;
  subtitleSize?: number;
}

export const CinematicText: React.FC<CinematicTextProps> = ({
  text,
  startFrame = 0,
  fontSize = 72,
  color = "#FFFFFF",
  fontFamily = "'Georgia', 'Times New Roman', serif",
  fontWeight = "300",
  letterSpacing = "0.05em",
  textAlign = "center",
  style = {},
  effect = "fade",
  subtitle,
  subtitleSize = 32,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 80,
      stiffness: 80,
      mass: 1,
    },
  });

  const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let transform = "none";
  if (effect === "slide-up") {
    const y = interpolate(progress, [0, 1], [40, 0]);
    transform = `translateY(${y}px)`;
  } else if (effect === "scale") {
    const s = interpolate(progress, [0, 1], [0.85, 1]);
    transform = `scale(${s})`;
  }

  const subtitleOpacity = interpolate(frame, [startFrame + 15, startFrame + 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ textAlign, ...style }}>
      <div
        style={{
          fontFamily,
          fontSize,
          fontWeight,
          color,
          letterSpacing,
          lineHeight: 1.2,
          opacity,
          transform,
          textShadow: "0 2px 20px rgba(0,0,0,0.6)",
        }}
      >
        {text}
      </div>
      {subtitle && (
        <div
          style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: subtitleSize,
            fontWeight: "300",
            color,
            letterSpacing: "0.15em",
            marginTop: 16,
            opacity: subtitleOpacity,
            textTransform: "uppercase",
            textShadow: "0 1px 10px rgba(0,0,0,0.5)",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
