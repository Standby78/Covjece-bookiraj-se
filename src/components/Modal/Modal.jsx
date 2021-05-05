import React from "React";
import Modal from "react-modal";

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

const ModalElement = ({ isOpen, modalHandler, children }) => {
    const closeModal = () => {
        modalHandler({ visible: false, multiplayer: false });
    };
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
                {children}
            </Modal>
        </div>
    );
};

export { ModalElement };
