import { useState, useContext } from "react";
import "./createContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ModalOutput from "./components/ModalOutput";
import { createSListContext } from "../../../context/CreateSListContext";

function CreateContent() {
    const { createListModalIsOpen, openCreateListModal, closeCreateListModal } =
        useContext(createSListContext);

    const [modalContentType, setModalContentType] = useState("");

    const openModal = (type: string) => {
        openCreateListModal();
        setModalContentType(type);
    };

    return (
        <div className="create__options__container">
            <ModalOutput
                createListModalIsOpen={createListModalIsOpen}
                closeCreateListModal={closeCreateListModal}
                modalContentType={modalContentType}
            />
            <div onClick={() => openModal("s-list")} className="option">
                <h3>Create</h3>
                <h1>Shopping list</h1>
                <div>
                    <FontAwesomeIcon className="icon" icon={faCirclePlus} />
                </div>
            </div>

            <div onClick={() => openModal("recipe")} className="option">
                <h3>Create</h3>
                <h1>Recipe</h1>
                <div>
                    <FontAwesomeIcon className="icon" icon={faCirclePlus} />
                </div>
            </div>
        </div>
    );
}

export default CreateContent;
