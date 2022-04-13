import { useContext } from "react";
import { createRecipeContext } from "../../../../../../context/CreateRecipeContext";
import "./recipePrep.css";

function RecipePrep() {
    const { updatePreperation, updateCals, cals, preperation } =
        useContext(createRecipeContext);

    const handleChange = (e: any) => {
        if (e.target.name === "preperation") {
            updatePreperation(e.target.value);
        }
        if (e.target.name === "cals") {
            updateCals(e.target.value);
        }
    };
    return (
        <div className="preperation__container">
            <textarea
                onChange={handleChange}
                name="preperation"
                placeholder="Preperation..."
                value={preperation}
            ></textarea>
            <div className="cals__container">
                <p>Calories per serving</p>
                <input
                    onChange={handleChange}
                    type="number"
                    name="cals"
                    placeholder="0"
                    min={0}
                    value={cals}
                />
            </div>
        </div>
    );
}

export default RecipePrep;
