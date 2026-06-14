import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { PhotoFrame } from "../components/PhotoFrame";

interface CeremonySlideProps {
  startFrame: number;
  duration: number;
  src: string;
  cropFrom: string;
  cropTo: string;
  scaleFrom?: number;
  scaleTo?: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
}

const CeremonySlide: React.FC<CeremonySlideProps> = ({
  startFrame, duration, src, cropFrom, cropTo,
  scaleFrom = 1.0, scaleTo = 1.08, fadeIn = true, fadeOut = false,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const fadeInOpacity = fadeIn
    ? interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) })
    : 1;
  const fadeOutOpacity = fadeOut
    ? interpolate(localFrame, [duration - 20, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#000", overflow: "hidden", opacity: Math.min(fadeInOpacity, fadeOutOpacity) }}>
      <PhotoFrame
        src={src}
        startFrame={startFrame}
        endFrame={startFrame + duration}
        cropFrom={cropFrom}
        cropTo={cropTo}
        scaleFrom={scaleFrom}
        scaleTo={scaleTo}
        style={{ position: "absolute", inset: 0 }}
      />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />
    </div>
  );
};

export const Slide6: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <CeremonySlide {...props} src="photos/sagrada_familia.jpg" cropFrom="50% 50%" cropTo="50% 45%" scaleFrom={1.0} scaleTo={1.06} fadeIn />
);
export const Slide7: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <CeremonySlide {...props} src="photos/directiva.jpg" cropFrom="50% 60%" cropTo="50% 50%" scaleFrom={1.06} scaleTo={1.14} />
);
export const Slide8: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <CeremonySlide {...props} src="photos/mfcj.jpg" cropFrom="55% 50%" cropTo="35% 48%" scaleFrom={1.05} scaleTo={1.1} />
);
export const Slide9: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <CeremonySlide {...props} src="photos/fray.jpg" cropFrom="45% 50%" cropTo="65% 50%" scaleFrom={1.05} scaleTo={1.1} />
);
export const Slide10: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <CeremonySlide {...props} src="photos/estandarte.jpg" cropFrom="50% 45%" cropTo="50% 50%" scaleFrom={1.12} scaleTo={1.0} fadeOut />
);
