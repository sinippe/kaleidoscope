import React from "react";
import styled from "styled-components";
import { Drawer, Button, Slider, Classes, Label } from "@blueprintjs/core";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import SimpleSelect from "../SimpleSelect/SimpleSelect";

type Props = {
  onChangeDivisions: (value: number) => void;
  onChangeRadius: (value: number) => void;
  onChangeImage: (url: string) => void;
  divisions?: number;
  radius?: number;
  image: string;
  imagesList: Image[];
  isOpen?: boolean;
  onOpen: () => void;
  onClose: () => void;
};

type Image = {
  url: string;
  name: string;
};

const settings = {
  divisions: {
    min: 2,
    max: 32,
    stepSize: 2,
    labelStepSize: 10
  },
  radius: {
    min: 100,
    max: 800,
    stepSize: 10,
    labelStepSize: 100
  }
};

const OptionsDrawer: React.FC<Props> = props => {
  const onClickOpenButton = () => {
    props.onOpen();
  };

  const onCloseDrawer = () => {
    props.onClose();
  };

  const onSliderChange = (type: "divisions" | "radius") => (value: number) => {
    switch (type) {
      case "divisions":
        props.onChangeDivisions(
          Math.max(
            settings.divisions.min,
            Math.min(value, settings.divisions.max)
          )
        );
        break;
      case "radius":
        props.onChangeRadius(
          Math.max(settings.radius.min, Math.min(value, settings.radius.max))
        );
        break;
    }
  };

  const onChangeImage = (item: { label: string; value: string }) => {
    props.onChangeImage(item.value);
  };

  return (
    <OptionsDrawerContainer className="bp3-dark">
      <Button text="Options" onClick={onClickOpenButton} />
      <Drawer
        className="bp3-dark"
        position="left"
        isOpen={props.isOpen}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        onClose={onCloseDrawer}
        icon="settings"
        title="Options"
        size={Drawer.SIZE_SMALL}
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <Label title="Divisions">
              Divisions
              <Slider
                onChange={onSliderChange("divisions")}
                value={props.divisions}
                {...settings.divisions}
              />
            </Label>
            <Label title="Radius">
              Radius
              <Slider
                onChange={onSliderChange("radius")}
                value={props.radius}
                {...settings.radius}
              />
            </Label>
            <SimpleSelect
              items={props.imagesList.map(image => ({
                label: image.name,
                value: image.url
              }))}
              onChange={onChangeImage}
              initialValue={props.image}
            />
          </div>
        </div>
      </Drawer>
    </OptionsDrawerContainer>
  );
};

const OptionsDrawerContainer = styled.div`
  position: absolute;
`;

export default OptionsDrawer;
