import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Board from "./components/Board/Board";
import Dice from "./components/Dice/Dice";

const TILES = 40;

const rollDice = () => {
    const die = document.getElementsByClassName("die-list");
    toggleClasses(die[0]);
    const roll = Math.floor(Math.random() * 6) + 1;
    die[0].dataset.roll = roll;
    return roll;
};

const toggleClasses = (die) => {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
};

const Home = () => {
    const [playerPosition, setPlayerPosition] = useState(0);
    const [roll, setRoll] = useState(true);

    const handlerUpKey = () => {
        if (roll) {
            setRoll(false);
            const roll = rollDice();
            const newPosition =
                playerPosition + roll < TILES - 1
                    ? playerPosition + roll
                    : TILES - 1;
            setTimeout(() => {
                setPlayerPosition(newPosition);
                setRoll(true);
            }, 1.5 * 1000);
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", handlerUpKey);
        return () => {
            window.removeEventListener("keyup", handlerUpKey);
        };
    });

    return (
        <div className="board-container">
            <Board position={playerPosition} setPositionHandler={setPlayerPosition} />
            <Dice />
        </div>
    );
};

let container = document.getElementById("app");

ReactDOM.render(<Home />, container);
