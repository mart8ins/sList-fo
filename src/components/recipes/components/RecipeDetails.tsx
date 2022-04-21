import { useState, useContext, useEffect } from "react";
import { recipesContext } from "../../../context/RecipesContext";
import { modalContext } from "../../../context/ModalContext";
import { shoppingListsContext } from "../../../context/ShoppingListsContext";
import { Recipe } from "../../../models/models";
import CloseModalButton from "../../landing/components/components/shared/closeModalButton/CloseModalButton";
import SingleListItem from "../../landing/components/components/shared/singleListItem/SingleListItem";
import "./recipeDetails.css";
import { v4 as uuidv4 } from "uuid";

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

    const [newListTitle, setNewListTitle] = useState("");

    useEffect(() => {
        const filtered = recipes.filter((recipe) => {
            return recipe.id === recipeId;
        });
        setRecipeDetails(filtered[0]);
    }, [recipeId, recipes]);

    const sendRecipeGroceriesToShoppingList = () => {
        const groceries = recipeDetails.recipeGroceriesList;
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
        if (showRecipeNamesWhereToSendGroceries && newListTitle.length > 0) {
            const newSList = {
                authorId: uuidv4(),
                id: uuidv4(),
                title: newListTitle,
                groceries,
                completed: false,
            };
            updateShoppingLists([newSList]);
            setShowRecipeNameWhereToSendGroceries(false);
            setNewListTitle("");
        }
    };

    // const createNewShoppingListIfNoExists = () => {
    //     console.log("jauns shop lists");
    // };

    const handleNewListTitle = (e: any) => {
        setNewListTitle(e.target.value);
    };

    return (
        <div className="recipe__details__container">
            <CloseModalButton />
            <div className="option__buttons">
                <button onClick={sendRecipeGroceriesToShoppingList}>
                    {!choosenRecipeIDWhereToSendGroceries &&
                        newListTitle.length === 0 &&
                        "Choose shopping list"}
                    {((showRecipeNamesWhereToSendGroceries &&
                        choosenRecipeIDWhereToSendGroceries) ||
                        newListTitle.length > 0) &&
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
                    {shoppingListNamesForChooseOption.length > 0 ? (
                        shoppingListNamesForChooseOption.map((item) => {
                            return (
                                <div
                                    key={item.listId}
                                    className={`choose__recipe ${
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
                        })
                    ) : (
                        <div className="new__recipe">
                            <label>
                                Send to new shopping list
                                <input
                                    type="text"
                                    placeholder="Enter lists title"
                                    onChange={handleNewListTitle}
                                    value={newListTitle}
                                />
                            </label>
                            {/* <span onClick={createNewShoppingListIfNoExists}>
                                Create
                            </span> */}
                        </div>
                    )}
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
