import "./createContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

function CreateContent() {
    const openModal = (type: string) => {
        console.log(`open modal ${type}`);
    };
    return (
        <div className="create__options__container">
            <div onClick={() => openModal("s-list")} className="option">
                <h3>Create</h3>
                <h1>Shopping list</h1>
                <div>
                    <FontAwesomeIcon className="icon" icon={faCirclePlus} />
                </div>
            </div>

            <div onClick={() => openModal("recipe")} className="option">
                <h3>Create</h3>
                <h1>Recipe</h1>
                <div>
                    <FontAwesomeIcon className="icon" icon={faCirclePlus} />
                </div>
            </div>
        </div>
    );
}

export default CreateContent;
