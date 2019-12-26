import { useState, useEffect } from "react";

const useMousePosition = (params: { useRate?: boolean }) => {
  const useRate = params.useRate || false;
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (useRate === true) {
        setPosition({
          x: event.clientX / window.innerWidth,
          y: event.clientY / window.innerHeight
        });
      } else {
        setPosition({
          x: event.clientX,
          y: event.clientY
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return position;
};

export default useMousePosition;
