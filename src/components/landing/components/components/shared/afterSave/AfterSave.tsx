import { useContext } from "react";
import { Link } from "react-router-dom";
import { createSListContext } from "../../../../../../context/CreateSListContext";
import CloseModalButton from "../closeModalButton/CloseModalButton";
import "./afterSave.css";

type Props = {
    type: string;
    closeModal: () => void;
};

function AfterSave({ type, closeModal }: Props) {
    const { hideListIsSavedView } = useContext(createSListContext);
    const activeTitle = type === "s-list" ? "Shopping list" : "Recipe";
    return (
        <div>
            <CloseModalButton closeModal={closeModal} />
            <div className="slist__success__container">
                <p>{activeTitle} saved</p>
                <div className="button__container">
                    <button onClick={() => hideListIsSavedView()}>
                        New {activeTitle}
                    </button>
                    <button>
                        <Link to="s-list/1">View created {activeTitle}</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AfterSave;
