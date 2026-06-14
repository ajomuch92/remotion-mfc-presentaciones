import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing, Img, staticFile } from "remotion";
import { PhotoFrame } from "../components/PhotoFrame";

interface TeamSlideProps {
  startFrame: number;
  duration: number;
  /** Foto grupal o foto del área */
  groupSrc: string;
  /** Título del grupo (ej: "Equipo Coordinador", "Área 1") */
  groupTitle: string;
  /** Subtítulo opcional (ej: nombre del área o descripción) */
  groupSubtitle?: string;
  /** Crop inicial */
  cropFrom?: string;
  /** Crop final */
  cropTo?: string;
  /** Escala inicial */
  scaleFrom?: number;
  /** Escala final */
  scaleTo?: number;
  /** Foto individual circular (opcional) */
  individualSrc?: string;
  /** Nombre de la persona destacada (opcional) */
  personName?: string;
  /** Cargo de la persona destacada (opcional) */
  personRole?: string;
}

const TeamSlide: React.FC<TeamSlideProps> = ({
  startFrame, duration,
  groupSrc, groupTitle, groupSubtitle,
  cropFrom = "50% 50%", cropTo = "50% 45%",
  scaleFrom = 1.0, scaleTo = 1.1,
  individualSrc, personName, personRole,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const nameProgress = spring({ frame: localFrame - 30, fps, config: { damping: 80, stiffness: 60 } });
  const nameOpacity = interpolate(localFrame, [30, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nameX = interpolate(nameProgress, [0, 1], [40, 0]);
  const lineW = interpolate(localFrame, [35, 65], [0, 260], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  const indivOpacity = individualSrc
    ? interpolate(localFrame, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Badge superior "ÁREA X" o "COORDINADOR"
  const badgeOpacity = interpolate(localFrame, [15, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeY = interpolate(localFrame, [15, 40], [-20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#0a0a0a", overflow: "hidden" }}>
      {/* Foto de fondo con zoom morph */}
      <PhotoFrame
        src={groupSrc}
        startFrame={startFrame}
        endFrame={startFrame + duration}
        cropFrom={cropFrom}
        cropTo={cropTo}
        scaleFrom={scaleFrom}
        scaleTo={scaleTo}
        overlayOpacity={0.3}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Gradiente lateral izquierdo */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0) 68%)",
      }} />

      {/* Badge superior derecho */}
      <div style={{
        position: "absolute", top: 50, right: 60,
        opacity: badgeOpacity, transform: `translateY(${badgeY}px)`,
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6,
      }}>
        <div style={{
          fontFamily: "'Arial', sans-serif", fontSize: 11,
          color: "#C9A84C", letterSpacing: "0.3em", textTransform: "uppercase" as const,
          opacity: 0.8,
        }}>
          Toma de Posesión · MFC
        </div>
        <div style={{
          width: 80, height: 1,
          background: "linear-gradient(90deg, transparent, #C9A84C)",
        }} />
      </div>

      {/* Foto circular individual (opcional) */}
      {individualSrc && (
        <div style={{
          position: "absolute", bottom: 110, left: 60,
          width: 190, height: 190, borderRadius: "50%",
          overflow: "hidden", border: "3px solid #C9A84C",
          opacity: indivOpacity, boxShadow: "0 4px 30px rgba(0,0,0,0.7)",
        }}>
          <Img src={staticFile(individualSrc)} alt={personName || ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      {/* Panel de texto */}
      <div style={{
        position: "absolute", bottom: 70,
        left: individualSrc ? 270 : 60,
        opacity: nameOpacity, transform: `translateX(${nameX}px)`,
      }}>
        <div style={{ width: lineW, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginBottom: 18 }} />

        {/* Título del grupo */}
        <div style={{
          fontFamily: "'Arial', sans-serif", fontSize: 13,
          color: "#C9A84C", letterSpacing: "0.3em",
          textTransform: "uppercase" as const, marginBottom: 10,
          textShadow: "0 1px 6px rgba(0,0,0,0.8)",
        }}>
          {groupTitle}
        </div>

        {/* Nombre de persona destacada */}
        {personName && (
          <div style={{
            fontFamily: "'Georgia', serif", fontSize: 52, fontWeight: "600",
            color: "#F5F0E8", letterSpacing: "0.02em",
            textShadow: "0 2px 16px rgba(0,0,0,0.9)", lineHeight: 1.1, marginBottom: 10,
          }}>
            {personName}
          </div>
        )}

        {/* Subtítulo del grupo o cargo */}
        {(groupSubtitle || personRole) && (
          <div style={{
            fontFamily: "'Arial', sans-serif", fontSize: 22, fontWeight: "300",
            color: "#C9A84C", letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            textShadow: "0 1px 8px rgba(0,0,0,0.8)",
          }}>
            {personRole || groupSubtitle}
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   EQUIPO COORDINADOR
   Foto: fotos/coordinador.jpg
   Edita los nombres/cargos según corresponda
══════════════════════════════════════════════════════════ */
export const SlideCoordinador: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <TeamSlide
    {...props}
    groupSrc="photos/light.jpg"
    groupTitle="Equipo Coordinador"
    groupSubtitle="Coordinadores * 2026-2029"
    personRole="Olban y Sandra Medina"
    cropFrom="50% 50%"
    cropTo="50% 44%"
    scaleFrom={1.0}
    scaleTo={1.08}
  />
);

/* ══════════════════════════════════════════════════════════
   ÁREA 1
   Foto: fotos/area1.jpg
   Edita nombre, cargo y crop según la posición en la foto
══════════════════════════════════════════════════════════ */
export const SlideArea1: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <TeamSlide
    {...props}
    groupSrc="photos/jcl.jpg"
    groupTitle=""
    personName="Juan Carlos y Leyla Cervantes"
    personRole="Área 1"
    cropFrom="50% 50%"
    cropTo="35% 42%"
  />
);

/* ── ÁREA 2 ── */
export const SlideArea2: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <TeamSlide
    {...props}
    groupSrc="photos/mpa.jpg"
    groupTitle="Área 2"
    personName="Miguel y Patricia Amador"
    personRole="Área 2"
    cropFrom="50% 50%"
    cropTo="55% 42%"
  />
);

/* ── ÁREA 3 ── */
export const SlideArea3: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <TeamSlide
    {...props}
    groupSrc="photos/jec.jpg"
    groupTitle=""
    personName="Jorge y Eliana Castellanos"
    personRole="Área 3"
    cropFrom="50% 50%"
    cropTo="38% 44%"
  />
);

/* ── ÁREA 4 ── */
export const SlideArea4: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <TeamSlide
    {...props}
    groupSrc="photos/bible_2.jpg"
    groupTitle=""
    personName="Danerys y Ninfa Licona"
    personRole="Área 4"
    cropFrom="50% 50%"
    cropTo="60% 44%"
  />
);

/* ── ÁREA 5 ── */
export const SlideArea5: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <TeamSlide
    {...props}
    groupSrc="photos/rgl.jpg"
    groupTitle=""
    personName="Rony y Glenda Mejía"
    personRole="Área 5"
    cropFrom="50% 50%"
    cropTo="40% 44%"
  />
);

/* ── ÁREA 6 ── */
export const SlideArea6: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <TeamSlide
    {...props}
    groupSrc="photos/jft.jpg"
    groupTitle=""
    personName="Jorge y Francis Torres"
    personRole="Área 6"
    cropFrom="50% 50%"
    cropTo="62% 44%"
  />
);

/* ── ÁREA 7 ── */
export const SlideArea7: React.FC<{ startFrame: number; duration: number }> = (props) => (
  <TeamSlide
    {...props}
    groupSrc="photos/amm.jpg"
    groupTitle=""
    personName="Aarón y Martha Montes"
    personRole="Área 7"
    cropFrom="50% 50%"
    cropTo="48% 44%"
  />
);
