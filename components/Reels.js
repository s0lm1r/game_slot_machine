import Reel from "./Reel.js";
import { Scene } from "../constants/textures.js";

export default class Reels extends PIXI.Container {
    constructor() {
      super()
      this.reels = [];
      this._init();
     
    }

    _init() {
        for(let i = 0; i < 3; i++) {
            const reel = new Reel();
            reel.x = 400 + i * Scene.width / 6;
            reel.y = -6090;
            this.reels.push(reel);
            this.addChild(reel) 
        }
    }


    
}