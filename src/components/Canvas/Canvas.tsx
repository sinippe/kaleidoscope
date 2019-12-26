import React, { useRef, useEffect, useState, useMemo } from "react";

type Props = {
  setContext: (canvas: CanvasRenderingContext2D) => void;
  onContextUpdate?: () => void;
};

const Canvas: React.FC<Props> = props => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  let canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const onResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current && canvasRef.current.getContext("2d")) {
      props.setContext(
        canvasRef.current.getContext("2d") as CanvasRenderingContext2D
      );
    }
  }, [canvasRef]);

  useEffect(() => {
    if (props.onContextUpdate) {
      props.onContextUpdate();
    }
  }, [windowSize]);

  return (
    <canvas
      ref={canvasRef}
      width={windowSize.width}
      height={windowSize.height}
    ></canvas>
  );
};

export default Canvas;
