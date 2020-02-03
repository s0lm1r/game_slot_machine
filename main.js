import { createPixiApp, getCanvasEl,} from "./framework/game.js";
import { Scene, Textures } from "./constants/textures.js";
import { Background } from "./components/Background.js";
import { ReelsFrame } from "./components/ReelsFrame.js";
import Symbol from "./components/Symbol.js";
import Reels from "./components/Reels.js";

const initGame = () => {

  let _w = window.innerWidth;
  let _h = window.innerHeight;

  window.addEventListener('resize', resize);

  const canvasEl = getCanvasEl("root");
  canvasEl.height = Scene.height;
  canvasEl.width = Scene.width;
  const timeLine = gsap.timeline({repeat: -1});

  const pixiApp = createPixiApp({
    view: canvasEl,
    width: canvasEl.width,
    height: canvasEl.height,
  });

  const mainContainer = new PIXI.Container();
  const background = Background();
  // const reels = new Reels();
  const reelsFrame = ReelsFrame();
  mainContainer.addChild(background, reelsFrame);

  pixiApp.stage.addChild(mainContainer);
  pixiApp.renderer.render(pixiApp.stage);  
  pixiApp.ticker.add(delta => loop(delta));

  const loop = (delta) => {};

  function resize() {
    _w = window.innerWidth;
    _h = window.innerHeight;

    canvasEl.height = _h;
    canvasEl.width = _w;
    mainContainer.width = _w;
    mainContainer.height = _h;
  };
};
  
initGame();




