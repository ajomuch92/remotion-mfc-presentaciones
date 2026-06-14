import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

interface MorphZoomProps {
  children: React.ReactNode;
  /** Frame en que empieza la animación */
  from?: number;
  /** Frame en que termina la animación */
  to?: number;
  /** Escala inicial */
  scaleFrom?: number;
  /** Escala final */
  scaleTo?: number;
  /** Opacidad inicial */
  opacityFrom?: number;
  /** Opacidad final */
  opacityTo?: number;
  /** Dirección de traslación X (px) */
  translateX?: [number, number];
  /** Dirección de traslación Y (px) */
  translateY?: [number, number];
  style?: React.CSSProperties;
}

export const MorphZoom: React.FC<MorphZoomProps> = ({
  children,
  from = 0,
  to = 60,
  scaleFrom = 1,
  scaleTo = 1.08,
  opacityFrom = 0,
  opacityTo = 1,
  translateX = [0, 0],
  translateY = [0, 0],
  style = {},
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [from, to], [scaleFrom, scaleTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  const opacity = interpolate(frame, [from, Math.min(from + 20, to)], [opacityFrom, opacityTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const tx = interpolate(frame, [from, to], translateX, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  const ty = interpolate(frame, [from, to], translateY, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  return (
    <div
      style={{
        ...style,
        transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
        opacity,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
};
