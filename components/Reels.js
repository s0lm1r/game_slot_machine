import Reel from "./Reel.js";
import { Scene } from "../constants/textures.js";

export default class Reels extends PIXI.Container {
    constructor() {
      super()
      this.reels = [];
      this._init();
      console.log(this.reels);
     
    }

    _init() {
        for(let i = 0; i < 3; i++) {
            const reel = new Reel();
            reel.x = Scene.width / 6 + i * Scene.width / 4;
            reel.y = 120;
            this.reels.push(reel);
            this.addChild(reel) 
        }
    }


    
}