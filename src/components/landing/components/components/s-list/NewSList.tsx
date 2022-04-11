import { useContext } from "react";
import "./newSList.css";
import ContentTitleAndSave from "../shared/contentTitleAndSave/ContentTitleAndSave";
import GroceryInputs from "../shared/groceryInputs/GroceryInputs";
import SlistBottom from "./components/SlistBottom";
import AfterSave from "../shared/afterSave/AfterSave";
import { createSListContext } from "../../../../../context/CreateSListContext";
import { CreateNewProps } from "../../../../../models/models";
import CloseModalButton from "../shared/closeModalButton/CloseModalButton";

function NewSList({ closeModal, modalContentType }: CreateNewProps) {
    const { listTitle, groceriesList, listSaved } =
        useContext(createSListContext);

    return (
        <div className="add__new__container">
            {!listSaved ? (
                <>
                    <CloseModalButton closeModal={closeModal} />
                    <ContentTitleAndSave modalContentType={modalContentType} />
                    {listTitle && (
                        <GroceryInputs modalContentType={modalContentType} />
                    )}
                    {listTitle && groceriesList.length > 0 && <SlistBottom />}
                </>
            ) : (
                <AfterSave type={"s-list"} closeModal={closeModal} />
            )}
        </div>
    );
}

export default NewSList;
