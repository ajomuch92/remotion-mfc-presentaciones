import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { PhotoFrame } from "../components/PhotoFrame";
import { CinematicText } from "../components/CinematicText";

interface DetailSlideProps {
  startFrame: number;
  duration: number;
  src: string;
  label: string;
  slideIndex: number;
  cropFrom?: string;
  cropTo?: string;
}

const DetailSlide: React.FC<DetailSlideProps> = ({
  startFrame, duration, src, label, slideIndex,
  cropFrom = "50% 50%", cropTo = "50% 45%",
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;
  const isLeft = slideIndex % 2 === 0;

  const curtainProgress = interpolate(localFrame, [0, 35], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease),
  });

  const lineHeight = interpolate(localFrame, [20, 60], [0, 200], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease),
  });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#0a0a0a", overflow: "hidden" }}>
      <PhotoFrame
        src={src}
        startFrame={startFrame}
        endFrame={startFrame + duration}
        scaleFrom={1.0}
        scaleTo={1.1}
        cropFrom={cropFrom}
        cropTo={cropTo}
        overlayOpacity={0.35}
        style={{ position: "absolute", inset: 0 }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: isLeft
          ? "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)"
          : "linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
      }} />

      <div style={{
        position: "absolute", top: 0, bottom: 0,
        [isLeft ? "left" : "right"]: 0, width: 380,
        display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 60px", gap: 16,
      }}>
        <div style={{
          position: "absolute", [isLeft ? "left" : "right"]: 40,
          top: "50%", transform: "translateY(-50%)",
          width: 2, height: lineHeight,
          background: "linear-gradient(to bottom, transparent, #C9A84C, transparent)",
        }} />
        <div style={{ fontFamily: "'Arial', sans-serif", fontSize: 13, color: "#C9A84C", letterSpacing: "0.3em", textTransform: "uppercase" as const, opacity: curtainProgress }}>
          Preparación
        </div>
        <CinematicText
          text={label}
          startFrame={startFrame + 15}
          fontSize={56}
          color="#F5F0E8"
          fontWeight="300"
          letterSpacing="0.03em"
          textAlign={isLeft ? "left" : "right"}
          effect="slide-up"
        />
      </div>
    </div>
  );
};

export const Slide3: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <DetailSlide {...props} src="photos/bible_1.jpg" label="La Palabra" slideIndex={0} cropFrom="50% 60%" cropTo="50% 45%" />
);

export const Slide4: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <DetailSlide {...props} src="photos/light_2.jpg" label="La Luz" slideIndex={1} cropFrom="40% 50%" cropTo="55% 50%" />
);

export const Slide5: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <DetailSlide {...props} src="photos/ambiente.jpg" label="El Ambiente" slideIndex={0} cropFrom="50% 50%" cropTo="50% 40%" />
);
