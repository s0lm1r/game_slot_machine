import {Scene, Textures } from "../constants/textures.js";

const getCanvasEl = (id) => {
  const canvas = document.getElementById(id);
  if (!canvas) {
    throw new Error(`Canvas with specified id ${id} not found.`);
  }
  return canvas;
};

const createPixiApp = (AppConfig) => {
  return new PIXI.Application(AppConfig);
};

const canvasEl = getCanvasEl("root");
canvasEl.height = Scene.height;
canvasEl.width = Scene.width;


const pixiApp = createPixiApp({
  view: canvasEl,
  width: canvasEl.width,
  height: canvasEl.height,
});

export {canvasEl, pixiApp};

