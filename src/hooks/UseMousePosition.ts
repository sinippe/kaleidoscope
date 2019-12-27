import { useState, useEffect, useReducer } from "react";

const useMousePosition = (props: {
  useRate?: boolean;
  switchActiveOnClick?: boolean;
  defaultActive?: boolean;
}) => {
  const useRate = props.useRate || false;
  const switchActiveOnClick = props.switchActiveOnClick || false;
  const defaultActive =
    (switchActiveOnClick === true && props.defaultActive === true) ||
    switchActiveOnClick !== true
      ? true
      : false;

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  let isActive = defaultActive;

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!isActive) {
        return;
      }
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

    const onClick = () => {
      isActive = !isActive;
    };

    window.addEventListener("click", onClick);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onClick);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return {
    mousePosition: position,
    mouseMoveisActive: isActive
  };
};

export default useMousePosition;
