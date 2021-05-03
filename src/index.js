import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Board from "./components/Board/Board";
import Dice from "./components/Dice/Dice";
import Modal from "./components/Modal/Modal";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [steps, setSteps] = useState(0);
    const [gameActive, setGameActive] = useState(true);
    const [multiplayerVisible, setMultiplayerVisible] = useState(false);

    const handlerUpKey = () => {
        setIsModalOpen(false);
        if (gameActive && roll) {
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
            setSteps(steps + 1);
        }
    };

    useEffect(() => {
        if (playerPosition >= TILES - 1) setGameActive(false);
    }, [playerPosition]);

    return (
        <div className="board-container">
            <Dice handler={handlerUpKey} />
            <Board
                handler={handlerUpKey}
                position={playerPosition}
                setPositionHandler={setPlayerPosition}
                malusHandler={setIsModalOpen}
            />
            <div className="multiplayer-container" >
                <button onClick={() => setMultiplayerVisible(true)} className="multiplayer">
                    MULTIPLAYER
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                modalHandler={setIsModalOpen}
                gameOver={false}
            />
            {!gameActive && (
                <Modal
                    isOpen={true}
                    modalHandler={setIsModalOpen}
                    gameOver={true}
                    steps={steps}
                />
            )}
            {multiplayerVisible && (
                <Modal
                    isOpen={true}
                    modalHandler={setIsModalOpen}
                    gameOver={false}
                    steps={steps}
                    multiplayer={true}
                    multiplayerHandler={setMultiplayerVisible}
                />
            )}
        </div>
    );
};

let container = document.getElementById("app");

ReactDOM.render(<Home />, container);
