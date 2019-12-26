import React, { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import KaleidoscopeCore from "./core/KaleidoscopeCore";

type Props = {
  imageSrc: string;
};

const Kaleidoscope1: React.FC<Props> = props => {
  let app: PIXI.Application;
  let core;

  const runApplication = (application: PIXI.Application) => {
    app = application;
    core = KaleidoscopeCore(app, props.imageSrc);
  };

  return <PixiJSContainer runApplication={runApplication} />;
};

const PixiJSContainer: React.FC<{
  runApplication: (app: PIXI.Application) => void;
}> = props => {
  const app = new PIXI.Application();
  props.runApplication(app);

  useEffect(() => {
    // document.body.appendChild(app.view);
  }, []);
  return <>{app.view}</>;
};

export default Kaleidoscope1;
