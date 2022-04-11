import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import "./contentTitleAndSave.css";
import { createSListContext } from "../../../../../../context/CreateSListContext";

type Props = {
    modalContentType: string;
};

function ContentTitleAndSave({ modalContentType }: Props) {
    const [canSave, setCanSave] = useState(false);

    // SHOPPING LIST CONTEXT
    const { listTitle, groceriesList, updateTitle, saveSList } =
        useContext(createSListContext);

    // RECIPE CONTEXT
    const [recipeTitle, setRecipeTitle] = useState("");
    const saveContent = () => {}; // JĀIELIEK KONTEKSTĀ

    useEffect(() => {
        if (modalContentType === "s-list") {
            if (listTitle && listTitle.length > 0 && groceriesList.length > 0) {
                setCanSave(true);
            } else {
                setCanSave(false);
            }
        }
        if (modalContentType === "recipe") {
            if (recipeTitle && recipeTitle.length > 0) {
                // PAPILDINĀT
                setCanSave(true);
            } else {
                setCanSave(false);
            }
        }
    }, [modalContentType, listTitle, groceriesList, recipeTitle]);

    // HANDLE TITLE FOR CONTENT OF BOTH
    const handleTitle = (e: any) => {
        if (modalContentType === "s-list") {
            updateTitle(e.target.value);
        }
        if (modalContentType === "recipe") {
            setRecipeTitle(e.target.value);
        }
    };

    return (
        <div>
            <div className="title__save">
                <div>
                    <p>Create new</p>
                    <h3>
                        {modalContentType === "s-list"
                            ? "Shopping list"
                            : "Recipe"}
                    </h3>
                </div>
                <button
                    onClick={
                        modalContentType === "s-list" ? saveSList : saveContent
                    }
                    disabled={!canSave}
                    className={`save__button ${canSave && "active__save"}`}
                >
                    Save
                </button>
            </div>

            <div className="enter__title">
                <input
                    onChange={handleTitle}
                    value={
                        modalContentType === "s-list" ? listTitle : recipeTitle
                    }
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
