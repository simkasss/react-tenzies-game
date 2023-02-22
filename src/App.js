import "./App.css";
import Die from "./Die.js";
import React from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [dices, setDices] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    if (
      dices.every((item) => item.isHeld === true) &&
      dices.every((item) => item.value === dices[0].value)
    ) {
      console.log("you won");
      setTenzies(true);
    } else {
      setTenzies(false);
      console.log("not yet");
    }
  }, [dices]);

  function allNewDice() {
    const diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceArr;
  }
  function holdDice(id) {
    setDices((olds) =>
      olds.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }
  function newGame() {
    setDices(allNewDice());
  }
  function newDice() {
    setDices((olds) =>
      olds.map((item) => {
        return item.isHeld === false
          ? { ...item, value: Math.ceil(Math.random() * 6) }
          : item;
      })
    );
  }

  const setDie = dices.map((item) => (
    <Die
      value={item.value}
      isHeld={item.isHeld}
      key={item.id}
      holdDice={() => holdDice(item.id)}
    />
  ));

  return (
    <main className="App">
      <div className="grid">{setDie}</div>
      <button className="roll-button" onClick={tenzies ? newGame : newDice}>
        {tenzies ? "Restart" : "Roll"}
      </button>
    </main>
  );
}
