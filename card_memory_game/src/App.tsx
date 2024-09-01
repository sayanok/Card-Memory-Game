import { DialogActions, DialogContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import AbcIcon from "@mui/icons-material/Abc";
import { Anchor, AutoAwesome, Castle } from "@mui/icons-material";

interface Card {
  id: number;
  icon: JSX.Element;
  cardName: string;
  isClickable: boolean;
  isHidden: boolean;
  isObtained: boolean;
}

const App: React.FC = () => {
  const cardList = [
    { id: 0, icon: <AbcIcon />, cardName: "Abc", isClickable: true, isHidden: true, isObtained: false },
    { id: 1, icon: <AbcIcon />, cardName: "Abc", isClickable: true, isHidden: true, isObtained: false },
    { id: 2, icon: <Anchor />, cardName: "Anchor", isClickable: true, isHidden: true, isObtained: false },
    { id: 3, icon: <Anchor />, cardName: "Anchor", isClickable: true, isHidden: true, isObtained: false },
    { id: 4, icon: <AutoAwesome />, cardName: "AutoAwesome", isClickable: true, isHidden: true, isObtained: false },
    { id: 5, icon: <AutoAwesome />, cardName: "AutoAwesome", isClickable: true, isHidden: true, isObtained: false },
    { id: 6, icon: <Castle />, cardName: "Castle", isClickable: true, isHidden: true, isObtained: false },
    { id: 7, icon: <Castle />, cardName: "Castle", isClickable: true, isHidden: true, isObtained: false },
  ];
  const [shuffledCardList, setShuffledCardList] = useState<Array<Card>>([]);
  const [firstSelectedCard, setFirstSelectedCard] = useState<Card | null>();
  const [secondSelectedCard, setSecondSelectedCard] = useState<Card | null>();
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
    shuffleAndSetCards();
    startTimer();
    setResult("");
  }

  function exitTheGame(result: string) {
    setPlayingTheGame(false);
    stopTimer(result);
    setResult(result);
  }

  ////////////////////// 神経衰弱に関する機能 //////////////////////
  function shuffleAndSetCards() {
    let tempCardArray: Array<Card> = [...cardList];

    for (let n = 0; n < tempCardArray.length; n++) {
      let tempNum = Math.floor(Math.random() * (cardList.length - 1));
      let tempStorage = tempCardArray[n];

      tempCardArray[n] = tempCardArray[tempNum];
      tempCardArray[tempNum] = tempStorage;
      setShuffledCardList([...tempCardArray]);
    }
  }

  function onClickHandler(card: Card) {
    shuffledCardList.map((element) => {
      if (element.id === card.id) {
        element.isClickable = false;
        element.isHidden = false;
      }
    });

    if (!firstSelectedCard) {
      setFirstSelectedCard(card);
    } else {
      setSecondSelectedCard(card);
      compareSelectedCard(card);
    }
  }

  function compareSelectedCard(card: Card) {
    if (firstSelectedCard && firstSelectedCard.cardName === card.cardName) {
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
      tempCardsYouGot.push(firstSelectedCard.cardName);
      tempCardsYouGot.push(card.cardName);
      setCardsYouGot([...tempCardsYouGot]);
      cardsYouGot.length === cardList.length && exitTheGame("ゲームクリア");
    } else {
      setTimeout(() => {
        shuffledCardList.map((element) => {
          if (firstSelectedCard && element.id === firstSelectedCard.id) {
            element.isClickable = true;
            element.isHidden = true;
          }
        });

        shuffledCardList.map((element) => {
          if (element.id === card.id) {
            element.isClickable = true;
            element.isHidden = true;
          }
        });

        shuffledCardList.map((card) => {
          if (!card.isObtained) {
            card.isClickable = false;
          }
        });
      }, 500);
    }

    setTimeout(() => {
      setFirstSelectedCard(null);
      setSecondSelectedCard(null);
      shuffledCardList.map((element) => {
        if (!element.isObtained) {
          element.isClickable = true;
        }
      });
    }, 500);
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
      setShuffledCardList((shuffledCardList) =>
        shuffledCardList.map((card) => {
          card.isClickable = false;
          return card;
        })
      );
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

  const handleClose = () => {
    setResult("");
  };

  return (
    <>
      <button onClick={() => startTheGame()} disabled={playingTheGame}>
        start
      </button>

      <div>{time}</div>
      <Grid container spacing={2}>
        {shuffledCardList.map((card) => (
          <Grid size={4}>
            <Button variant="contained" size="large" onClick={() => onClickHandler(card)} disabled={!card.isClickable}>
              {card.isHidden ? "　　" : <>{card.icon}</>}
            </Button>
          </Grid>
        ))}
      </Grid>

      <div>{result}</div>

      <Dialog open={result === "ゲームクリア"} onClose={handleClose}>
        <DialogContent>
          {result}
          <div>おめでとうございます。{timeLimit - time}秒でクリアしました！</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default App;
