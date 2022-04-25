import { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Grocery, CreateRecipe } from "../models/models";
import { recipesContext } from "./RecipesContext";
import { userContext } from "./UserContext";

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

    const saveRecipe = () => {
        if (user.id && recipeTitle && preperation && cals && recipeGroceriesList.length) {
            const rec = {
                id: uuidv4(),
                authorId: user.id,
                recipeTitle,
                preperation,
                cals,
                recipeGroceriesList,
            };
            updateRecipes(rec);
            setRecipeTitle("");
            setPreperation("");
            setCals("");
            setRecipeGroceriesList([]);
            setRecipeSaved(true);
        } else {
            console.log("Cant save recipe, because there is missing data!");
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
