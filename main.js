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
import {counter} from "./components/Counter.js";
// import gsap from "gsap";

const initGame = () => {

  let _w = Scene.width;
  let _h = Scene.height;
  //const isMobile = typeof window.orientation !== 'undefined';
  //const controler = new Controler();
  //window.addEventListener('resize', resize);
 //if (isMobile) reelsFrame.scale.set(0.4);

  const timeLine = gsap.timeline();
  const counterTl = gsap.timeline();
  const mainContainer = new PIXI.Container();

  const background = Background();
  
  
  balance.position.set(900, 720);
  bet.position.set(200, 720);
  let totalBalance = config.balance;
  
  const reels = new Reels();
 // reels.alpha = 0.4;
  const fakeReels = new Reels(true);
  const filters = new PIXI.filters.BlurFilter();
  
 // fakeReels.reels[.filters.filters;
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
  let isSpined = false;
  function spinStart() {
     
    if (isSpined) return;
     if (!controler.checkBalance(totalBalance, bet.value)) {
       return;
     }
    
    totalBalance -= bet.value;
    balance.changeCash(totalBalance);
    controler.setSymbols();
   
    reels.reels.forEach((reel, i) => {  
      reel.createNewSymbolsRow(i);
    });
    const time = 1.3 + config.fakeReelsSet.length/6 ;
    const pointTomove = (config.fakeReelsSet.length + 1)* 170 - 20;
    const easing = {ease: Back.easeInOut.config(0.3)};
    
    timeLine
    .add('start')
    .add(() => {
      isSpined = true;
    })
    .to(reels.reels[0], time, {ease: easing.ease, y: 340 + pointTomove})
    .to(reels.reels[1], time+0.8, {ease: easing.ease, y:  340 + pointTomove}, "start")
    .to(reels.reels[2], time+1.6, {ease: easing.ease, y: 340+ pointTomove, onComplete: () => {
      reels.reels.forEach(reel => {
        const newSymbols = reel.reelset.splice(3, 3);
        reel.removeChildren();
        newSymbols.reverse().map((symbol, i) => {  
        reel.addChild(symbol.symbol);
        symbol.symbol.position.y = 170 * i});
        reel.y = -20;
      });
    }}, "start")
    .add(() => fakeReels.reels[0].filters = [filters], "start+=3")
    .add(() => fakeReels.reels[1].filters = [filters], "start+=3.8")
    .add(() => fakeReels.reels[2].filters = [filters], "start+=4.6")
    .add(() => fakeReels.reels[0].filters = null, "start+=4.5")
    .add(() => fakeReels.reels[1].filters = null, "start+=5.3")
    .add(() => fakeReels.reels[2].filters = null, "start+=6.1")
    .to(fakeReels.reels[0], time, {ease: easing.ease, y: pointTomove}, "start")
    .to(fakeReels.reels[1], time+0.8, {ease: easing.ease, y: pointTomove}, "start")
    .to(fakeReels.reels[2], time+1.6, {ease: easing.ease, y: pointTomove, onComplete: () => {
      fakeReels.reels.forEach(reel => reel.y = -360);
      controler.checkWinLines();
      controler.winLineData.forEach(winLine => { 
        totalBalance += winLine.idWinSymbol * bet.value});
      balance.changeCash(totalBalance)
      isSpined = false;
      timeLine.kill();
    }}, "start");
 
    
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




