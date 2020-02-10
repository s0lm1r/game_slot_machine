import { config } from "../constants/config.js";
import { randomInteger } from "../framework/randomInteger.js";

class Controler{
    constructor() {
        this.mainSymbols = config.mainSymbols;
        this.winLineData = [];
    }

    getSymbols() {
        return this.mainSymbols;
    }

    setSymbols() {
        this.mainSymbols = this.mainSymbols
            .map(row => row.map(() => randomInteger(config.generateId.min, config.generateId.max)));
    }

    
    checkWinLines() {

        this.winLineData = [];
        this.mainSymbols.forEach((row, i) => {
            if (row.every((el) => el === row[0])) {
               this.winLineData.push({
                    [`winLine`]: i + 1,
                    [`idWinSymbol`]: row[0]
                })
            }
        })
    }

    checkBalance(balance, bet) {
        if (balance >= bet) {
            return true;
        } else {
            return false;
        }
    }

    get winLines() {
        return this.winLineData;
    }
   
}

export const controler = new Controler();