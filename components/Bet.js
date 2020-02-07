import { config } from "../constants/config.js";

class Bet extends PIXI.Text{
    constructor(value) {
        super(value)
        this.style = new PIXI.TextStyle(Bet.STYLE);
        this.valueId = 3;
        
    }

    increaseBetValue() {
        if (!config.bet.includes(config.bet[this.valueId + 1])) {
            // todo tint
            return;
        }
        this.valueId++;
        this.text = `Bet: ${config.bet[this.valueId]}`;
        
    }

    decreaseBetValue() {
        if (!config.bet.includes(config.bet[this.valueId - 1 ])) return;
        this.valueId--;
        this.text = `Bet: ${config.bet[this.valueId]}`;
    }

    get value() {
        return config.bet[this.valueId];
    }

};

Bet.STYLE = {
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
};

export const bet = new Bet(`Bet: ${config.bet[3]}`);

     //this.tint = '0xfff00f';