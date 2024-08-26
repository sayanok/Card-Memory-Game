import React, { useState } from "react";

const App: React.FC = () => {
  const cardList = ["1a", "2b", "3a", "4b", "1a", "2b", "3a", "4b"];
  const [shuffledCardList, setShuffledCardList] = useState<Array<string>>([]);
  const [firstSelectedCard, setFirstSelectedCard] = useState<string | null>();
  const [secondSelectedCard, setSecondSelectedCard] = useState<string | null>();
  const [cardsYouGot, setCardsYouGot] = useState<Array<string>>([]);
  const [timer, setTimer] = useState<number>();
  const [playingTheGame, setPlayingTheGame] = useState<boolean>(false);

  function startTheGame() {
    setPlayingTheGame(true);
    startTimer();
    shuffleAndSetCards();
    // スタートボタンをクリックできないようにする
  }

  function exitTheGame() {
    // すべてのカードをクリックできないようにする
    // 終了とか表示する？
    setPlayingTheGame(false);
    stopTimer();
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

    cardList.length === cardsYouGot.length || exitTheGame();
  }

  function startTimer() {
    // タイマー開始fv /:v;.bv.ds/:;;d:][dx:][　]
    // タイムアウトした場合の処理はここにかく...?
  }

  function stopTimer() {
    // タイマーを停止する
  }

  function compareFirstSelectedCard(card: string) {
    if (firstSelectedCard === card) {
      setCardsYouGot([...cardsYouGot, firstSelectedCard, card]);
      console.log(cardsYouGot);
    } else {
      const tempCard = card;
      setSecondSelectedCard(tempCard);
    }
  }

  return (
    <>
      <button onClick={() => startTheGame()}>start</button>
      <div>{timer}</div>
      <div>{playingTheGame ? "start" : "not start"}</div>
      {shuffledCardList.map((card) => (
        <button onClick={() => onClickHandler(card)} disabled={cardsYouGot.includes(card)}>
          {card}
        </button>
      ))}
      <div>1枚目{firstSelectedCard}</div>
      <div>2枚目{secondSelectedCard}</div>

      <div>獲得したカード{cardsYouGot}</div>
    </>
  );
};
export default App;
