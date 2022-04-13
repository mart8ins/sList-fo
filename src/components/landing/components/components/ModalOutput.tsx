import { useContext } from "react";
import Modal from "react-modal";
import { createSListContext } from "../../../../context/CreateSListContext";
import NewSList from "./s-list/NewSList";
import NewRecipe from "./recipe/NewRecipe";
import { createRecipeContext } from "../../../../context/CreateRecipeContext";

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
    createListModalIsOpen: boolean;
    closeCreateListModal: () => void;
    modalContentType: string;
};

const ModalOutput = ({
    createListModalIsOpen,
    closeCreateListModal,
    modalContentType,
}: Props) => {
    const { hideListIsSavedView } = useContext(createSListContext);
    const { hideRecipeSavedView } = useContext(createRecipeContext);
    const closeModal = () => {
        closeCreateListModal();
        hideListIsSavedView();
        hideRecipeSavedView();
    };

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    return (
        <Modal
            isOpen={createListModalIsOpen}
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
            {modalContentType === "recipe" && (
                <NewRecipe
                    closeModal={closeModal}
                    modalContentType={modalContentType}
                />
            )}
        </Modal>
    );
};

export default ModalOutput;
