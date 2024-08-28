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

  ////////////////////// ゲームステータスに関する機能　//////////////////////
  function startTheGame() {
    setPlayingTheGame(true);
    startTimer();
    shuffleAndSetCards();
    setResult("");
  }

  function exitTheGame(status: string) {
    // すべてのカードをクリックできないようにする
    setPlayingTheGame(false);
    stopTimer();
    setResult(status);
  }

  function gameOver() {
    intervalId ? clearInterval(intervalId) : console.log("タイマーに問題が発生しました");
    setIntervalId(null);
    exitTheGame("ゲームオーバー");
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
    setTime(5);
    setIntervalId(setInterval(displayCountDownTimer, 1000));
  }

  function displayCountDownTimer() {
    // timeが初期値のままになっているのでタイマーが止まらない
    if (time != 0 && time > 0) {
      setTime((time) => time - 1);
    } else {
      setTime(0);
      stopTimer();
      gameOver();
    }
  }

  function stopTimer() {
    intervalId ? clearInterval(intervalId) : console.log("タイマーに問題が発生しました");
    setIntervalId(null);
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
