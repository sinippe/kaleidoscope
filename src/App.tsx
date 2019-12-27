import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Kaleidoscope from "./components/Kaleidoscope/Kaleidoscope";
import OptionsDrawer from "./components/OptionsDrawer/OptionsDrawer";

// TODO: move all the mouse events related code
// TODO: check if image exists

const DIVISIONS_DEFAULT = 18;
const RADIUS_DEFAULT = 400;
const IMAGES_LIST = [
  {
    name: "Giant plant head",
    url: "img/swarovski_kristallwelten_innsbruck.jpg"
  },
  {
    name: "Psychedelic 1",
    url:
      "https://andreiverner.com/wp-content/uploads/2019/07/hanuman-color-1.jpg"
  },
  {
    name: "Psychedelic 2",
    url:
      "https://andreiverner.com/wp-content/uploads/2019/07/alien-cave-artwork.jpg"
  },
  {
    name: "Sandwich",
    url:
      "https://www.poulet.ca/assets/RecipePhotos/_resampled/FillWyIxNDQwIiwiNzAwIl0/california-club.jpg"
  },
  {
    name: "Grolar",
    url:
      "https://lamouettebblog.files.wordpress.com/2016/03/hybridbar_taps4.jpg"
  },
  {
    name: "Ugly",
    url: "https://vl-media.fr/wp-content/uploads/2018/01/trump.jpg"
  },
  {
    name: "Kaleidoscope",
    url:
      "https://previews.123rf.com/images/visharo/visharo1701/visharo170100240/71478803-motif-de-kal%C3%A9idoscope.jpg"
  }
];

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
  const [imageUrl, setImageUrl] = useState<string>(IMAGES_LIST[0].url);

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
        imagesList={IMAGES_LIST}
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
