import { Scene, Textures } from "../constants/textures.js";

export const Background = () => {
    const container = new PIXI.Container();
    const texture = PIXI.Texture.from(Textures[`background0`]);
    const sprite = new PIXI.Sprite(texture);
    sprite.width = Scene.width;
    sprite.height = Scene.height;
    container.addChild(sprite);
    return container;
  };