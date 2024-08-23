import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const cardList = ["a", "b", "a", "b"];
  const [selectedCard, setSelectedCard] = useState<string | null>();
  const [cardsYouGot, setCardsYouGot] = useState<Array<string>>([]);
  const [timer, setTimer] = useState<number>();
  const [playingTheGame, setPlayingTheGame] = useState<boolean>(false);

  // useEffect(() => {
  //   shuffleCards();
  // 開始ボタン押したらシャッフルでも良い？
  // });

  function shuffleAndSetCards() {
    // カードをシャッフルしてセットする
  }

  function onClickHandler(card: string) {
    if (selectedCard) {
      setSelectedCard(card);
    } else {
      compareSelectedCard(card);
      setSelectedCard(null);
    }

    cardList.length === cardsYouGot.length || exitTheGame();
  }

  function startTimer() {
    // タイマー開始
    // タイムアウトした場合の処理はここにかく...?
  }

  function stopTimer() {
    // タイマーを停止する
  }

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

  function compareSelectedCard(card: string) {
    if (selectedCard === card) {
      // cardとselectedCardをcardsYouGotにセットする
    } else {
      // 何もしなくて良いのか...？
    }
  }

  return (
    <>
      <button onClick={() => startTheGame()}>start</button>
      <div>{timer}</div>
      {cardList.map((card) => {
        <div
          onClick={() => {
            onClickHandler(card);
          }}
        >
          {card}
        </div>;
      })}
    </>
  );
};
export default App;
