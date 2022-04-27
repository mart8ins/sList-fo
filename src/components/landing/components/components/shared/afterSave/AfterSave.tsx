import { useContext } from "react";
import { Link } from "react-router-dom";
import { createRecipeContext } from "../../../../../../context/CreateRecipeContext";
import { createSListContext } from "../../../../../../context/CreateSListContext";
import { modalContext } from "../../../../../../context/ModalContext";
import CloseModalButton from "../closeModalButton/CloseModalButton";
import "./afterSave.css";

function AfterSave() {
    const { modalType } = useContext(modalContext);
    const { hideListIsSavedView } = useContext(createSListContext);
    const { hideRecipeSavedView } = useContext(createRecipeContext);
    const activeTitle = modalType === "s-list" ? "Shopping list" : "Recipe";
    const activeLink = modalType === "s-list" ? "s-list" : "recipe";
    return (
        <div>
            <CloseModalButton />
            <div className="slist__success__container">
                <p>{activeTitle} saved</p>
                <div className="button__container">
                    <button onClick={() => (modalType === "s-list" ? hideListIsSavedView() : hideRecipeSavedView())}>
                        New {activeTitle}
                    </button>
                    {/* <button>
                        <Link to={`${activeLink}/1`}>
                            View created {activeTitle}
                        </Link>
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default AfterSave;
