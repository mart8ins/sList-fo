import { useState, useContext, useEffect } from "react";
import { recipesContext } from "../../../context/RecipesContext";
import { modalContext } from "../../../context/ModalContext";
import { shoppingListsContext } from "../../../context/ShoppingListsContext";
import { Recipe, ShoppingList } from "../../../models/models";
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
    const { shoppingLists, updateShoppingLists, shoppingListNamesForChooseOption } = useContext(shoppingListsContext);
    const { closeModal } = useContext(modalContext);

    const [showRecipeNamesWhereToSendGroceries, setShowRecipeNameWhereToSendGroceries] = useState(false);
    const [choosenShoppingListIDWhereToSendGroceries, setChoosenShoppingListIDWhereToSendGroceries] = useState("");
    const [shoppingListToUpdateWithGroceries, setShoppingListToUpdateWithGroceries] = useState({} as ShoppingList);

    const [newListTitle, setNewListTitle] = useState("");

    // filter recipe
    useEffect(() => {
        const filtered = recipes.filter((recipe) => {
            return recipe.id === recipeId;
        });
        setRecipeDetails(filtered[0]);
    }, [recipeId, recipes]);

    const sendRecipeGroceriesToShoppingList = () => {
        const groceries = [...recipeDetails.recipeGroceriesList]; // receptes groceries arrays
        // OPEN OPTION TO CHOOSE SHOPPING LIST WHERE TO SEND GROCERIES
        if (!showRecipeNamesWhereToSendGroceries) {
            setShowRecipeNameWhereToSendGroceries(true);
        }
        // SEND GROCERIES TO CHOOSEN SHOPPING LIST
        if (showRecipeNamesWhereToSendGroceries && choosenShoppingListIDWhereToSendGroceries) {
            const updatedObj: ShoppingList = {
                authorId: shoppingListToUpdateWithGroceries.authorId,
                id: shoppingListToUpdateWithGroceries.id,
                title: shoppingListToUpdateWithGroceries.title,
                completed: shoppingListToUpdateWithGroceries.completed,
                groceries: [],
            };
            /* CHANGE VALUES */
            let what = [...groceries]; // recipe groceries to...
            let where = [...shoppingListToUpdateWithGroceries.groceries]; // shopping list groceries

            let recipeExistsInList = false;
            for (let outer = 0; outer < where.length; outer++) {
                if (where[outer].recipeTitle === recipeDetails.recipeTitle) {
                    recipeExistsInList = true;
                }
            }

            const maped = where.map((item) => {
                let por = item.portions;
                let title = item.recipeTitle;
                if (item.recipeTitle === recipeDetails.recipeTitle) {
                    por++;
                    title = recipeDetails.recipeTitle;
                }
                const newEl = {
                    id: item.id,
                    grocery: item.grocery,
                    checked: item.checked,
                    unit: item.unit,
                    quantity: item.quantity,
                    portions: por,
                    recipeTitle: title,
                };
                return newEl;
            });
            if (!recipeExistsInList) {
                updatedObj.groceries = [...where, ...what];
            } else {
                updatedObj.groceries = [...maped];
            }

            /* UPDATE MAIN STATE */
            const shopRef = [...shoppingLists];
            const index = shopRef.findIndex((el) => {
                return el.id === updatedObj.id;
            });
            shopRef.splice(index, 1, updatedObj);
            updateShoppingLists(shopRef);

            // SET DEFAULT STATE
            setShowRecipeNameWhereToSendGroceries(false);
            setChoosenShoppingListIDWhereToSendGroceries("");
            setShoppingListToUpdateWithGroceries({
                authorId: "",
                id: "",
                title: "",
                groceries: [],
                completed: false,
            });
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

    const handleNewListTitle = (e: any) => {
        setNewListTitle(e.target.value);
    };

    return (
        <div className="recipe__details__container">
            <CloseModalButton />
            <div className="option__buttons">
                <button onClick={sendRecipeGroceriesToShoppingList}>
                    {!choosenShoppingListIDWhereToSendGroceries && newListTitle.length === 0 && "Choose shopping list"}
                    {((showRecipeNamesWhereToSendGroceries && choosenShoppingListIDWhereToSendGroceries) || newListTitle.length > 0) &&
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
                                        choosenShoppingListIDWhereToSendGroceries === item.listId && "selected__recipe"
                                    }`}
                                    onClick={() => {
                                        const filtered = shoppingLists.filter((i) => {
                                            return i.id === item.listId;
                                        });
                                        setShoppingListToUpdateWithGroceries(filtered[0]);
                                        setChoosenShoppingListIDWhereToSendGroceries(item.listId);
                                    }}
                                >
                                    {item.listTitle}
                                </div>
                            );
                        })
                    ) : (
                        <div className="new__recipe">
                            <label>
                                Send to new shopping list
                                <input type="text" placeholder="Enter lists title" onChange={handleNewListTitle} value={newListTitle} />
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
                <div>
                    {recipeDetails.recipeTitle} <span className="calories">{recipeDetails.cals} cal. per serving</span>
                </div>
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
