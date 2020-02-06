
import Symbol from "./Symbol.js";
import { Scene } from "../constants/textures.js";
import { config } from "../constants/config.js";
import {controler} from "../components/Controler.js";
import { randomInteger } from "../framework/randomInteger.js";

export default class Reel extends PIXI.Container {
    constructor(reelId) {
      super();
      this.reelId = reelId;
      this.reelset = [];
      this._init();
    }

    _init() {
        this.createSymbolsRow(this.reelId);
    }

    createSymbolsRow(reelId) {

    this.removeChildren();
        //console.log(mainSymbols[reelId]);
        const mainSymbols = controler.getSymbols();
    
        mainSymbols[reelId].forEach((reel, i) => {
                const symbolData = {};
                symbolData.id = mainSymbols[i][reelId];
                symbolData.position = {x: 0, y: 170 * i };
                symbolData.symbol =  new Symbol(symbolData.id);
                this.reelset.push(symbolData);
                this.addChild(symbolData.symbol);
                symbolData.symbol.position.set(symbolData.position.x, symbolData.position.y)
            });
    }
}