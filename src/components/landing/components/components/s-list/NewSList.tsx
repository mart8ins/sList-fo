import { useContext } from "react";
import "./newSList.css";
import ContentTitleAndSave from "../shared/contentTitleAndSave/ContentTitleAndSave";
import GroceryInputs from "../shared/groceryInputs/GroceryInputs";
import GroceriesListPreview from "../shared/groceriesListPreview/GroceriesListPreview";
import AfterSave from "../shared/afterSave/AfterSave";
import { createSListContext } from "../../../../../context/CreateSListContext";
import CloseModalButton from "../shared/closeModalButton/CloseModalButton";

function NewSList() {
    const { listTitle, groceriesList, listSaved } =
        useContext(createSListContext);

    return (
        <div className="add__new__container">
            {!listSaved ? (
                <>
                    <CloseModalButton />
                    <ContentTitleAndSave />
                    {listTitle && <GroceryInputs />}
                    {listTitle && groceriesList.length > 0 && (
                        <GroceriesListPreview />
                    )}
                </>
            ) : (
                <AfterSave />
            )}
        </div>
    );
}

export default NewSList;
