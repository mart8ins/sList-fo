import { useState, useContext, useEffect } from "react";
import { recipesContext } from "../../../context/RecipesContext";
import { modalContext } from "../../../context/ModalContext";
import { shoppingListsContext } from "../../../context/ShoppingListsContext";
import { Recipe } from "../../../models/models";
import CloseModalButton from "../../landing/components/components/shared/closeModalButton/CloseModalButton";
import SingleListItem from "../../landing/components/components/shared/singleListItem/SingleListItem";
import "./recipeDetails.css";

type Props = {
    recipeId: string;
};

function RecipeDetails({ recipeId }: Props) {
    const [recipeDetails, setRecipeDetails] = useState({} as Recipe);
    const { recipes, deleteRecipe } = useContext(recipesContext);
    const {
        shoppingLists,
        updateShoppingLists,
        shoppingListNamesForChooseOption,
    } = useContext(shoppingListsContext);
    const { closeModal } = useContext(modalContext);

    const [
        showRecipeNamesWhereToSendGroceries,
        setShowRecipeNameWhereToSendGroceries,
    ] = useState(false);
    const [
        choosenRecipeIDWhereToSendGroceries,
        setChoosenRecipeIDWhereToSendGroceries,
    ] = useState("");

    useEffect(() => {
        const filtered = recipes.filter((recipe) => {
            return recipe.id === recipeId;
        });
        setRecipeDetails(filtered[0]);
    }, [recipeId, recipes]);

    const sendRecipeGroceriesToShoppingList = () => {
        // OPEN OPTION TO CHOOSE SHOPPING LIST WHERE TO SEND GROCERIES
        if (!showRecipeNamesWhereToSendGroceries) {
            setShowRecipeNameWhereToSendGroceries(true);
        }

        // SEND GROCERIES TO CHOOSEN SHOPPING LIST
        if (
            showRecipeNamesWhereToSendGroceries &&
            choosenRecipeIDWhereToSendGroceries
        ) {
            const id = choosenRecipeIDWhereToSendGroceries;
            const groceries = recipeDetails.recipeGroceriesList;

            const shoppingListsRef = [...shoppingLists];
            shoppingListsRef.forEach((item) => {
                if (item.id === id) {
                    item.groceries = [...item.groceries, ...groceries];
                }
            });

            // update context
            updateShoppingLists(shoppingListsRef);
            // set default state
            setShowRecipeNameWhereToSendGroceries(false);
            setChoosenRecipeIDWhereToSendGroceries("");
        }
    };

    return (
        <div className="recipe__details__container">
            <CloseModalButton />
            <div className="option__buttons">
                <button onClick={sendRecipeGroceriesToShoppingList}>
                    {!choosenRecipeIDWhereToSendGroceries &&
                        "Choose shopping list"}
                    {showRecipeNamesWhereToSendGroceries &&
                        choosenRecipeIDWhereToSendGroceries &&
                        "Send groceries to shopping list"}
                </button>
                <button
                    className="delete__button"
                    onClick={() => {
                        deleteRecipe(recipeDetails.id!);
                        closeModal();
                    }}
                >
                    Delete recipe
                </button>
            </div>

            {showRecipeNamesWhereToSendGroceries && (
                <div className="recipe__for__choose">
                    {shoppingListNamesForChooseOption.map((item) => {
                        return (
                            <div
                                key={item.listId}
                                className={`${
                                    choosenRecipeIDWhereToSendGroceries ===
                                        item.listId && "selected__recipe"
                                }`}
                                onClick={() =>
                                    setChoosenRecipeIDWhereToSendGroceries(
                                        item.listId
                                    )
                                }
                            >
                                {item.listTitle}
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="title">
                <div>Recipe</div>
                <div>{recipeDetails.recipeTitle}</div>
            </div>

            <div className="preperation">
                <p>Preperation</p>
                RecipeDetails {recipeDetails.preperation}
            </div>

            {recipeDetails.recipeGroceriesList &&
                recipeDetails.recipeGroceriesList.map((item: any) => {
                    return (
                        <SingleListItem
                            key={item.id}
                            id={item.id}
                            grocery={item.grocery}
                            quantity={item.quantity}
                            unit={item.unit}
                            modalType={"recipe-details"}
                            checked={item.checked}
                            listId={recipeDetails.id}
                        />
                    );
                })}
        </div>
    );
}

export default RecipeDetails;
