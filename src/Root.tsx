import React from "react";
import { Composition } from "remotion";
import { MFCPresentation } from "./MFCPresentation";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MFCTomaDePosesion"
        component={MFCPresentation}
        durationInFrames={2820}  // ~94 segundos a 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
