import React, { useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas";
import Core, { Position, KaleidoscopeCore } from "./core/KaleidoscopeCore";
import withLoading, { WithLoadingProps } from "../WithLoading/WithLoading";

type Props = {
  imageSrc: string;
  divisions: number;
  radius: number;
  positionRate: Position;
  onLoadImage?: () => void;
  onLoadErrorImage?: () => void;
};

const Kaleidoscope: React.FC<Props & WithLoadingProps> = props => {
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
      props.loadingComplete();
    };
    htmlImage.onerror = () => {
      if (props.onLoadErrorImage) {
        props.onLoadErrorImage();
      }
      props.loadingComplete();
    };
    htmlImage.src = props.imageSrc;
    props.loadingStart();
  }, [props.imageSrc]);

  useEffect(() => {
    if (core) {
      core.draw({
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
          radius: props.radius,
          animate: true
        })
      );
    }
  }, [props.divisions, props.radius, image, canvasContext]);

  const onContextUpdate = () => {
    //updateDisplay();
  };

  return <Canvas setContext={setContext} onContextUpdate={onContextUpdate} />;
};

export default withLoading(Kaleidoscope);
