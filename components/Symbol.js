import {  Textures } from "../constants/textures.js";

export default class Symbol extends PIXI.Container {
    
    constructor(id) {
        super()
        //this.symbols = {};
        this.createSymbol(id);
        
    }
   
    createSymbol(id) {
        //if (!this.symbols[`sym${id}`]) {
            const texture = PIXI.Texture.from(Textures[`sym${id}`]);
            const sprite = new PIXI.Sprite(texture);
            sprite.anchor.set(0.5);
            sprite.scale.set(0.9);
            this.addChild(sprite);
            // console.log(id)
           // this.symbols[`sym${id}`].
            //return sprite;
        // } 
     
        
    }
   
  };