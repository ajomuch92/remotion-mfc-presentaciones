import React from "react";
import { useCurrentFrame, interpolate, Easing, Img, staticFile } from "remotion";

interface PhotoFrameProps {
  /** Nombre del archivo relativo a /public, ej: "fotos/foto1.jpg" */
  src: string;
  alt?: string;
  startFrame?: number;
  endFrame?: number;
  cropFrom?: string;
  cropTo?: string;
  scaleFrom?: number;
  scaleTo?: number;
  overlayOpacity?: number;
  style?: React.CSSProperties;
  objectFit?: "cover" | "contain";
  borderRadius?: number;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src,
  alt = "Foto MFC",
  startFrame = 0,
  endFrame = 90,
  cropFrom = "50% 50%",
  cropTo = "50% 50%",
  scaleFrom = 1,
  scaleTo = 1.06,
  overlayOpacity = 0,
  style = {},
  objectFit = "cover",
  borderRadius = 0,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  const opacity = interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [scaleFrom, scaleTo]);

  const parseCrop = (crop: string) => {
    const parts = crop.split(" ");
    return [parseFloat(parts[0]), parseFloat(parts[1])];
  };

  const [xFrom, yFrom] = parseCrop(cropFrom);
  const [xTo, yTo] = parseCrop(cropTo);

  const objX = interpolate(progress, [0, 1], [xFrom, xTo]);
  const objY = interpolate(progress, [0, 1], [yFrom, yTo]);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius,
        opacity,
        ...style,
      }}
    >
      <Img
        src={staticFile(src)}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          objectPosition: `${objX}% ${objY}%`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          display: "block",
        }}
      />
      {overlayOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(0,0,0,${overlayOpacity})`,
          }}
        />
      )}
    </div>
  );
};
