import { Scene, Textures } from "../constants/textures.js";

export default class Symbol  {
    constructor() {
        
        
        
    }
    // const container = new PIXI.Container();
    // const sprites = [];
    
    // for( let i = 0; i <= 6; i++) {
    //     const texture = PIXI.Texture.from(Textures[`Background${i}`]);
    //     const sprite = new PIXI.Sprite(texture);
    //     container.addChild(sprite);
    //     sprites.push(sprite);
    //     sprite.anchor.set(0.5);
    // }
    init(id) {
  
        const texture = PIXI.Texture.from(Textures[`Sym${id}`]);
        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5);
        // sprites[0].width = Scene.width;
        // sprites[0].height = Scene.height;
        // sprites[1].width = Scene.width/1.25;
        // sprites[1].height = Scene.height/1.4;
        // sprites[2].x = -500;
        // sprites[2].y = 50;
        // sprites[3].x = 515;
        // sprites[3].y = 50;
        // sprites[4].y =-280;
        // sprites[5].y = Scene.height/2 -55;
        // sprites[6].y = -Scene.height/2 + 135;
        // container.pivot.set(-Scene.width/2, -Scene.height/2);
        return sprite;
    }
   
  };