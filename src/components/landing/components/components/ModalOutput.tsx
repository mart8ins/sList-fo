import { useContext, useEffect } from "react";
import Modal from "react-modal";
import { createSListContext } from "../../../../context/CreateSListContext";
import NewSList from "./s-list/NewSList";
import NewRecipe from "./recipe/NewRecipe";
import { createRecipeContext } from "../../../../context/CreateRecipeContext";
import { modalContext } from "../../../../context/ModalContext";
import ListDetails from "../../../s-list/components/ListDetails";

Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: "60px",
        left: "20px",
        right: "20px",
        bottom: "60px",
    },
};

const ModalOutput = () => {
    const { modalType, modalIsOpen, closeModal, listId } =
        useContext(modalContext);
    const { hideListIsSavedView } = useContext(createSListContext);
    const { hideRecipeSavedView } = useContext(createRecipeContext);

    useEffect(() => {
        if (modalType === "s-list") {
            hideListIsSavedView();
        }
        if (modalType === "recipe") {
            hideRecipeSavedView();
        }
    }, [closeModal]);

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
            {modalType === "s-list" && <NewSList />}
            {modalType === "recipe" && <NewRecipe />}
            {modalType === "list-details" && <ListDetails listId={listId} />}
        </Modal>
    );
};

export default ModalOutput;
