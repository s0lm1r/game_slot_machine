import Reel from "./Reel.js";
import { Scene } from "../constants/textures.js";

export default class Reels extends PIXI.Container {
    constructor(fakeReels) {
      super()
      this.reels = [];
      this._init(fakeReels);
    }

    _init(fakeReels) {
        for(let i = 0; i < 3; i++) {
            const reel = new Reel(i, fakeReels);
            reel.x =  i * Scene.width / 5;
            reel.y = fakeReels ? -340 - 20 : -20;
            this.reels.push(reel);
            this.addChild(reel) 
        }
    }
}