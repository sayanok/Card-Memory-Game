import React, { useState } from "react";

const App: React.FC = () => {
  const cardList = [
    { id: 0, card: "1a", isClickable: true, isHidden: true, isObtained: false },
    { id: 1, card: "2b", isClickable: true, isHidden: true, isObtained: false },
    { id: 2, card: "1a", isClickable: true, isHidden: true, isObtained: false },
    { id: 3, card: "2b", isClickable: true, isHidden: true, isObtained: false },
  ];
  const [shuffledCardList, setShuffledCardList] = useState<
    Array<{ id: number; card: string; isClickable: boolean; isHidden: boolean; isObtained: boolean }>
  >([]);
  const [firstSelectedCard, setFirstSelectedCard] = useState<{
    id: number;
    card: string;
    isClickable: boolean;
    isHidden: boolean;
    isObtained: boolean;
  } | null>();
  const [secondSelectedCard, setSecondSelectedCard] = useState<{
    id: number;
    card: string;
    isClickable: boolean;
    isHidden: boolean;
    isObtained: boolean;
  } | null>();
  const [cardsYouGot, setCardsYouGot] = useState<Array<string>>([]);

  const [playingTheGame, setPlayingTheGame] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const [time, setTime] = useState<number>(0);
  const [intervalIdForGameClear, setIntervalIdForGameClear] = useState<NodeJS.Timer | null>();
  const [timeoutIdForGameClear, setTimeoutIdForGameClear] = useState<NodeJS.Timer | null>();

  let intervalId: NodeJS.Timer | null;
  let timeoutId: NodeJS.Timer | null;
  const timeLimit = 20;

  ////////////////////// ゲームステータスに関する機能　//////////////////////
  function startTheGame() {
    setPlayingTheGame(true);
    startTimer();
    shuffleAndSetCards();
    setResult("");
  }

  function exitTheGame(result: string) {
    setPlayingTheGame(false);
    stopTimer(result);
    setResult(result);
  }

  ////////////////////// 神経衰弱に関する機能 //////////////////////
  function shuffleAndSetCards() {
    let tempCardArray: Array<{
      id: number;
      card: string;
      isClickable: boolean;
      isHidden: boolean;
      isObtained: boolean;
    }> = [...cardList];

    for (let n = 0; n < tempCardArray.length; n++) {
      let tempNum = Math.floor(Math.random() * (cardList.length - 1));
      let tempStorage = tempCardArray[n];

      tempCardArray[n] = tempCardArray[tempNum];
      tempCardArray[tempNum] = tempStorage;
      setShuffledCardList([...tempCardArray]);
    }
  }

  function onClickHandler(card: {
    id: number;
    card: string;
    isClickable: boolean;
    isHidden: boolean;
    isObtained: boolean;
  }) {
    shuffledCardList.map((element) => element.id === card.id && (element.isClickable = false));

    if (!firstSelectedCard) {
      setFirstSelectedCard(card);
    } else {
      setSecondSelectedCard(card);
      compareSelectedCard(card);
    }
  }

  function compareSelectedCard(card: {
    id: number;
    card: string;
    isClickable: boolean;
    isHidden: boolean;
    isObtained: boolean;
  }) {
    if (firstSelectedCard && firstSelectedCard.card === card.card) {
      shuffledCardList.map((element) => {
        if (element.id === firstSelectedCard.id) {
          element.isHidden = false;
          element.isObtained = true;
        }
      });

      shuffledCardList.map((element) => {
        if (element.id === card.id) {
          element.isHidden = false;
          element.isObtained = true;
        }
      });

      let tempCardsYouGot = cardsYouGot;
      tempCardsYouGot.push(firstSelectedCard.card);
      tempCardsYouGot.push(card.card);
      setCardsYouGot([...tempCardsYouGot]);
      cardsYouGot.length === cardList.length && exitTheGame("ゲームクリア");
    } else {
      setTimeout(() => {
        shuffledCardList.map((element) => {
          if (firstSelectedCard && element.id === firstSelectedCard.id) {
            element.isClickable = true;
          }
        });

        shuffledCardList.map((element) => {
          if (element.id === card.id) {
            element.isClickable = true;
          }
        });
      }, 1000);
      // 1000の間に他のカードをクリックすると挙動がおかしくなる
    }

    setTimeout(() => {
      setFirstSelectedCard(null);
      setSecondSelectedCard(null);
    }, 1000);
  }

  ////////////////////// タイマーに関する機能 //////////////////////
  function startTimer() {
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
        <button onClick={() => onClickHandler(card)} disabled={!card.isClickable}>
          {card.card}
        </button>
      ))}
      <div>1枚目{firstSelectedCard && firstSelectedCard.card}</div>
      <div>2枚目{secondSelectedCard && secondSelectedCard.card}</div>

      <div>獲得したカード{cardsYouGot}</div>
      <div>結果{result}</div>
      <div hidden={result !== "ゲームクリア"}>ゲームクリアにかかった時間:{timeLimit - time}</div>
    </>
  );
};
export default App;
