
import Symbol from "./Symbol.js";
import { Scene } from "../constants/textures.js";
import { randomInteger } from "../framework/randomInteger.js";

export default class Reel extends PIXI.Container {
    constructor() {
      super();
      
      this.reelset = [];
      this._init();  
      
        
    }
    _init() {
        this.createSymbolRow();
    }

    createSymbolRow() {
        for(let i = 0; i < 42; i++) {
            const id = randomInteger(1, 6);
            const symbol =  new Symbol(id);
            this.reelset.push(symbol);
            this.addChild(symbol);
            symbol.position.set(250, 300 +i * 190);
        }
        
    }
    
}