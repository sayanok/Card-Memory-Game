import { time } from "console";
import React, { useState } from "react";

const App: React.FC = () => {
  const cardList = ["1a", "2b", "3a", "4b", "1a", "2b", "3a", "4b"];
  const [shuffledCardList, setShuffledCardList] = useState<Array<string>>([]);
  const [firstSelectedCard, setFirstSelectedCard] = useState<string | null>();
  const [secondSelectedCard, setSecondSelectedCard] = useState<string | null>();
  const [cardsYouGot, setCardsYouGot] = useState<Array<string>>([]);
  const [time, setTime] = useState<number>(5);
  const [playingTheGame, setPlayingTheGame] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>();
  const [result, setResult] = useState<string>();

  function startTheGame() {
    setPlayingTheGame(true);
    startTimer();
    shuffleAndSetCards();
    setResult("");
    // スタートボタンをクリックできないようにする
  }

  function exitTheGame() {
    // すべてのカードをクリックできないようにする
    // 終了とか表示する？
    setPlayingTheGame(false);
    stopTimer();
    setShuffledCardList([]);
  }

  function shuffleAndSetCards() {
    let tempCardArray: Array<string> = [...cardList];

    for (let n = 0; n < tempCardArray.length; n++) {
      let tempNum = Math.floor(Math.random() * (cardList.length - 1));
      let tempStorage = tempCardArray[n];

      tempCardArray[n] = tempCardArray[tempNum];
      tempCardArray[tempNum] = tempStorage;
      setShuffledCardList([...tempCardArray]);
    }
  }

  function onClickHandler(card: string) {
    if (firstSelectedCard && secondSelectedCard) {
      setFirstSelectedCard(null);
      setSecondSelectedCard(null);
    }

    // 思ったように動いていない
    if (!firstSelectedCard) {
      const tempCard = card;
      setFirstSelectedCard(tempCard);
    } else {
      compareFirstSelectedCard(card);
    }
  }

  function startTimer() {
    setTime(5);
    setIntervalId(setInterval(displayCountDownTimer, 1000));
  }

  function displayCountDownTimer() {
    // timeが初期値のままで止まらない
    if (time != 0 && time > 0) {
      setTime((time) => time - 1);
    } else {
      setTime(0);
      stopTimer();
      displayGameOver();
    }
  }

  function displayGameOver() {
    intervalId ? clearInterval(intervalId) : console.log("タイマーに問題が発生しました");
    setIntervalId(null);
    setResult("ゲームオーバー");
  }

  function stopTimer() {
    intervalId ? clearInterval(intervalId) : console.log("タイマーに問題が発生しました");
    setIntervalId(null);
  }

  function compareFirstSelectedCard(card: string) {
    if (firstSelectedCard === card) {
      setCardsYouGot([...cardsYouGot, firstSelectedCard, card]);
      cardsYouGot.length === cardList.length || gameClear();
      // 思うような動きではない
    } else {
      const tempCard = card;
      setSecondSelectedCard(tempCard);
    }
  }

  function gameClear() {
    setResult("ゲームクリア");
  }

  return (
    <>
      <div>
        {playingTheGame ? (
          <button onClick={() => exitTheGame()}>reset</button>
        ) : (
          <button onClick={() => startTheGame()}>start</button>
        )}
      </div>

      <div>{time}</div>
      <div>{playingTheGame ? "start" : "not start"}</div>
      {shuffledCardList.map((card) => (
        <button onClick={() => onClickHandler(card)}>{card}</button>
      ))}
      <div>1枚目{firstSelectedCard}</div>
      <div>2枚目{secondSelectedCard}</div>

      <div>獲得したカード{cardsYouGot}</div>
      <div>結果{result}</div>
    </>
  );
};
export default App;
