import { useContext } from "react";
import "./groceriesListPreview.css";
import { createSListContext } from "../../../../../../context/CreateSListContext";
import SingleListItem from "../../shared/singleListItem/SingleListItem";
import { createRecipeContext } from "../../../../../../context/CreateRecipeContext";
import { modalContext } from "../../../../../../context/ModalContext";

function GroceriesListPreview() {
    const { modalType } = useContext(modalContext);
    // SHOPPING LIST CONTEXT
    const { groceriesList } = useContext(createSListContext);

    // RECIPES CONTEXT
    const { recipeGroceriesList } = useContext(createRecipeContext);

    return (
        <div className="list__items__container">
            {modalType === "s-list" &&
                groceriesList.map(
                    ({ id, grocery, quantity, unit, checked }: any) => {
                        return (
                            <SingleListItem
                                key={id}
                                id={id}
                                grocery={grocery}
                                quantity={quantity}
                                unit={unit}
                                modalType={modalType}
                                checked={checked}
                            />
                        );
                    }
                )}
            {modalType === "recipe" &&
                recipeGroceriesList.map(
                    ({ id, grocery, quantity, unit, checked }: any) => {
                        return (
                            <SingleListItem
                                key={id}
                                id={id}
                                grocery={grocery}
                                quantity={quantity}
                                unit={unit}
                                modalType={modalType}
                                checked={checked}
                            />
                        );
                    }
                )}
        </div>
    );
}

export default GroceriesListPreview;
