import { useContext } from "react";
import "./singleListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { createSListContext } from "../../../../../../context/CreateSListContext";
import { createRecipeContext } from "../../../../../../context/CreateRecipeContext";

type Props = {
    id: string;
    grocery: string;
    quantity: string;
    unit: string;
    modalContentType: string;
};

function SingleListItem({
    grocery,
    quantity,
    unit,
    id,
    modalContentType,
}: Props) {
    // SHOPPING LIST CONTEXT
    const { deleteGrocery } = useContext(createSListContext);

    // RECIPES CONTEXT
    const { deleteGroceryFromRecipe } = useContext(createRecipeContext);

    return (
        <div className="single__list__item">
            <div className="single__item__data">
                <h3>{grocery}</h3>
                <div className="quantity__unit">
                    <p>{quantity}</p>
                    <p>{unit}</p>
                </div>
            </div>
            <div
                className="delete__icon"
                onClick={() =>
                    modalContentType === "s-list"
                        ? deleteGrocery(id)
                        : deleteGroceryFromRecipe(id)
                }
            >
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    );
}

export default SingleListItem;
