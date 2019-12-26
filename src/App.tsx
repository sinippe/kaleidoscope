import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import Kaleidoscope from "./components/Kaleidoscope/Kaleidoscope0";
import OptionsDrawer from "./components/OptionsDrawer/OptionsDrawer";

// TODO: move all the mouse events related code
// TODO: check if image exists

const sampleImage = "img/swarovski_kristallwelten_innsbruck.jpg";
// const sampleImage =
//   "https://andreiverner.com/wp-content/uploads/2019/07/hanuman-color-1.jpg";
//const sampleImage = "https://andreiverner.com/wp-content/uploads/2019/07/alien-cave-artwork.jpg";

const DIVISIONS_DEFAULT = 8;
const RADIUS_DEFAULT = 400;

const App: React.FC = () => {
  const [mouseMoveEnabled, setMouseMoveEnabled] = useState<boolean>(false);
  const [mousePositionRate, setMousePositionRate] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0
  });
  const [divisions, setDivisions] = useState<number>(DIVISIONS_DEFAULT);
  const [radius, setRadius] = useState<number>(RADIUS_DEFAULT);

  const onClick = () => {
    setMouseMoveEnabled(prev => {
      return !prev;
    });
  };

  const onMouseMove = (event: MouseEvent) => {
    setMousePositionRate({
      top: event.pageY / window.innerHeight,
      left: event.pageX / window.innerWidth
    });
  };

  useEffect(() => {
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMouseMove);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log({ mouseMoveEnabled, onMouseMove });
    if (mouseMoveEnabled === true) {
      window.addEventListener("mousemove", onMouseMove);
    } else {
      // FIXME: "mousemove" listener won't be removed from //window
      window.removeEventListener("mousemove", onMouseMove);
    }
  }, [mouseMoveEnabled]);

  // TODO: improve (useReducer)
  const onChangeDivisions = (value: number) => {
    console.log(`onChangeDivisions: ${value}`);
    setDivisions(value);
  };

  const onChangeRadius = (value: number) => {
    setRadius(value);
  };

  return (
    <AppDiv>
      <p
        style={{
          position: `static`,
          top: 0,
          left: 0,
          background: `black`,
          fontSize: `0.9em`,
          color: `white`,
          width: `150px`
        }}
      >
        Enabled: {mouseMoveEnabled ? "true" : "false"}
        <br />
        Top: {mousePositionRate.top.toFixed(3)}
        <br />
        Left: {mousePositionRate.left.toFixed(3)}
        <br />
      </p>
      <OptionsDrawer
        onChangeDivisions={onChangeDivisions}
        onChangeRadius={onChangeRadius}
      />
      <Kaleidoscope
        imageSrc={sampleImage}
        divisions={divisions}
        radius={radius}
        {...mousePositionRate}
      />
    </AppDiv>
  );
};

const AppDiv = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;
