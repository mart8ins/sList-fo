import { useContext } from "react";
import "./newRecipe.css";
import { CreateNewProps } from "../../../../../models/models";
import CloseModalButton from "../shared/closeModalButton/CloseModalButton";
import ContentTitleAndSave from "../shared/contentTitleAndSave/ContentTitleAndSave";
import AfterSave from "../shared/afterSave/AfterSave";

function NewRecipe({ closeModal, modalContentType }: CreateNewProps) {
    const recipeSaved = false;
    return (
        <div className="add__new__container">
            {!recipeSaved ? (
                <>
                    <CloseModalButton closeModal={closeModal} />
                    <ContentTitleAndSave modalContentType={modalContentType} />
                </>
            ) : (
                <AfterSave type={"recipe"} closeModal={closeModal} />
            )}
        </div>
    );
}

export default NewRecipe;
