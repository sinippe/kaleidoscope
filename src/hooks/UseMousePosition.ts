import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction
} from "react";

const useMousePosition = (props: {
  useRate?: boolean;
}): [{ x: number; y: number }, Dispatch<SetStateAction<boolean>>] => {
  const useRate = props.useRate || false;
  const [enabled, setEnabled] = useState(true);

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  const onMouseMove = useCallback((event: Event) => {
    const { x, y } = getMousePositionFromEvent(event);
    if (useRate === true) {
      setPosition({
        x: x / window.innerWidth,
        y: y / window.innerHeight
      });
    } else {
      setPosition({
        x,
        y
      });
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      window.addEventListener("touchmove", onMouseMove);
      window.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      window.removeEventListener("touchmove", onMouseMove);
      window.removeEventListener("mousemove", onMouseMove);
    };
  });

  return [position, setEnabled];
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
