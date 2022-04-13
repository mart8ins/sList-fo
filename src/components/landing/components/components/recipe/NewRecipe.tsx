import { useContext } from "react";
import "./newRecipe.css";
import { CreateNewProps } from "../../../../../models/models";
import CloseModalButton from "../shared/closeModalButton/CloseModalButton";
import ContentTitleAndSave from "../shared/contentTitleAndSave/ContentTitleAndSave";
import RecipePrep from "./components/RecipePrep";
import GroceryInputs from "../shared/groceryInputs/GroceryInputs";
import GroceriesListPreview from "../shared/groceriesListPreview/GroceriesListPreview";
import AfterSave from "../shared/afterSave/AfterSave";
import { createRecipeContext } from "../../../../../context/CreateRecipeContext";

function NewRecipe({ closeModal, modalContentType }: CreateNewProps) {
    const { recipeTitle, preperation, cals, recipeGroceriesList, recipeSaved } =
        useContext(createRecipeContext);

    return (
        <div className="add__new__container">
            {!recipeSaved ? (
                <>
                    <CloseModalButton closeModal={closeModal} />
                    <ContentTitleAndSave modalContentType={modalContentType} />
                    {recipeTitle && <RecipePrep />}
                    {recipeTitle && preperation && cals && cals !== "0" && (
                        <GroceryInputs modalContentType={modalContentType} />
                    )}
                    {recipeTitle &&
                        preperation &&
                        cals &&
                        cals !== "0" &&
                        recipeGroceriesList.length > 0 && (
                            <GroceriesListPreview
                                modalContentType={modalContentType}
                            />
                        )}
                </>
            ) : (
                <AfterSave type={"recipe"} closeModal={closeModal} />
            )}
        </div>
    );
}

export default NewRecipe;
