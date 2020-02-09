import {  Textures } from "../constants/textures.js";

export default class Symbol extends PIXI.Container {
    
    constructor(id, isFake) {
        super();
        this.createSymbol(id, isFake);   
    }
   
    createSymbol(id, isFake) {
        
       // if(isFake) console.log('fake');
            const texture = PIXI.Texture.from(Textures[`sym${id}`]);
            const sprite = new PIXI.Sprite(texture);
            sprite.anchor.set(0.5);
            sprite.scale.set(0.8);
            this.addChild(sprite);     
    }
  };