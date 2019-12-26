import React, { useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas";

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

  const drawShapes = (
    context: CanvasRenderingContext2D,
    image: CanvasImageSource,
    divisions: number,
    radius: number
  ) => {
    const imageWidth = image.width as number,
      imageHeight = image.height as number;

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < divisions; i++) {
      const startAngle = (i * Math.PI * 2) / divisions;
      const endAngle = startAngle + (Math.PI * 2) / divisions;

      context.save();

      const cx = context.canvas.width / 2,
        cy = context.canvas.height / 2;
      context.beginPath();
      context.moveTo(cx, cy);
      context.arc(cx, cy, radius, startAngle, endAngle);
      context.closePath();
      context.fillStyle = `#000000`;
      context.fill();
      context.strokeStyle = "#ffffff";
      context.stroke();
      context.clip();
      context.translate(cx, cy);
      context.rotate(Math.PI / 2 + startAngle + (endAngle - startAngle) / 2);
      if (i % 2 === 0) {
        context.scale(-1, 1);
      }
      // FIXME: calculate proper min/max values for X and Y
      const imageXValues = {
        min: -imageWidth / 2,
        max: imageWidth / 2
      };
      const imageX =
        imageXValues.min + props.left * (imageXValues.max - imageXValues.min);
      const imageYValues = {
        min: -imageHeight,
        max: imageHeight
      };
      const imageY =
        imageYValues.min + props.top * (imageYValues.max - imageYValues.min);
      context.drawImage(image, imageX, imageY);
      console.log({ imageX, imageY, imageWidth, imageHeight });
      //
      context.fillText("0", cx, cy);
      context.restore();
    }
  };

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
        drawShapes(canvasContext, myImage, props.divisions, props.radius);
      };
      htmlImage.src = props.imageSrc;
    }
  }, [myImage, canvasContext]);

  useEffect(() => {
    if (canvasContext && myImage) {
      drawShapes(canvasContext, myImage, props.divisions, props.radius);
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
