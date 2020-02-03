
import Symbol from "./Symbol.js";
import { Scene } from "../constants/textures.js";

export default class Reel extends PIXI.Container {
    constructor() {
      super()
      this._init();

      
        
    }
    _init() {
        this.addChild(this.createGraphic())
    }

    createGraphic() {
        var graphics = new PIXI.Graphics();

        // Rectangle
        graphics.beginFill(0xff000f);
        graphics.drawRect(50, 50, Scene.width/5, Scene.height/2);
        graphics.endFill();

        return graphics;
    }
}