import { createPixiApp, getCanvasEl,} from "./framework/game.js";
import { Scene, Textures } from "./constants/textures.js";
import { Background } from "./components/Background.js";
import { ReelsFrame } from "./components/ReelsFrame.js";
//import Symbol from "./components/Symbol.js";
import Reels from "./components/Reels.js";

const initGame = () => {

  let _w = window.innerWidth;
  let _h = window.innerHeight;

  window.addEventListener('resize', resize);

  const canvasEl = getCanvasEl("root");
  canvasEl.height = Scene.height;
  canvasEl.width = Scene.width;
  const timeLine = gsap.timeline();

  const pixiApp = createPixiApp({
    view: canvasEl,
    width: canvasEl.width,
    height: canvasEl.height,
  });

  const mainContainer = new PIXI.Container();
  const background = Background();
  const reels = new Reels();
   
  const reelsFrame = ReelsFrame();
  const mask = new PIXI.Graphics()
  .beginFill(0xFF0000)
  .drawRect(400, 345, 1150, 620)
  .endFill();
  reels.mask = mask;
  mainContainer.addChild(background,  reels,reelsFrame, mask);
  pixiApp.stage.addChild(mainContainer);
  pixiApp.renderer.render(pixiApp.stage);  
  pixiApp.ticker.add(delta => loop(delta));
  //console.log(reels.reels)

  timeLine
  .add("start")
  .to(reels.reels[0], 5, {y: 570-380}, "start")
  .to(reels.reels[1], 5, {y: 380-380}, "start")
  .to(reels.reels[2], 5, {y: 0- 380}, "start");
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




