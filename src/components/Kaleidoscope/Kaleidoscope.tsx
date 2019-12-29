import React, { useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas";
import KaleidoscopeCore, { Position } from "./core/KaleidoscopeCore";

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
  let core = KaleidoscopeCore();

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
    updateDisplay();
  }, [props.positionRate, props.divisions, props.radius, image, canvasContext]);

  const onContextUpdate = () => {
    updateDisplay();
  };

  const updateDisplay = () => {
    if (canvasContext && image) {
      core.drawSections({
        context: canvasContext,
        image: image,
        divisions: props.divisions,
        radius: props.radius,
        positionRate: props.positionRate
      });
    }
  };

  return <Canvas setContext={setContext} onContextUpdate={onContextUpdate} />;
};

export default Kaleidoscope;
