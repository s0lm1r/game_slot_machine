import {Scene, Textures } from "../constants/textures.js";
import { pixiApp} from "../framework/game.js";

export const ReelsFrame = () => {
    const container = new PIXI.Container();
    const texturesPath = [];
    
    Object.entries(Textures).filter((el, i) => {
      
        if (el[1].includes(`Background_${i}`) && i !== 0) texturesPath.push(el[1]);
    
    });
   
    const sprites = [];
  
    pixiApp.loader.add(texturesPath.filter(el => el)).load(onLoaded);

    function onLoaded() {
      
        for( let i = 1; i <= 6; i++) {
           
            const texture = PIXI.Texture.from(Textures[`background${i}`]);
            
            const sprite = new PIXI.Sprite(texture);
            if (i!== 1) container.addChild(sprite);
            sprites.push(sprite);
           // console.log(sprite.width, sprite.height);
            sprite.anchor.set(0.5);
        };
        // todo LOADER

        sprites[1].position.set(-500, 0);
        sprites[2].position.set(500, 0);
        sprites[3].position.set(40, -300);
        
        sprites[4].position.set(0, 300);
        sprites[5].position.set(0, -280); 
        sprites[5].scale.set(1.1)
    }
   
    return container;
  };