import { config } from "../constants/config.js";


import { randomInteger } from "../framework/randomInteger.js";

class Controler{
    constructor() {
      
        this.mainSymbols = config.mainSymbols;
    }

    getData() {
        return this.mainSymbols;
    }

    setData() {
        this.mainSymbols = this.mainSymbols
            .map(row => row.map(() => randomInteger(config.generateId.min, config.generateId.max)));
    }
   
}

export const controler = new Controler();