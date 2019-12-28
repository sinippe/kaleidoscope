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
    const mouseEvent = event as MouseEvent;
    const touchEvent = event as TouchEvent;
    const mouseX =
      event.type === "touchmove"
        ? touchEvent.touches[0].clientX
        : mouseEvent.clientX;
    const mouseY =
      event.type === "touchmove"
        ? touchEvent.touches[0].clientY
        : mouseEvent.clientY;
    if (useRate === true) {
      setPosition({
        x: mouseX / window.innerWidth,
        y: mouseY / window.innerHeight
      });
    } else {
      setPosition({
        x: mouseX,
        y: mouseY
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

export default useMousePosition;
