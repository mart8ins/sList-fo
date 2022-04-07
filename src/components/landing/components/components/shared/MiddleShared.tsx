import { useState, useContext } from "react";
import "./middleShared.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Grocery } from "../../../../../models/models";
import { createSListContext } from "../../../../../context/CreateSListContext";

// type Props = {};

function MiddleShared() {
    const { groceriesNameDB, updateGroceries } = useContext(createSListContext);

    const [grocery, setGrocery] = useState<Grocery>({
        grocery: "",
        quantity: "",
        unit: "",
    });

    const handleChange = (e: any) => {
        setGrocery({
            ...grocery,
            [e.target.name]: e.target.value,
        });
    };

    const addGroceryToList = () => {
        updateGroceries(grocery);
        setGrocery({
            grocery: "",
            quantity: "",
            unit: "",
        });
    };

    return (
        <div>
            <div className="grocery__option">
                <p>Check if grocery exists...</p>
                <select
                    onChange={handleChange}
                    name="grocery"
                    value={grocery.grocery}
                >
                    <option value="">Groceries</option>
                    {groceriesNameDB.map((item, i) => {
                        return (
                            <option key={i} value={item}>
                                {item}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div className="grocery__inputs__container">
                <div className="grocery__inputs">
                    <input
                        value={grocery.grocery}
                        name="grocery"
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter grocery"
                    />
                    <input
                        onChange={handleChange}
                        name="quantity"
                        value={grocery.quantity}
                        className="grocery__quantity"
                        type="number"
                        placeholder="Q"
                        min={0}
                    />
                    <select
                        onChange={handleChange}
                        name="unit"
                        value={grocery.unit}
                    >
                        <option value="">Unit</option>
                        <option value="pc">pc</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                        <option value="gr">gr</option>
                        <option value="kg">kg</option>
                    </select>
                </div>

                <button
                    onClick={addGroceryToList}
                    className="pluss__icon__container"
                >
                    <FontAwesomeIcon
                        className="pluss__icon"
                        icon={faCirclePlus}
                    />
                </button>
            </div>
        </div>
    );
}

export default MiddleShared;
