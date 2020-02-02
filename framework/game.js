export const getCanvasEl = (id) => {
  const canvas = document.getElementById(id);
  if (!canvas) {
    throw new Error(`Canvas with specified id ${id} not found.`);
  }
  return canvas;
};

export const createPixiApp = (AppConfig) => {
  return new PIXI.Application(AppConfig);
};


