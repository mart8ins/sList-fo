import { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Grocery, CreateRecipe, Recipe } from "../models/models";
import { recipesContext } from "./RecipesContext";
import { userContext } from "./UserContext";
import { serverUrl } from "../vars";

import axios from "axios";

export const createRecipeContext = createContext({} as CreateRecipe);

const CreateRecipeContextProvider = ({ children }: { children: any }) => {
    const { user } = useContext(userContext);
    const { updateRecipes } = useContext(recipesContext);
    const [recipeSaved, setRecipeSaved] = useState(false);

    const [recipeTitle, setRecipeTitle] = useState("");
    const [preperation, setPreperation] = useState("");
    const [cals, setCals] = useState("");
    const [recipeGroceriesList, setRecipeGroceriesList] = useState<Grocery[]>([]);

    const updateRecipeTitle = (title: string) => {
        setRecipeTitle(title);
    };
    const updatePreperation = (preperation: string) => {
        setPreperation(preperation);
    };
    const updateCals = (cals: string) => {
        setCals(cals);
    };
    const updateRecipeGroceries = (grocery: Grocery) => {
        const gro = {
            id: uuidv4(),
            ...grocery,
            checked: false,
            recipeTitle,
            portions: 1,
        };
        setRecipeGroceriesList([gro, ...recipeGroceriesList]);
    };

    const saveRecipe = async () => {
        if (user.id && recipeTitle && preperation && cals && recipeGroceriesList.length) {
            const recipeToSave: Recipe = {
                authorId: user.id,
                recipeTitle,
                preperation,
                cals,
                recipeGroceriesList,
            };
            const res = await axios.post(`${serverUrl}recipe`, {
                recipeToSave,
                authorId: user.id,
            });

            updateRecipes(res.data.update);
            setRecipeTitle("");
            setPreperation("");
            setCals("");
            setRecipeGroceriesList([]);
            setRecipeSaved(true);
        }
    };

    const deleteGroceryFromRecipe = (id: string) => {
        const update = recipeGroceriesList.filter((grocery) => {
            return grocery.id !== id;
        });
        setRecipeGroceriesList(update);
    };

    const hideRecipeSavedView = () => {
        setRecipeSaved(false);
    };

    return (
        <createRecipeContext.Provider
            value={{
                recipeSaved,
                recipeTitle,
                preperation,
                cals,
                recipeGroceriesList,
                updateRecipeTitle,
                updatePreperation,
                updateCals,
                updateRecipeGroceries,
                saveRecipe,
                deleteGroceryFromRecipe,
                hideRecipeSavedView,
            }}
        >
            {children}
        </createRecipeContext.Provider>
    );
};

export default CreateRecipeContextProvider;
