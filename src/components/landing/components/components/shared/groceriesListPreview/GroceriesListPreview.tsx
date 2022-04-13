import { useContext, useState } from "react";
import "./groceriesListPreview.css";
import { createSListContext } from "../../../../../../context/CreateSListContext";
import SingleListItem from "../../shared/singleListItem/SingleListItem";
import { createRecipeContext } from "../../../../../../context/CreateRecipeContext";

type Props = {
    modalContentType: string;
};

function GroceriesListPreview({ modalContentType }: Props) {
    // SHOPPING LIST CONTEXT
    const { groceriesList } = useContext(createSListContext);

    // RECIPES CONTEXT
    const { recipeGroceriesList } = useContext(createRecipeContext);

    return (
        <div className="list__items__container">
            {modalContentType === "s-list" &&
                groceriesList.map(({ id, grocery, quantity, unit }: any) => {
                    return (
                        <SingleListItem
                            key={id}
                            id={id}
                            grocery={grocery}
                            quantity={quantity}
                            unit={unit}
                            modalContentType={modalContentType}
                        />
                    );
                })}
            {modalContentType === "recipe" &&
                recipeGroceriesList.map(
                    ({ id, grocery, quantity, unit }: any) => {
                        return (
                            <SingleListItem
                                key={id}
                                id={id}
                                grocery={grocery}
                                quantity={quantity}
                                unit={unit}
                                modalContentType={modalContentType}
                            />
                        );
                    }
                )}
        </div>
    );
}

export default GroceriesListPreview;
