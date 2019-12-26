import React, { useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas";
import KaleidoscopeCore, { Position } from "./core/KaleidoscopeCore";

type Props = {
  imageSrc: string;
  divisions: number;
  radius: number;
  positionRate: Position;
};

const Kaleidoscope: React.FC<Props> = props => {
  const [canvasContext, setCanvasContext] = useState<
    CanvasRenderingContext2D
  >();
  const [image, setImage] = useState<CanvasImageSource>();
  let core = KaleidoscopeCore();

  const setContext = (context: CanvasRenderingContext2D) => {
    setCanvasContext(context);
  };

  useEffect(() => {
    const htmlImage: HTMLImageElement = new Image();
    htmlImage.onload = () => {
      setImage(htmlImage);
    };
    htmlImage.src = props.imageSrc;
  }, [props.imageSrc]);

  useEffect(() => {
    if (canvasContext && image) {
      core.drawSections({
        context: canvasContext,
        image: image,
        divisions: props.divisions,
        radius: props.radius,
        positionRate: props.positionRate
      });
    }
  }, [props.positionRate, props.divisions, props.radius, image, canvasContext]);

  return <Canvas setContext={setContext} />;
};

export default Kaleidoscope;
