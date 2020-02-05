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
            const reel = new Reel(i);
            reel.x =  i * Scene.width / 5;
            reel.y = -20;
            this.reels.push(reel);
            this.addChild(reel) 
        }
    }


    
}