import { useState } from "react";
import "./createContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ModalOutput from "./components/ModalOutput";

function CreateContent() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContentType, setModalContentType] = useState("");

    const openModal = (type: string) => {
        setModalIsOpen(true);
        setModalContentType(type);
    };

    return (
        <div className="create__options__container">
            <ModalOutput
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                modalContentType={modalContentType}
            />
            <div onClick={() => openModal("s-list")} className="option">
                <h3>Create</h3>
                <h1>Shopping list</h1>
                <div>
                    <FontAwesomeIcon className="icon" icon={faCirclePlus} />
                </div>
            </div>

            <div onClick={() => openModal("recipes")} className="option">
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
