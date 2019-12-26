import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Drawer, Button, Slider, Classes } from "@blueprintjs/core";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

type Props = {
  onChangeDivisions: (value: number) => void;
  onChangeRadius: (value: number) => void;
};

const OptionsDrawer: React.FC<Props> = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [divisions, setDivisions] = useState<number>();
  const [radius, setRadius] = useState<number>();

  const onClickOpenButton = () => {
    setIsOpen(true);
  };

  const onCloseDrawer = () => {
    setIsOpen(false);
  };

  const onSliderChange = (type: "divisions" | "radius") => (value: number) => {
    switch (type) {
      case "divisions":
        setDivisions(value);
        props.onChangeDivisions(value);
        break;
      case "radius":
        setRadius(value);
        props.onChangeRadius(value);
        break;
    }
  };

  return (
    <div className="bp3-dark">
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
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <Slider
              className={Classes.SLIDER}
              min={2}
              max={64}
              stepSize={2}
              onChange={onSliderChange("divisions")}
              labelStepSize={10}
              value={divisions}
            />
            <Slider
              min={100}
              max={800}
              stepSize={10}
              onChange={onSliderChange("radius")}
              labelStepSize={50}
              value={radius}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

const OptionsDrawerContainer = styled.div`
  width: 80%;
  position: fixed;
  top: 0;
  right: 0;
`;

export default OptionsDrawer;
