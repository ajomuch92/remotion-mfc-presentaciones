import React from "react";
import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SlideWrapper } from "./components/SlideTransition";

// Slides narrativos
import { Slide1 } from "./slides/Slide1";
import { Slide2 } from "./slides/Slide2";
import { Slide3, Slide4, Slide5 } from "./slides/Slides3_5";
import { Slide6, Slide7, Slide8, Slide9, Slide10 } from "./slides/Slides6_10";
import { Slide11 } from "./slides/Slide11";
import { SlideFinal } from "./slides/SlideFinal";

// Equipo coordinador + áreas
import {
  SlideCoordinador,
  SlideArea1, SlideArea2, SlideArea3, SlideArea4,
  SlideArea5, SlideArea6, SlideArea7,
} from "./slides/SlidesEquipo";

/**
 * ─────────────────────────────────────────────────────────────
 *  TIEMPOS DE CADA SLIDE (frames a 30fps)
 *  120 = 4s | 150 = 5s | 180 = 6s | 210 = 7s
 * ─────────────────────────────────────────────────────────────
 */
const SLIDES = [
  { id: "slide1",       duration: 150 }, // Llamado al servicio
  { id: "slide2",       duration: 150 }, // Logo → Foto
  { id: "slide3",       duration: 120 }, // Biblia
  { id: "slide4",       duration: 120 }, // Velas
  { id: "slide5",       duration: 120 }, // Decoración
  { id: "slide6",       duration: 120 }, // Posesión – vista completa
  { id: "slide7",       duration: 100 }, // Posesión – zoom centro
  { id: "slide8",       duration: 100 }, // Posesión – izquierda
  { id: "slide9",       duration: 100 }, // Posesión – derecha
  { id: "slide10",      duration: 120 }, // Posesión – pull back
  { id: "slide11",      duration: 180 }, // Compromiso + fotos
  { id: "coordinador",  duration: 180 }, // Equipo Coordinador
  { id: "area1",        duration: 150 }, // Área 1
  { id: "area2",        duration: 150 }, // Área 2
  { id: "area3",        duration: 150 }, // Área 3
  { id: "area4",        duration: 150 }, // Área 4
  { id: "area5",        duration: 150 }, // Área 5
  { id: "area6",        duration: 150 }, // Área 6
  { id: "area7",        duration: 150 }, // Área 7
  { id: "final",        duration: 210 }, // Cierre
];

// Calcular startFrame acumulado
const slidesWithStart = SLIDES.reduce<Array<{ id: string; duration: number; startFrame: number }>>(
  (acc, slide, i) => {
    const prev = acc[i - 1];
    const startFrame = prev ? prev.startFrame + prev.duration : 0;
    return [...acc, { ...slide, startFrame }];
  }, []
);

const g = (id: string) => slidesWithStart.find((s) => s.id === id)!;

const W = (id: string, Component: React.FC<{ startFrame: number; duration: number }>, fadeIn = 15, fadeOut = 15) => {
  const s = g(id);
  return (
    <SlideWrapper key={id} startFrame={s.startFrame} endFrame={s.startFrame + s.duration} fadeInFrames={fadeIn} fadeOutFrames={fadeOut}>
      <Component startFrame={s.startFrame} duration={s.duration} />
    </SlideWrapper>
  );
};

export const MFCPresentation: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/*
        MÚSICA (opcional) – pon tu archivo en /public/audio/fondo.mp3
        y descomenta estas líneas:

        import { Audio, staticFile } from "remotion";
        <Audio src={staticFile("audio/fondo.mp3")} volume={0.35} />
      */}
      <Html5Audio src={staticFile("audios/Closures.mp3")} volume={0.2} />

      {W("slide1",      Slide1,       15, 15)}
      {W("slide2",      Slide2,       15, 25)}
      {W("slide3",      Slide3,       15, 15)}
      {W("slide4",      Slide4,       15, 15)}
      {W("slide5",      Slide5,       15, 15)}
      {W("slide6",      Slide6,       20, 0)}
      {W("slide7",      Slide7,       0,  0)}
      {W("slide8",      Slide8,       0,  0)}
      {W("slide9",      Slide9,       0,  0)}
      {W("slide10",     Slide10,      0,  20)}
      {W("slide11",     Slide11,      20, 20)}
      {W("coordinador", SlideCoordinador, 20, 15)}
      {W("area1",       SlideArea1,   15, 15)}
      {W("area2",       SlideArea2,   15, 15)}
      {W("area3",       SlideArea3,   15, 15)}
      {W("area4",       SlideArea4,   15, 15)}
      {W("area5",       SlideArea5,   15, 15)}
      {W("area6",       SlideArea6,   15, 15)}
      {W("area7",       SlideArea7,   15, 15)}
      {W("final",       SlideFinal,   25, 30)}
    </AbsoluteFill>
  );
};
