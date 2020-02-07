export default class Button  extends PIXI.Container {
    constructor(callback) {
        super()
        this.shape = this.addChild(this._createTriangle());
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerup', callback);
        this.pivot.set(this.width/2, this.height/2);
       
        
    }

    _createTriangle() {
        const side = 20;
        const graphics = new PIXI.Graphics()   
            .lineStyle(2, 0xFF0000, 1)
            .beginFill(0x00ff00, 1)
            .drawPolygon([
                0, 0,
                2*side, 0,
                side, 2*side,
                0, 0
            ])
            .endFill();

        return graphics;
    }

    _enable() {
        this.tint = "0x00000f";
    }
}


