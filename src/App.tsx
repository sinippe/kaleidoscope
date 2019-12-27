import React, { useState } from "react";
import styled from "styled-components";
import Kaleidoscope from "./components/Kaleidoscope/Kaleidoscope";
import OptionsDrawer from "./components/OptionsDrawer/OptionsDrawer";
import Config, { ConfigSchema } from "./config/config";
import useMousePosition from "./hooks/UseMousePosition";

// TODO: check if image exists

const config: ConfigSchema = Config;

const App: React.FC = () => {
  const [divisions, setDivisions] = useState<number>(config.divisions);
  const [radius, setRadius] = useState<number>(config.radius);
  const [imageUrl, setImageUrl] = useState<string>(config.imagesList[0].url);

  const { mousePosition, mouseMoveisActive } = useMousePosition({
    useRate: true,
    defaultActive: false,
    switchActiveOnClick: true
  });

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
        positionRate={mousePosition}
      />
    </AppDiv>
  );
};

const AppDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export default App;
