
import Symbol from "./Symbol.js";
import { Scene } from "../constants/textures.js";
import { config } from "../constants/config.js";
import {controler} from "../components/Controler.js";
import { randomInteger } from "../framework/randomInteger.js";

export default class Reel extends PIXI.Container {
    constructor(reelId ,fakeReel) {
      super();
      this.reelId = reelId;
      this.reelset = [];
    
      this.fakeReelsSet = [];
      fakeReel ? this.createFakeReelSet(reelId) : this._init();
      
    }

    _init() {
        this.createSymbolsRow(this.reelId);
    }

    createFakeReelSet(reelId) {
        const fakeSymbolData = {};
        config.fakeReelsSet.forEach((id, i) => {
            fakeSymbolData.id = randomInteger(1,6);
    fakeSymbolData.position = {x: 0, y: -170 * i };
    fakeSymbolData.symbol =  new Symbol(fakeSymbolData.id, true);
    this.fakeReelsSet.push(fakeSymbolData);
    this.addChild(fakeSymbolData.symbol);
    fakeSymbolData.symbol.position.set(fakeSymbolData.position.x, fakeSymbolData.position.y);

})
}

    createSymbolsRow(reelId) {

    this.removeChildren();
      
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

    createNewSymbolsRow(reelId) {

        //this.removeChildren();
          
            const mainSymbols = controler.getSymbols();
       
            mainSymbols[reelId].forEach((reel, i) => {
                    const symbolData = {};
                    symbolData.id = mainSymbols[i][reelId];
                    symbolData.position = {x: 0, y: (config.fakeReelsSet.length+1) *-170+ -170 *i};
                    symbolData.symbol =  new Symbol(symbolData.id);
                    this.reelset.push(symbolData);
                    this.addChild(symbolData.symbol);
                    symbolData.symbol.position.set(symbolData.position.x, symbolData.position.y)
                });
        }
}