import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalElement, Board, Dice } from "./components";
import { MSG } from "./constants/";

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
    const [isModalOpen, setIsModalOpen] = useState({visible: false, multiplayer: false});
    const [steps, setSteps] = useState(0);
    const [gameActive, setGameActive] = useState(true);

    const handlerUpKey = () => {
        setIsModalOpen({visible: false});
        if (gameActive && roll) {
            setRoll(false);
            const newRoll = rollDice();
            const newPosition =
                playerPosition + newRoll < TILES - 1
                    ? playerPosition + newRoll
                    : TILES - 1;
            setTimeout(() => {
                setPlayerPosition(newPosition);
                setRoll(true);
            }, 1.5 * 1000);
            setSteps(steps + 1);
        }
    };

    useEffect(() => {
        if (playerPosition >= TILES - 1) {
            setGameActive(false);
            setIsModalOpen({ visible: true});
        }
    }, [playerPosition]);

    let randomIndex = null;
    let modalMessage = null;

    if (isModalOpen.visible) {
        randomIndex = Math.floor(Math.random() * MSG.length);
        modalMessage = MSG[randomIndex];
    }

    return (
        <div className="board-container">
            <Dice handler={handlerUpKey} />
            <Board
                handler={handlerUpKey}
                position={playerPosition}
                setPositionHandler={setPlayerPosition}
                malusHandler={setIsModalOpen}
            />
            <div className="multiplayer-container">
                <button
                    onClick={() => {
                        // setMultiplayerVisible(true);
                        setIsModalOpen({visible: true, multiplayer: true});
                    }}
                    className="multiplayer"
                >
                    MULTIPLAYER
                </button>
            </div>
            <ModalElement isOpen={isModalOpen.visible} modalHandler={setIsModalOpen}>
                {gameActive && !isModalOpen.multiplayer && (
                    <div>
                        <h2>STAO SI NA ZAMKU!</h2>
                        <h3>{modalMessage?.title}</h3>
                        {modalMessage?.msg}
                    </div>
                )}
                {!gameActive && (
                    <div>
                        <h2>GAME OVER!!</h2>
                        Čestitamo! Uspio si se bookirati koristeći minimalan
                        broj pokušaja! Sati na koje si to utrošio: SAMO {steps}!
                        <p>
                            Sad još samo moraš nekako saznati gdje da bookiraš
                            TE sate.
                        </p>
                        <p>Refresh za novu igru...</p>
                    </div>
                )}
                {isModalOpen.multiplayer && (
                    <div>
                        <h3>MULTIPLAYER!?!</h3>
                        Ugasili smo multiplayer jer se ekipa stalno igrala , pa
                        se nisu imali gdje bookirati!
                    </div>
                )}
            </ModalElement>
        </div>
    );
};

let container = document.getElementById("app");

ReactDOM.render(<Home />, container);
