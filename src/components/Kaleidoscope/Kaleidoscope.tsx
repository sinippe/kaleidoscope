import React, { useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas";
import Core, { Position, KaleidoscopeCore } from "./core/KaleidoscopeCore";

type Props = {
  imageSrc: string;
  divisions: number;
  radius: number;
  positionRate: Position;
  onLoadImage?: () => void;
  onLoadErrorImage?: () => void;
};

const Kaleidoscope: React.FC<Props> = props => {
  const [canvasContext, setCanvasContext] = useState<
    CanvasRenderingContext2D
  >();
  const [image, setImage] = useState<CanvasImageSource>();
  const [core, setCore] = useState<KaleidoscopeCore>();

  const setContext = (context: CanvasRenderingContext2D) => {
    setCanvasContext(context);
  };

  useEffect(() => {
    const htmlImage: HTMLImageElement = new Image();
    htmlImage.onload = () => {
      if (props.onLoadImage) {
        props.onLoadImage();
      }
      setImage(htmlImage);
    };
    htmlImage.onerror = () => {
      if (props.onLoadErrorImage) {
        props.onLoadErrorImage();
      }
    };
    htmlImage.src = props.imageSrc;
  }, [props.imageSrc]);

  useEffect(() => {
    if (core) {
      core.drawSections({
        positionRate: props.positionRate
      });
    }
  }, [props.positionRate, core]);

  useEffect(() => {
    if (canvasContext && image) {
      setCore(
        Core({
          context: canvasContext,
          divisions: props.divisions,
          image,
          radius: props.radius
        })
      );
    }
  }, [props.divisions, props.radius, image, canvasContext]);

  const onContextUpdate = () => {
    //updateDisplay();
  };

  return <Canvas setContext={setContext} onContextUpdate={onContextUpdate} />;
};

export default Kaleidoscope;
