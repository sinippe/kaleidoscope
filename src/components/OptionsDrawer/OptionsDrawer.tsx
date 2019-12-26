import React, { useState } from "react";
import { Drawer, Button, Slider, Classes, Label } from "@blueprintjs/core";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

type Props = {
  onChangeDivisions: (value: number) => void;
  onChangeRadius: (value: number) => void;
  divisions?: number;
  radius?: number;
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
        props.onChangeDivisions(value);
        break;
      case "radius":
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
            <Label title="Divisions">
              Divisions
              <Slider
                className={Classes.SLIDER}
                min={2}
                max={64}
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
                labelStepSize={50}
                value={props.radius}
              />
            </Label>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default OptionsDrawer;
