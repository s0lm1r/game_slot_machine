import {Scene, Textures } from "../constants/textures.js";

export const ReelsFrame = () => {
    const container = new PIXI.Container();

    const sprites = [];
    
    for( let i = 2; i <= 6; i++) {
        const texture = PIXI.Texture.from(Textures[`background${i}`]);
        const sprite = new PIXI.Sprite(texture);
        container.addChild(sprite);
        sprites.push(sprite);
        sprite.anchor.set(0.5);
      
    }
    
  
    // sprites[0].position.set(-400, 20);
    // sprites[1].position.set(0, 20);
    // sprites[2].position.set(0, -520);
    // sprites[3].position.set(0, 430);
    // sprites[4].position.set(0, -500);
  
    container.pivot.set(-Scene.width/2, -Scene.height/2);
   
    return container;
  };