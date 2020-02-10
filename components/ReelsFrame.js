import {Scene, Textures } from "../constants/textures.js";
import { pixiApp} from "../framework/game.js";

export const ReelsFrame = () => {
    const container = new PIXI.Container();
    const texturesPath = [];
    const sprites = [];
    const header = new PIXI.Text('Lucky Bar', ReelsFrame.HEADER_STYLE );
    header.pivot.set(header.width/2, header.height/2);
    header.y = -345;
    const numberLines = new PIXI.Text('3 lines', ReelsFrame.STYLE );
    numberLines.pivot.set(numberLines.width/2, numberLines.height/2);
    numberLines.position.set(525, -80);
    numberLines.rotation = -0.8;
    Object.entries(Textures).filter((el, i) => {
        if (el[1].includes(`Background_${i}`) && i !== 0) texturesPath.push(el[1]);
    });
    
    pixiApp.loader.add(texturesPath.filter(el => el)).load(onLoaded);
    function onLoaded() {
        for( let i = 1; i <= 6; i++) { 
            const texture = PIXI.Texture.from(Textures[`background${i}`]); 
            const sprite = new PIXI.Sprite(texture);
            if (i!== 1) container.addChild(sprite);
            sprites.push(sprite);
            sprite.anchor.set(0.5);
        };
        sprites[1].position.set(-500, 0);
        sprites[2].position.set(500, 0);
        sprites[3].position.set(40, -300);
        sprites[4].position.set(0, 300);
        sprites[5].position.set(0, -280); 
        sprites[5].scale.set(1.1);
        container.addChild(header, numberLines);
    }
    
    
    return container;
  };


  ReelsFrame.HEADER_STYLE = {
    fontFamily: 'Arial',
    fontSize: 56,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#fce903'],
    stroke: '#4a1850',
    strokeThickness: 4,
    wordWrap: true,
    wordWrapWidth: 440
  };

  ReelsFrame.STYLE = {
    fontFamily: 'Arial',
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#fce903'],
    wordWrap: true,
    wordWrapWidth: 440
  };