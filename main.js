import { createPixiApp, getCanvasEl,} from "./framework/game.js";
import { Scene, Textures } from "./constants/textures.js";
import { Background } from "./components/Background.js";
import Symbol from "./components/Symbol.js";

const initGame = () => {
    const canvasEl = getCanvasEl("root");
    canvasEl.height = Scene.height;
    canvasEl.width = Scene.width;
  
    const pixiApp = createPixiApp({
      view: canvasEl,
      width: canvasEl.width,
      height: canvasEl.height
    });
  
    const background = Background();
    const symbol = new Symbol();
    const seven = symbol.init(3);
    seven.position.set(Scene.width/2,Scene.height/2);
 
    const container = new PIXI.Container();
     
    container.addChild(background);
    container.addChild(seven);
    
  
    pixiApp.stage.addChild(container);
    pixiApp.renderer.render(pixiApp.stage);
    pixiApp.ticker.add(delta => loop(delta));

    const loop = (delta) => {
        seven.rotation -= 0.02;
    }
};
  
initGame();




