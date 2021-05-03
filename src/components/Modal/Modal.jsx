import React from "React";
import Modal from "react-modal";
import { MSG } from "../../constants/";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "85%",
        borderRadius: "10px",
        borderWidth: "3px",
        backgroundColor: "#e9d697",
        borderColor: "black",
    },
};

const ModalElement = ({ isOpen, modalHandler, gameOver, steps, multiplayer, multiplayerHandler }) => {
    const closeModal = () => {
        modalHandler(false);
        if(multiplayer) multiplayerHandler(false)
    };
    const randomIndex = Math.floor(Math.random() * MSG.length);
    const modalMessage = MSG[randomIndex];
    return (
        <div>
            <Modal
                ariaHideApp={false}
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={() => closeModal()}>X</button>
                {!gameOver && !multiplayer && (
                    <div>
                        <h2>STAO SI NA ZAMKU!</h2>
                        <h3>{modalMessage?.title}</h3>
                        {modalMessage?.msg}
                    </div>
                )}
                {gameOver && (
                    <div>
                        <h2>GAME OVER!!</h2>
                        Čestitamo! Uspio si se bookirati koristeći minimalan
                        broj pokušaja! Sati na koje si to utrošio: SAMO{" "}
                        {steps}!<p>Sad još samo moraš nekako saznati gdje da bookiraš TE sate.</p>
                        <p>Refresh za novu igru...</p>
                    </div>
                )}
                {multiplayer && (
                    <div>
                        <h3>MULTIPLAYER!?!</h3>
                        Ugasili smo multiplayer jer se ekipa stalno igrala , pa se nisu imali gdje bookirati!
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ModalElement;
