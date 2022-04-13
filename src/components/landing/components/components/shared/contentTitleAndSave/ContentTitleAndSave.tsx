import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import "./contentTitleAndSave.css";
import { createSListContext } from "../../../../../../context/CreateSListContext";
import { createRecipeContext } from "../../../../../../context/CreateRecipeContext";
import { modalContext } from "../../../../../../context/ModalContext";

function ContentTitleAndSave() {
    const { modalType } = useContext(modalContext);
    const [canSave, setCanSave] = useState(false);

    // SHOPPING LIST CONTEXT
    const { listTitle, groceriesList, updateTitle, saveSList } =
        useContext(createSListContext);

    // RECIPE CONTEXT
    const {
        recipeTitle,
        preperation,
        cals,
        recipeGroceriesList,
        updateRecipeTitle,
        saveRecipe,
    } = useContext(createRecipeContext);

    useEffect(() => {
        if (modalType === "s-list") {
            if (listTitle.length > 0 && groceriesList.length > 0) {
                setCanSave(true);
            } else {
                setCanSave(false);
            }
        }
        if (modalType === "recipe") {
            if (
                recipeTitle.length > 0 &&
                preperation.length > 0 &&
                cals &&
                cals !== "0" &&
                recipeGroceriesList.length > 0
            ) {
                // PAPILDINĀT
                setCanSave(true);
            } else {
                setCanSave(false);
            }
        }
    }, [
        modalType,
        listTitle,
        groceriesList,
        recipeTitle,
        preperation,
        cals,
        recipeGroceriesList,
    ]);

    // HANDLE TITLE FOR CONTENT OF BOTH
    const handleTitle = (e: any) => {
        if (modalType === "s-list") {
            updateTitle(e.target.value);
        }
        if (modalType === "recipe") {
            updateRecipeTitle(e.target.value);
        }
    };

    return (
        <div>
            <div className="title__save">
                <div>
                    <p>Create new</p>
                    <h3>
                        {modalType === "s-list" ? "Shopping list" : "Recipe"}
                    </h3>
                </div>
                <button
                    onClick={modalType === "s-list" ? saveSList : saveRecipe}
                    disabled={!canSave}
                    className={`save__button ${canSave && "active__save"}`}
                >
                    Save
                </button>
            </div>

            <div className="enter__title">
                <input
                    onChange={handleTitle}
                    value={modalType === "s-list" ? listTitle : recipeTitle}
                    type="text"
                    placeholder="Enter title"
                />
                <p>
                    {listTitle.length || recipeTitle.length ? (
                        <FontAwesomeIcon icon={faArrowTurnDown} />
                    ) : null}
                </p>
            </div>
        </div>
    );
}

export default ContentTitleAndSave;
