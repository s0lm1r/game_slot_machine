import {  Textures } from "../constants/textures.js";

export default class Symbol  {
    constructor() {
        this.symbols = {

        }
        
        
    }
   
    init(id) {
  
        const texture = PIXI.Texture.from(Textures[`sym${id}`]);
        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5);
       
        return sprite;
    }
   
  };