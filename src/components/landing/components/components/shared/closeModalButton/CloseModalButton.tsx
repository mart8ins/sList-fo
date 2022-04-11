import "./closeModalButton.css";

type Props = {
    closeModal: () => void;
};

function CloseModalButton({ closeModal }: Props) {
    return (
        <div className="modal__close">
            <button onClick={closeModal}>Close</button>
        </div>
    );
}

export default CloseModalButton;
