import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing, Img } from "remotion";
import { PhotoFrame } from "../components/PhotoFrame";

interface MemberSlideProps {
  startFrame: number;
  duration: number;
  /** Foto grupal */
  groupSrc: string;
  /** Nombre del integrante */
  name: string;
  /** Cargo */
  role: string;
  /** Crop para enfocar a la persona en la foto grupal */
  cropFrom?: string;
  cropTo?: string;
  /** Foto individual del integrante (opcional) */
  individualSrc?: string;
}

/**
 * Slides 12-15 – Presentación de cada integrante
 *
 * Muestra foto grupal con morph zoom hacia cada persona.
 * Nombre y cargo aparecen suavemente.
 *
 * Archivos necesarios:
 *   /public/fotos/grupal.jpg          → Foto grupal principal
 *   /public/fotos/miembro_1.jpg … (opcionales, para foto individual)
 */
export const MemberSlide: React.FC<MemberSlideProps> = ({
  startFrame,
  duration,
  groupSrc,
  name,
  role,
  cropFrom = "50% 50%",
  cropTo = "50% 40%",
  individualSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  // Placa de nombre
  const nameProgress = spring({
    frame: localFrame - 30,
    fps,
    config: { damping: 80, stiffness: 60 },
  });

  const nameOpacity = interpolate(localFrame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameX = interpolate(nameProgress, [0, 1], [40, 0]);

  // Foto individual (si existe) aparece superpuesta
  const indivOpacity = individualSrc
    ? interpolate(localFrame, [20, 45], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Línea decorativa
  const lineW = interpolate(localFrame, [35, 65], [0, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      {/* Foto grupal con zoom hacia el integrante */}
      <PhotoFrame
        src={groupSrc}
        startFrame={startFrame}
        endFrame={startFrame + duration}
        cropFrom={cropFrom}
        cropTo={cropTo}
        scaleFrom={1.0}
        scaleTo={1.1}
        overlayOpacity={0.3}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Gradiente lateral izquierdo para el panel de texto */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 65%)",
        }}
      />

      {/* Foto individual superpuesta (esquina inferior izquierda) */}
      {individualSrc && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 60,
            width: 180,
            height: 180,
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid #C9A84C",
            opacity: indivOpacity,
            boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          <Img
            src={individualSrc}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Placa de nombre y cargo */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: individualSrc ? 260 : 60,
          opacity: nameOpacity,
          transform: `translateX(${nameX}px)`,
        }}
      >
        <div
          style={{
            width: lineW,
            height: 2,
            background: "linear-gradient(90deg, #C9A84C, transparent)",
            marginBottom: 16,
          }}
        />
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 52,
            fontWeight: "600",
            color: "#F5F0E8",
            letterSpacing: "0.02em",
            textShadow: "0 2px 16px rgba(0,0,0,0.9)",
            lineHeight: 1.1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: 22,
            fontWeight: "300",
            color: "#C9A84C",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: 10,
            textShadow: "0 1px 8px rgba(0,0,0,0.8)",
          }}
        >
          {role}
        </div>
      </div>
    </div>
  );
};

/* ─── Slides individuales – edita los nombres y cargos ─── */

export const Slide12: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <MemberSlide
    {...props}
    groupSrc="/fotos/grupal.jpg"
    name="Nombre y Apellido"
    role="Presidencia"
    cropFrom="50% 50%"
    cropTo="30% 40%"
  />
);

export const Slide13: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <MemberSlide
    {...props}
    groupSrc="/fotos/grupal.jpg"
    name="Nombre y Apellido"
    role="Secretaría"
    cropFrom="50% 50%"
    cropTo="55% 40%"
  />
);

export const Slide14: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <MemberSlide
    {...props}
    groupSrc="/fotos/grupal.jpg"
    name="Nombre y Apellido"
    role="Tesorería"
    cropFrom="50% 50%"
    cropTo="70% 40%"
  />
);

export const Slide15: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <MemberSlide
    {...props}
    groupSrc="/fotos/grupal.jpg"
    name="Nombre y Apellido"
    role="Coordinación"
    cropFrom="50% 50%"
    cropTo="80% 40%"
  />
);
