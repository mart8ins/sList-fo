import { useContext } from "react";
import { Link } from "react-router-dom";
import { createRecipeContext } from "../../../../../../context/CreateRecipeContext";
import { createSListContext } from "../../../../../../context/CreateSListContext";
import CloseModalButton from "../closeModalButton/CloseModalButton";
import "./afterSave.css";

type Props = {
    type: string;
    closeModal: () => void;
};

function AfterSave({ type, closeModal }: Props) {
    const { hideListIsSavedView } = useContext(createSListContext);
    const { hideRecipeSavedView } = useContext(createRecipeContext);
    const activeTitle = type === "s-list" ? "Shopping list" : "Recipe";
    const activeLink = type === "s-list" ? "s-list" : "recipe";
    return (
        <div>
            <CloseModalButton closeModal={closeModal} />
            <div className="slist__success__container">
                <p>{activeTitle} saved</p>
                <div className="button__container">
                    <button
                        onClick={() =>
                            type === "s-list"
                                ? hideListIsSavedView()
                                : hideRecipeSavedView()
                        }
                    >
                        New {activeTitle}
                    </button>
                    <button onClick={() => closeModal()}>
                        <Link to={`${activeLink}/1`}>
                            View created {activeTitle}
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AfterSave;
