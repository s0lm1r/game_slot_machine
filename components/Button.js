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
      const spin = new PIXI.Graphics()  
    .lineStyle(5, 0x00ff00, 1)
    .beginFill(0xff0000, 1)
    .drawCircle(50, 50, 50)
    .endFill();
    const text = new PIXI.Text('Spin', {
      fontSize: 28,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#00ff00', '#ffff00'],
      stroke: '#4a1850',
      strokeThickness: 2,
      wordWrap: true,
      wordWrapWidth: 440
    });

    text.pivot.set(text.width / 2, text.height / 2);
    text.position.set(spin.width / 2 - 3, spin.height / 2 - 5);
    spin.addChild(text)
    return spin
  }
}


