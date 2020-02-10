import { pixiApp } from "./framework/game.js";
import { Scene } from "./constants/textures.js";
import { Background } from "./components/Background.js";
import { ReelsFrame } from "./components/ReelsFrame.js";
import { controler } from "./components/Controler.js";
import { balance } from "./components/Balance.js";
import { bet } from "./components/Bet.js";
import Reels from "./components/Reels.js";
import { config } from "./constants/config.js";
import Button from "./components/Button.js";
import { counter } from "./components/Counter.js";


const initGame = () => {

  let _w = Scene.width;
  let _h = Scene.height;

  const timeLine = gsap.timeline();
  const mainContainer = new PIXI.Container();
  const background = Background();
  
  balance.position.set(900, 720);
  bet.position.set(200, 720);
  counter.position.set(-_w / 2, _h / 2);

  let totalBalance = config.balance;
  let totalWin = 0;
  let isSpined = false;
  
  const reels = new Reels();
  const fakeReels = new Reels(true);
  
  fakeReels.pivot.set(reels.width / 2, 0);
  reels.pivot.set(reels.width / 2, reels.height / 2);
  const reelsFrame = ReelsFrame(); 
  reelsFrame.position.set(_w / 2, _h / 2 + 50);

  const decreaseBet = new Button(bet.decreaseBetValue.bind(bet));
  decreaseBet.position.set(430, 750);

  const increaseBet = new Button(bet.increaseBetValue.bind(bet));
  increaseBet.position.set(390, 745);

  increaseBet.rotation = Math.PI;
  const spinButton = new Button(spinStart, true);
  spinButton.position.set(50, 50);
  spinButton.pivot.set(spinButton.width / 2, spinButton.height / 2)
  spinButton.position.set(640, 750);

  const mask = new PIXI.Graphics()
    .beginFill(0xFF0000)
    .drawRect(0, 100, 1180, 620)
    .endFill();
  reels.mask = mask;
  fakeReels.mask = mask;

  reelsFrame.addChild(reels, fakeReels);
  mainContainer.addChild(background,reelsFrame, spinButton, balance, bet, increaseBet, decreaseBet);
  pixiApp.stage.addChild(mainContainer);
  pixiApp.renderer.render(pixiApp.stage);  
  pixiApp.ticker.add(delta => loop(delta));

  const loop = (delta) => {}; 
 
  function spinStart() {
    
    if (isSpined) return;
    isSpined = true;
    const curBet = bet.value;
      if (!controler.checkBalance(totalBalance, curBet)) return;
    
    totalBalance -= curBet;
    balance.changeCash(totalBalance);
    totalWin = 0;
    controler.setSymbols();
   
    reels.reels.forEach((reel, i) => reel.createNewSymbolsRow(i));
    const time = 1.3 + config.fakeReelsSet.length/8;
    const pointTomove = (config.fakeReelsSet.length + 1) * 170 - 20;
    const easing = {ease: Back.easeInOut.config(0.3)};
    
    timeLine
    .add('start')
    .to(reels.reels[0], time, {ease: easing.ease, y: 340 + pointTomove})
    .to(reels.reels[1], time + 0.8, {ease: easing.ease, y: 340 + pointTomove}, "start")
    .to(reels.reels[2], time + 1.6, {ease: easing.ease, y: 340+ pointTomove, onComplete: () => {
      reels.reels.forEach(reel => {
        const newSymbols = reel.reelset.splice(3, 3);
        reel.removeChildren();
        newSymbols.reverse().map((symbol, i) => {  
        reel.addChild(symbol.symbol);
        symbol.symbol.position.y = 170 * i});
        reel.y = -20;
      });
    }}, "start")
    .to(fakeReels.reels[0], time, {ease: easing.ease, y: pointTomove}, "start")
    .to(fakeReels.reels[1], time + 0.8, {ease: easing.ease, y: pointTomove}, "start")
    .to(fakeReels.reels[2], time + 1.6, {ease: easing.ease, y: pointTomove, onComplete: () => {
      fakeReels.reels.forEach(reel => reel.y = -360);
      controler.checkWinLines();
      
      controler.winLineData.forEach(winLine => totalWin += winLine.idWinSymbol * curBet);
        totalBalance += totalWin
        if (controler.winLines.length) {
          setCounter(totalWin, controler.winLines);
        } else {
          isSpined = false;
        }
    }}, "start");
    
    function setCounter(totalWin, winLines) {
     
      counter.setData(totalWin);
      mainContainer.addChild(counter);
      counter.alpha = 1;
      const counterTl = gsap.timeline();
      counterTl
        .to(counter, 0.5,  {x:  _w / 2})
        .to(counter, 0.5,  {x:  900, y: 720, alpha: 0, onComplete: () => {
          balance.changeCash(totalBalance);
          mainContainer.removeChild(counter);
          counter.position.set(-_w / 2, _h / 2);
          isSpined = false;
          counterTl.kill();
        }}, 1);
    }   
  };
};
  
initGame();




