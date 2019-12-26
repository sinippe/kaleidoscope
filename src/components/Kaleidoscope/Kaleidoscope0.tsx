import React, { useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas";
import KaleidoscopeCore from "./core/KaleidoscopeCore";

type Props = {
  imageSrc: string;
  top: number;
  left: number;
  divisions: number;
  radius: number;
};

const Kaleidoscope0: React.FC<Props> = props => {
  const [canvasContext, setCanvasContext] = useState<
    CanvasRenderingContext2D
  >();
  const [myImage, setMyImage] = useState<CanvasImageSource>();

  let core = KaleidoscopeCore();

  const setContext = (context: CanvasRenderingContext2D) => {
    setCanvasContext(context);
    setMyImage(new Image());
    if (myImage) {
      const htmlImage = myImage as HTMLImageElement;
      htmlImage.onload = () => {};
      htmlImage.src = props.imageSrc;
    }
  };

  useEffect(() => {
    if (canvasContext && myImage) {
      const htmlImage = myImage as HTMLImageElement;
      htmlImage.onload = () => {
        core.drawSections({
          context: canvasContext,
          image: myImage,
          divisions: props.divisions,
          radius: props.radius,
          horizontalRate: props.left,
          verticalRate: props.top
        });
      };
      htmlImage.src = props.imageSrc;
    }
  }, [myImage, canvasContext]);

  useEffect(() => {
    if (canvasContext && myImage) {
      core.drawSections({
        context: canvasContext,
        image: myImage,
        divisions: props.divisions,
        radius: props.radius,
        horizontalRate: props.left,
        verticalRate: props.top
      });
    }
  }, [
    props.top,
    props.left,
    props.divisions,
    props.radius,
    myImage,
    canvasContext
  ]);

  return <Canvas setContext={setContext} />;
};

export default Kaleidoscope0;
