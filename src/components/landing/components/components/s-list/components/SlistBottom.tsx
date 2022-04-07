import { useContext } from "react";
import "./slistBottom.css";
import { createSListContext } from "../../../../../../context/CreateSListContext";
import SingleListItem from "../../shared/singleListItem/SingleListItem";

// type Props = {};

function SlistBottom() {
    const { groceriesList } = useContext(createSListContext);

    console.log(groceriesList, "groceriesList");

    return (
        <div className="list__items__container">
            {groceriesList.map(({ id, grocery, quantity, unit }: any) => {
                return (
                    <SingleListItem
                        key={id}
                        id={id}
                        grocery={grocery}
                        quantity={quantity}
                        unit={unit}
                    />
                );
            })}
        </div>
    );
}

export default SlistBottom;
