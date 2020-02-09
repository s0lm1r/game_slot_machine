class Counter extends PIXI.Container {
    constructor() {
        super()
        this.shape = this.addChild(this._createShape());
    }

    _createShape() {
        const graphics = new PIXI.Graphics()   
        graphics.lineStyle(2, 0xFF00FF, 1);
        graphics.beginFill(0x650A5A, 0.7);
        graphics.drawRoundedRect(0, 0, 200, 65, 32);
        graphics.endFill();
        return graphics;        
    }

    setData(data) {
         console.log(data);
    }
}

export const counter = new Counter()



