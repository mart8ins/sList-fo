import { useContext, useState } from "react";
import "./groceriesListPreview.css";
import { createSListContext } from "../../../../../../context/CreateSListContext";
import SingleListItem from "../../shared/singleListItem/SingleListItem";

type Props = {
    modalContentType: string;
};

function GroceriesListPreview({ modalContentType }: Props) {
    // SHOPPING LIST CONTEXT
    const { groceriesList } = useContext(createSListContext);

    // RECIPES CONTEXT
    const [groceriesInRecipe] = useState([
        { id: "2", grocery: "Piens", quantity: "1", unit: "l" },
    ]);

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
                groceriesInRecipe.map(
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
