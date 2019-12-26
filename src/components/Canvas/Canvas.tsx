import React, { useRef, useEffect } from "react";

type Props = {
  setContext: (canvas: CanvasRenderingContext2D) => void;
};

const Canvas: React.FC<Props> = props => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current && canvasRef.current.getContext("2d")) {
      props.setContext(
        canvasRef.current.getContext("2d") as CanvasRenderingContext2D
      );
    }
    // eslint-disable-next-line
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
};

export default Canvas;
