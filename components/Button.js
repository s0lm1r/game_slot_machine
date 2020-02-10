export default class Button  extends PIXI.Container {
constructor(callback, isSpinButton) {
  super()
  this.shape = this.addChild( isSpinButton? this._createSpinButton() : this._createTriangle());
  this.interactive = true;
  this.buttonMode = true;
  this.on('pointerup', callback);
  this.pivot.set(this.width / 2, this.height / 2);
  this.shape.tint = "0xffffff";
}

  _createTriangle() {
    const side = 20;
    return new PIXI.Graphics()   
      .lineStyle(2, 0x00ff00, 1)
      .beginFill(0xff0000, 1)
      .drawPolygon([
        0, 0,
        2 * side, 0,
        side, 2 * side,
        0, 0
      ])
      .endFill();
  }
  _createSpinButton() {
    return new PIXI.Graphics()  
    .lineStyle(5, 0x00ff00, 1)
    .beginFill(0xff0000, 1)
    .drawCircle(35, 35, 35)
    .endFill();
  }
}


