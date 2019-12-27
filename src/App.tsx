import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Kaleidoscope from "./components/Kaleidoscope/Kaleidoscope";
import OptionsDrawer from "./components/OptionsDrawer/OptionsDrawer";
import Config, { ConfigSchema } from "./config/config";

// TODO: move all the mouse events related code
// TODO: check if image exists

const config: ConfigSchema = Config;

const App: React.FC = () => {
  const [mouseMoveEnabled, setMouseMoveEnabled] = useState<boolean>(false);
  const [mousePositionRate, setMousePositionRate] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0
  });
  const [divisions, setDivisions] = useState<number>(config.divisions);
  const [radius, setRadius] = useState<number>(config.radius);
  const [imageUrl, setImageUrl] = useState<string>(config.imagesList[0].url);

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

  const onChangeImage = (url: string) => {
    setImageUrl(url);
  };

  return (
    <AppDiv>
      <OptionsDrawer
        onChangeDivisions={onChangeOptions("divisions")}
        onChangeRadius={onChangeOptions("radius")}
        divisions={divisions}
        radius={radius}
        onChangeImage={onChangeImage}
        imagesList={config.imagesList}
        image={imageUrl}
      />
      <Kaleidoscope
        imageSrc={imageUrl}
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
