import { useContext, useEffect, useState } from "react";
import "./slistTop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import { createSListContext } from "../../../../../../context/CreateSListContext";

type Props = {
    modalContentType: string;
    closeModal: () => void;
};

function SlistTop({ modalContentType, closeModal }: Props) {
    const { listTitle, groceriesList, updateTitle, saveSList } =
        useContext(createSListContext);
    const [canSave, setCanSave] = useState(false);

    useEffect(() => {
        if (listTitle && listTitle.length > 0 && groceriesList.length > 0) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [listTitle, groceriesList]);

    const handleTitle = (e: any) => {
        updateTitle(e.target.value);
    };
    return (
        <div>
            <div className="modal__close">
                <button onClick={closeModal}>Close</button>
            </div>

            <div className="title__save">
                <div>
                    <p>Create new</p>
                    <h3>{modalContentType === "s-list" && "Shopping list"}</h3>
                </div>
                <button
                    onClick={saveSList}
                    disabled={!canSave}
                    className={`save__button ${canSave && "active__save"}`}
                >
                    Save
                </button>
            </div>

            <div className="enter__title">
                <input
                    onChange={handleTitle}
                    value={listTitle}
                    type="text"
                    placeholder="Enter title"
                />
                <p>{listTitle && <FontAwesomeIcon icon={faArrowTurnDown} />}</p>
            </div>
        </div>
    );
}

export default SlistTop;
