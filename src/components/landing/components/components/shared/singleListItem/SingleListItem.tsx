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
    recipeTitle?: string;
};

function SingleListItem({
    grocery,
    quantity,
    unit,
    id,
    modalType,
    checked,
    listId,
    recipeTitle,
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
            <div
                className={`single__item__data ${
                    modalType === "recipe-details" && "streched"
                } `}
            >
                <h3>
                    {grocery}{" "}
                    {recipeTitle && (
                        <span className="grocery__from__recipe">
                            recipe {recipeTitle}
                        </span>
                    )}
                </h3>
                <div className={`quantity__unit`}>
                    <p>{quantity}</p>
                    <p>{unit}</p>
                </div>
            </div>

            {modalType === "list-details" && (
                <label className="checkBox__container">
                    <input
                        className="checkBox__input"
                        onChange={handleCheckBox}
                        type="checkbox"
                        checked={checked}
                    />
                    <span className="checkBox__checkMark"></span>
                </label>
            )}

            {modalType === "recipe-details" && null}

            {modalType === "s-list" && (
                <div className="delete__icon" onClick={() => deleteGrocery(id)}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            )}

            {modalType === "recipe" && (
                <div
                    className="delete__icon"
                    onClick={() => deleteGroceryFromRecipe(id)}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            )}
        </div>
    );
}

export default SingleListItem;
