import React, { useState } from "react";

const App: React.FC = () => {
  const cardList = ["1a", "2b", "1a", "2b"];
  const [shuffledCardList, setShuffledCardList] = useState<Array<string>>([]);
  const [firstSelectedCard, setFirstSelectedCard] = useState<string | null>();
  const [secondSelectedCard, setSecondSelectedCard] = useState<string | null>();
  const [cardsYouGot, setCardsYouGot] = useState<Array<string>>([]);

  const [playingTheGame, setPlayingTheGame] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const [time, setTime] = useState<number>(0);
  const [intervalIdForGameClear, setIntervalIdForGameClear] = useState<NodeJS.Timer | null>();
  const [timeoutIdForGameClear, setTimeoutIdForGameClear] = useState<NodeJS.Timer | null>();

  let intervalId: NodeJS.Timer | null;
  let timeoutId: NodeJS.Timer | null;

  ////////////////////// ゲームステータスに関する機能　//////////////////////
  function startTheGame() {
    setPlayingTheGame(true);
    startTimer();
    shuffleAndSetCards();
    setResult("");
  }

  function exitTheGame(result: string) {
    // すべてのカードをクリックできないようにする
    setPlayingTheGame(false);
    stopTimer(result);
    setResult(result);
  }

  ////////////////////// 神経衰弱に関する機能 //////////////////////
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
    if (!firstSelectedCard) {
      setFirstSelectedCard(card);
    } else {
      setSecondSelectedCard(card);
      compareSelectedCard(card);
    }
  }

  function compareSelectedCard(card: string) {
    if (firstSelectedCard === card) {
      let tempCardsYouGot = cardsYouGot;
      tempCardsYouGot.push(firstSelectedCard);
      tempCardsYouGot.push(card);
      setCardsYouGot([...tempCardsYouGot]);
      cardsYouGot.length === cardList.length && exitTheGame("ゲームクリア");
    }

    setTimeout(() => {
      setFirstSelectedCard(null);
      setSecondSelectedCard(null);
    }, 500);
  }

  ////////////////////// タイマーに関する機能 //////////////////////
  function startTimer() {
    let timeLimit = 5;
    setTime(timeLimit);
    setCardsYouGot([]);

    intervalId = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    setIntervalIdForGameClear(intervalId);

    timeoutId = setTimeout(() => {
      exitTheGame("ゲームオーバー");
    }, timeLimit * 1000);
    setTimeoutIdForGameClear(timeoutId);
  }

  function stopTimer(result: string) {
    if (result === "ゲームクリア") {
      intervalIdForGameClear
        ? clearInterval(intervalIdForGameClear)
        : console.log("intervalIdForGameClearが存在しません");
      timeoutIdForGameClear ? clearTimeout(timeoutIdForGameClear) : console.log("timeoutIdForGameClearが存在しません");
    } else {
      intervalId ? clearInterval(intervalId) : console.log("intervalIdが存在しません");
      timeoutId ? clearTimeout(timeoutId) : console.log("timeoutIdが存在しません");
    }

    intervalId = null;
    setIntervalIdForGameClear(intervalId);

    timeoutId = null;
    setTimeoutIdForGameClear(timeoutId);
  }

  return (
    <>
      <button onClick={() => startTheGame()} disabled={playingTheGame}>
        start
      </button>

      <div>{time}</div>
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
