import { config } from "../constants/config.js";

class Balance extends PIXI.Text{
  constructor(value) {
    super(value)
    this.style = new PIXI.TextStyle(Balance.STYLE);
  }

  changeCash(sum) {
    this.text = `Balance: ${sum}`;
  }
};

Balance.STYLE = {
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

export const balance = new Balance(`Balance: ${config.balance}`);
