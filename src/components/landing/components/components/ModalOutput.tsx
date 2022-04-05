import Modal from "react-modal";
import NewSList from "./s-list/NewSList";
Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: "60px",
        left: "20px",
        right: "20px",
        bottom: "60px",
    },
};

type Props = {
    modalIsOpen: boolean;
    setModalIsOpen: Function;
    modalContentType: string;
};

const ModalOutput = ({
    modalIsOpen,
    setModalIsOpen,
    modalContentType,
}: Props) => {
    const closeModal = () => {
        setModalIsOpen(false);
    };

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            // contentLabel="Example Modal"
        >
            {modalContentType === "s-list" && (
                <NewSList
                    closeModal={closeModal}
                    modalContentType={modalContentType}
                />
            )}
        </Modal>
    );
};

export default ModalOutput;
