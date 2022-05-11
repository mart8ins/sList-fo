import { useState, useContext, useEffect } from "react";
import { recipesContext } from "../../../context/RecipesContext";
import { modalContext } from "../../../context/ModalContext";
import { shoppingListsContext } from "../../../context/ShoppingListsContext";
import { Recipe, ShoppingList } from "../../../models/models";
import CloseModalButton from "../../landing/components/components/shared/closeModalButton/CloseModalButton";
import SingleListItem from "../../landing/components/components/shared/singleListItem/SingleListItem";
import "./recipeDetails.css";
import { serverUrl } from "../../../vars";

import axios from "axios";
import { userContext } from "../../../context/UserContext";

type Props = {
    recipeId: string;
};

function RecipeDetails({ recipeId }: Props) {
    const { user } = useContext(userContext);
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
            const id = recipe._id;
            return id === recipeId;
        });
        setRecipeDetails(filtered[0]);
    }, [recipeId, recipes]);

    const sendRecipeGroceriesToShoppingList = async () => {
        const groceries = [...recipeDetails.recipeGroceriesList]; // receptes groceries arrays
        // OPEN OPTION TO CHOOSE SHOPPING LIST WHERE TO SEND GROCERIES
        if (!showRecipeNamesWhereToSendGroceries) {
            setShowRecipeNameWhereToSendGroceries(true);
        }
        // SEND GROCERIES TO CHOOSEN SHOPPING LIST
        if (showRecipeNamesWhereToSendGroceries && choosenShoppingListIDWhereToSendGroceries) {
            const updatedObj: ShoppingList = {
                authorId: shoppingListToUpdateWithGroceries.authorId,
                _id: shoppingListToUpdateWithGroceries._id,
                title: shoppingListToUpdateWithGroceries.title,
                completed: false,
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

            const res = await axios.post(`${serverUrl}sList/shoppingList/update`, {
                listToChange: updatedObj,
            });
            updateShoppingLists(res.data.update);

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

        // create new shopping list with recipe details
        if (showRecipeNamesWhereToSendGroceries && newListTitle.length > 0) {
            const newSList = {
                authorId: user.id,
                title: newListTitle,
                groceries,
                completed: false,
            };

            const res = await axios.post(`${serverUrl}sList/shoppingList`, {
                list: newSList,
            });
            updateShoppingLists(res.data.allLists);
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
                <button
                    onClick={sendRecipeGroceriesToShoppingList}
                    className={`choose__button ${
                        ((showRecipeNamesWhereToSendGroceries && choosenShoppingListIDWhereToSendGroceries) || newListTitle.length > 0) &&
                        "choosen__button"
                    }`}
                >
                    {!choosenShoppingListIDWhereToSendGroceries && newListTitle.length === 0 && "Choose shopping list"}
                    {((showRecipeNamesWhereToSendGroceries && choosenShoppingListIDWhereToSendGroceries) || newListTitle.length > 0) &&
                        "Send groceries to shopping list"}
                </button>
                <button
                    className="delete__button"
                    onClick={() => {
                        deleteRecipe(recipeDetails._id!);
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
                                            const id = i._id;
                                            return id === item.listId;
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
                            listId={recipeDetails._id}
                        />
                    );
                })}
        </div>
    );
}

export default RecipeDetails;
