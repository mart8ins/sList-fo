import { useContext } from "react";
import "./singleListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { createSListContext } from "../../../../../../context/CreateSListContext";
import { createRecipeContext } from "../../../../../../context/CreateRecipeContext";
import { shoppingListsContext } from "../../../../../../context/ShoppingListsContext";

type Props = {
    id: string;
    grocery: string;
    quantity: string;
    unit: string;
    modalType: string;
    checked: boolean;
    listId?: string;
};

function SingleListItem({
    grocery,
    quantity,
    unit,
    id,
    modalType,
    checked,
    listId,
}: Props) {
    // SHOPPING LIST CONTEXT
    const { deleteGrocery } = useContext(createSListContext);
    const { checkGrocery } = useContext(shoppingListsContext);

    // RECIPES CONTEXT
    const { deleteGroceryFromRecipe } = useContext(createRecipeContext);

    const handleCheckBox = (e: any) => {
        checkGrocery(id, listId);
    };

    return (
        <div
            className={`single__list__item ${
                checked && "grocery__item__checked"
            }`}
        >
            <div className="single__item__data">
                <h3>{grocery}</h3>
                <div className="quantity__unit">
                    <p>{quantity}</p>
                    <p>{unit}</p>
                </div>
            </div>

            {modalType === "list-details" || modalType === "recipe-details" ? (
                <label className="checkBox__container">
                    <input
                        className="checkBox__input"
                        onChange={handleCheckBox}
                        type="checkbox"
                        checked={checked}
                    />
                    <span className="checkBox__checkMark"></span>
                </label>
            ) : (
                <div
                    className="delete__icon"
                    onClick={() =>
                        modalType === "s-list"
                            ? deleteGrocery(id)
                            : deleteGroceryFromRecipe(id)
                    }
                >
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            )}
        </div>
    );
}

export default SingleListItem;
