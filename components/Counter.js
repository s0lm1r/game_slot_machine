class Counter extends PIXI.Container {
  constructor() {
  super();
  this.shape = this.addChild(this._createShape());
  this.pivot.set(this.width / 2, this.height / 2);
  this.style = new PIXI.TextStyle(Counter.STYLE);
}

  _createShape() {
    const graphics = new PIXI.Graphics()   
    graphics.lineStyle(2, 0xFF00FF, 1);
    graphics.beginFill(0x650A5A, 0.7);
    graphics.drawRoundedRect(0, 0, 300, 100, 32);
    graphics.endFill();
    return graphics;        
  }

  setData(data) {
    this.shape.removeChildren();
    this.shape.addChild(new PIXI.Text(data, this.style));
    this.shape.children[0].position.x = this.shape.width/2 - this.shape.children[0].width/2;
    this.shape.children[0].position.y = this.shape.height/2 - this.shape.children[0].height/2;
  }
}

Counter.STYLE = {
  fontFamily: 'Arial',
  fontSize: 80,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: ['#1fd0ff', '#ffff99'], // gradient
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

export const counter = new Counter()



