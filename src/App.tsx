import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import Kaleidoscope from "./components/Kaleidoscope/Kaleidoscope";
import OptionsDrawer from "./components/OptionsDrawer/OptionsDrawer";

// TODO: move all the mouse events related code
// TODO: check if image exists

//const sampleImage = "img/swarovski_kristallwelten_innsbruck.jpg";
//const sampleImage =
//  "https://andreiverner.com/wp-content/uploads/2019/07/hanuman-color-1.jpg";
const sampleImage =
  "https://andreiverner.com/wp-content/uploads/2019/07/alien-cave-artwork.jpg";
//const sampleImage =
//  "https://www.poulet.ca/assets/RecipePhotos/_resampled/FillWyIxNDQwIiwiNzAwIl0/california-club.jpg";
//const sampleImage =
//  "https://lamouettebblog.files.wordpress.com/2016/03/hybridbar_taps4.jpg";
//const sampleImage = "https://vl-media.fr/wp-content/uploads/2018/01/trump.jpg";
//const sampleImage =
//  "https://previews.123rf.com/images/visharo/visharo1701/visharo170100240/71478803-motif-de-kal%C3%A9idoscope.jpg";

const DIVISIONS_DEFAULT = 8;
const RADIUS_DEFAULT = 400;

const App: React.FC = () => {
  const [mouseMoveEnabled, setMouseMoveEnabled] = useState<boolean>(false);
  const [mousePositionRate, setMousePositionRate] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0
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
      x: event.pageX / window.innerWidth,
      y: event.pageY / window.innerHeight
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

  const onChangeOptions = (option: "divisions" | "radius") => (
    value: number
  ) => {
    switch (option) {
      case "divisions":
        setDivisions(value);
        break;
      case "radius":
        setRadius(value);
        break;
    }
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
        X: {mousePositionRate.x.toFixed(3)}
        <br />
        Y: {mousePositionRate.y.toFixed(3)}
        <br />
      </p>
      <OptionsDrawer
        onChangeDivisions={onChangeOptions("divisions")}
        onChangeRadius={onChangeOptions("radius")}
        divisions={divisions}
        radius={radius}
      />
      <Kaleidoscope
        imageSrc={sampleImage}
        divisions={divisions}
        radius={radius}
        positionRate={mousePositionRate}
      />
    </AppDiv>
  );
};

const AppDiv = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;
