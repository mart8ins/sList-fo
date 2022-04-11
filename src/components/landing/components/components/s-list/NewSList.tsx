import { useContext } from "react";
import "./newSList.css";
import SlistTop from "./components/SlistTop";
import SlistMiddle from "./components/SlistMiddle";
import SlistBottom from "./components/SlistBottom";
import AfterSave from "../shared/afterSave/AfterSave";
import { createSListContext } from "../../../../../context/CreateSListContext";

type Props = {
    closeModal: () => void;
    modalContentType: string;
};

function NewSList({ closeModal, modalContentType }: Props) {
    const { listTitle, groceriesList, listSaved } =
        useContext(createSListContext);

    return (
        <div className="add__new__container">
            {!listSaved ? (
                <>
                    <SlistTop
                        modalContentType={modalContentType}
                        closeModal={closeModal}
                    />

                    {listTitle && <SlistMiddle />}

                    {listTitle && groceriesList.length > 0 && <SlistBottom />}
                </>
            ) : (
                <AfterSave type={"s-list"} closeModal={closeModal} />
            )}
        </div>
    );
}

export default NewSList;
