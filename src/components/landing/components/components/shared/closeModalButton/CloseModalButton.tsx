import { useContext } from "react";
import { modalContext } from "../../../../../../context/ModalContext";
import "./closeModalButton.css";

function CloseModalButton() {
    const { closeModal } = useContext(modalContext);
    return (
        <div className="modal__close">
            <button onClick={closeModal}>Close</button>
        </div>
    );
}

export default CloseModalButton;
