import { Scene, Textures } from "../constants/textures.js";

export default class Symbol  {
    constructor() {
        
        
        
    }
   
    init(id) {
  
        const texture = PIXI.Texture.from(Textures[`Sym${id}`]);
        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5);
       
        return sprite;
    }
   
  };