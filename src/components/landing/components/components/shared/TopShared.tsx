import "./topShared.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
    canSave: boolean;
    title: string;
    modalContentType: string;
    saveNew: () => void;
    handleTitle: (e: any) => void;
    closeModal: () => void;
};

function TopShared({
    canSave,
    title,
    modalContentType,
    saveNew,
    handleTitle,
    closeModal,
}: Props) {
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
                    onClick={saveNew}
                    disabled={!canSave}
                    className={`save__button ${canSave && "active__save"}`}
                >
                    Save
                </button>
            </div>

            <div className="enter__title">
                <input
                    onChange={handleTitle}
                    value={title}
                    type="text"
                    placeholder="Enter title"
                />
                <p>{title && <FontAwesomeIcon icon={faArrowTurnDown} />}</p>
            </div>
        </div>
    );
}

export default TopShared;
