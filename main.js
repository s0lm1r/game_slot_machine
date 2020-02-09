import { pixiApp, canvasEl} from "./framework/game.js";
import { Scene, Textures } from "./constants/textures.js";
import { Background } from "./components/Background.js";
import { ReelsFrame } from "./components/ReelsFrame.js";
import {controler} from "./components/Controler.js";
import {balance} from "./components/Balance.js";
import {bet} from "./components/Bet.js";
//import Symbol from "./components/Symbol.js";
import Reels from "./components/Reels.js";
import {config} from "./constants/config.js";
import Button from "./components/Button.js";

const initGame = () => {

  let _w = Scene.width;
  let _h = Scene.height;
  //const isMobile = typeof window.orientation !== 'undefined';
  //const controler = new Controler();
  //window.addEventListener('resize', resize);
 //if (isMobile) reelsFrame.scale.set(0.4);

  const timeLine = gsap.timeline();
  const mainContainer = new PIXI.Container();

  const background = Background();
  // const balance = new Balance('Stas');
  
  balance.position.set(900, 720);
  bet.position.set(200, 720);
  let totalBalance = config.balance;
  
  const reels = new Reels();
 // reels.alpha = 0.4;
  const fakeReels = new Reels(true);
  fakeReels.pivot.set(reels.width/2, 0);
  reels.pivot.set(reels.width/2, reels.height/2);
  const reelsFrame = ReelsFrame(); 
  reelsFrame.position.set(_w/2, _h/2 + 50);

  const decreaseBet = new Button(bet.decreaseBetValue.bind(bet));
  decreaseBet.position.set(430, 750);
  const increaseBet = new Button(bet.increaseBetValue.bind(bet));
  increaseBet.position.set(390, 745);
  increaseBet.rotation = Math.PI;
  

  const spinButton = new PIXI.Graphics()
    .lineStyle(5, 0xFF0000, 1)
    .beginFill(0x00ff00, 1)
    .drawCircle(35, 35, 35)
    .endFill();
  spinButton.interactive = true;
  spinButton.buttonMode = true;
  spinButton.pivot.set(spinButton.width/2, spinButton.height/2)
  spinButton.position.set(640, 750);
  spinButton
    .on('pointerup', spinStart);
 
  const mask = new PIXI.Graphics()
    .beginFill(0xFF0000)
    .drawRect(0, 100, 1180, 620)
    .endFill();
  reels.mask = mask;
  fakeReels.mask = mask;

 // reelsFrame.scale.set(0.8)
  reelsFrame.addChild(reels, fakeReels);
  mainContainer.addChild(background,reelsFrame, /*mask,*/ spinButton, balance , bet, increaseBet, decreaseBet);
  pixiApp.stage.addChild(mainContainer);
  pixiApp.renderer.render(pixiApp.stage);  
  
  pixiApp.ticker.add(delta => loop(delta));
let click = false;
  const loop = (delta) => {
    if (!click) return; 
    fakeReels.reels.forEach(reel => {
      reel.y += 3;
    })
     reels.reels.forEach(reel => {
      reel.y += 3;
    })
  };
  
  function spinStart() {
     //click = !false;
    //console.clear();
    
     if (!controler.checkBalance(totalBalance, bet.value)) {
       return;
     }
    
    totalBalance -= bet.value;
    balance.changeCash(totalBalance);
    controler.setSymbols();
   
    reels.reels.forEach((reel, i) => {  
      reel.createNewSymbolsRow(i);
    });
    const time = 1.3 + config.fakeReelsSet.length/6;
    timeLine
    .add('start')
    .to(reels.reels[0], time, {y: 340 + (config.fakeReelsSet.length+ 1)* 170 -20})
    .to(reels.reels[1], time+0.5, {y:  340 + (config.fakeReelsSet.length+ 1)* 170 -20}, "start")
    .to(reels.reels[2], time+1, {y: 340+ (config.fakeReelsSet.length+ 1)* 170 -20, onComplete: () => {
      reels.reels.forEach(reel => {
      
        const newSymbols = reel.reelset.splice(3, 3);
        reel.removeChildren();
        newSymbols.reverse().map((symbol, i) => {  
        reel.addChild(symbol.symbol);
        symbol.symbol.position.y = 170 * i});
        reel.y = -20;
      });
    }}, "start")
    .to(fakeReels.reels[0], time, {y: (config.fakeReelsSet.length+ 1)* 170 -20}, "start")
    .to(fakeReels.reels[1], time+0.5, {y:  (config.fakeReelsSet.length+ 1)* 170 -20}, "start")
    .to(fakeReels.reels[2], time+1, {y:  (config.fakeReelsSet.length+ 1)* 170 -20, onComplete: () => {
      fakeReels.reels.forEach(reel => reel.y = -360);
    }}, "start")
         controler.checkWinLines();
          controler.winLines.forEach((winLine) => {
          console.log(winLine);
          totalBalance += winLine.idWinSymbol * bet.value;
        });
       
    // }, "start+=1")

    balance.changeCash(totalBalance);
  
  };

  // function resize() {
  //   _w = window.innerWidth;
  //   _h = window.innerHeight;
  //   canvasEl.height = _h;
  //   canvasEl.width = _w;
  //   mainContainer.width = _w;
  //   mainContainer.height = _h;
  // };
};
  
initGame();




