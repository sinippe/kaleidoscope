import React, { useState } from "react";
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
};

type Image = {
  url: string;
  name: string;
};

const OptionsDrawer: React.FC<Props> = props => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickOpenButton = () => {
    setIsOpen(true);
  };

  const onCloseDrawer = () => {
    setIsOpen(false);
  };

  const onSliderChange = (type: "divisions" | "radius") => (value: number) => {
    switch (type) {
      case "divisions":
        props.onChangeDivisions(Math.max(0, Math.min(value, 32)));
        break;
      case "radius":
        props.onChangeRadius(Math.max(50, Math.min(value, 800)));
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
        isOpen={isOpen}
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
                className={Classes.SLIDER}
                min={2}
                max={32}
                stepSize={2}
                onChange={onSliderChange("divisions")}
                labelStepSize={10}
                value={props.divisions}
              />
            </Label>
            <Label title="Radius">
              Radius
              <Slider
                min={100}
                max={800}
                stepSize={10}
                onChange={onSliderChange("radius")}
                labelStepSize={100}
                value={props.radius}
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
