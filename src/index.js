import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalElement, Board, Dice } from "./components";
import { MSG_negative, MSG_positive } from "./constants/";

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
    const [isModalOpen, setIsModalOpen] = useState({
        visible: false,
        multiplayer: false,
        isMsgPositive: false,
    });
    const [game, setGame] = useState({
        steps: 0,
        active: true,
        rolling: true,
        playerPosition: 0,
    });

    const MSG = [MSG_negative, MSG_positive];
    const handlerUpKey = () => {
        setIsModalOpen({ visible: false });
        if (game.active && game.rolling) {
            setGame((state) => ({ ...state, rolling: false }));
            const newRoll = rollDice();
            const newPosition =
                game.playerPosition + newRoll < TILES - 1
                    ? game.playerPosition + newRoll
                    : TILES - 1;
            setTimeout(() => {
                setGame((prevState) => ({
                    ...prevState,
                    rolling: true,
                    playerPosition: newPosition,
                }));
            }, 1.5 * 1000);
            setGame((prevState) => ({
                ...prevState,
                steps: prevState.steps + 1,
            }));
        }
    };

    useEffect(() => {
        if (game.playerPosition >= TILES - 1 && game.active) {
            setGame((prevState) => ({ ...prevState, active: false }));
            setIsModalOpen({ visible: true });
        }
    }, [game]);

    let modalMessage = null;
    if (isModalOpen.visible && !isModalOpen.multiplayer && game.active) {
        const message = MSG[isModalOpen.isMsgPositive];
        const randomIndex = Math.floor(Math.random() * message.length);
        modalMessage = message[randomIndex];
    }

    return (
        <div className="board-container">
            <Dice handler={handlerUpKey} />
            <Board
                handler={handlerUpKey}
                position={game.playerPosition}
                setPositionHandler={setGame}
                malusHandler={setIsModalOpen}
            />
            <div className="multiplayer-container">
                <button
                    onClick={() => {
                        // setMultiplayerVisible(true);
                        setIsModalOpen({ visible: true, multiplayer: true });
                    }}
                    className="multiplayer"
                >
                    MULTIPLAYER
                </button>
            </div>
            <ModalElement
                isPositive={isModalOpen.isMsgPositive}
                isOpen={isModalOpen.visible}
                modalHandler={setIsModalOpen}
            >
                {game.active && !isModalOpen.multiplayer && (
                    <div>
                        <h2>STAO SI NA ZAMKU!</h2>
                        <h3>{modalMessage?.title}</h3>
                        {modalMessage?.msg}
                    </div>
                )}
                {!game.active && (
                    <div>
                        <h2>GAME OVER!!</h2>
                        Čestitamo! Uspio si se bookirati koristeći minimalan
                        broj pokušaja! Sati na koje si to utrošio: SAMO{" "}
                        {game.steps}!
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
