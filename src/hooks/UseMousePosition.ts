import React, { useState, useEffect, useCallback } from "react";

const useMousePosition = (props: {
  useRate: boolean;
  enabled?: boolean;
}): [
  { x: number; y: number },
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [enabled, setEnabled] = useState(props.enabled ? props.enabled : true);

  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0
  });

  const onMouseMove = useCallback(
    (event: Event) => {
      const { x, y } = getMousePositionFromEvent(event);
      if (props.useRate === true) {
        setMousePosition({
          x: x / window.innerWidth,
          y: y / window.innerHeight
        });
      } else {
        setMousePosition({
          x,
          y
        });
      }
    },
    [props.useRate]
  );

  useEffect(() => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onMouseMove);
    if (enabled) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return [mousePosition, setEnabled];
};

const getMousePositionFromEvent = (event: Event) => {
  let x = NaN,
    y = NaN;
  if (event.type === "touchmove") {
    const touchEvent = event as TouchEvent;
    x = touchEvent.touches[0].clientX;
    y = touchEvent.touches[0].clientY;
  } else if (event.type === "mousemove") {
    const mouseEvent = event as MouseEvent;
    x = mouseEvent.clientX;
    y = mouseEvent.clientY;
  }
  return { x, y };
};

export default useMousePosition;
