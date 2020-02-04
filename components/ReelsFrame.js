import {Scene, Textures } from "../constants/textures.js";

export const ReelsFrame = () => {
    const container = new PIXI.Container();

    const sprites = [];
    
    for( let i = 1; i <= 6; i++) {
       
        const texture = PIXI.Texture.from(Textures[`background${i}`]);
        const sprite = new PIXI.Sprite(texture);
        if (i!== 1) container.addChild(sprite);
        sprites.push(sprite);
        sprite.anchor.set(0.5);
    };
    // todo LOADER
    
    //sprites[0].width = ;
    //sprites[0].height = Scene.height/2;
    sprites[0].position.set(0, 150);
    sprites[1].position.set(-505, 180);
    sprites[2].position.set(505, 180);
    sprites[3].position.set(0, -150);
    //sprites[5].scale.set(1.3)
    sprites[4].position.set(0, 500);
    sprites[5].position.set(0, -130);
   
    container.pivot.set(-Scene.width/2, -Scene.height/2);
    container.position.set(0,-100);
   
    return container;
  };