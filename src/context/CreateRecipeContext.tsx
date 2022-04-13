import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Grocery } from "../models/models";

interface Recipe {
    authorId?: string;
    id?: string;
    recipeTitle: string;
    preperation: string;
    cals: string;
    recipeGroceriesList: Grocery[];
}

interface CreateRecipe extends Recipe {
    recipeSaved: boolean;
    updateRecipeTitle: (title: string) => void;
    updatePreperation: (title: string) => void;
    updateCals: (title: string) => void;
    updateRecipeGroceries: (grocery: Grocery) => void;
    saveRecipe: () => void;
    deleteGroceryFromRecipe: (id: string) => void;
    hideRecipeSavedView: () => void;
}

export const createRecipeContext = createContext({} as CreateRecipe);

const CreateRecipeContextProvider = ({ children }: { children: any }) => {
    const [recipeSaved, setRecipeSaved] = useState(false);
    const [recipeTitle, setRecipeTitle] = useState("");
    const [preperation, setPreperation] = useState("");
    const [cals, setCals] = useState("");
    const [recipeGroceriesList, setRecipeGroceriesList] = useState<Grocery[]>(
        []
    );

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
        };
        setRecipeGroceriesList([gro, ...recipeGroceriesList]);
    };

    const saveRecipe = () => {
        const rec = {
            id: uuidv4(),
            authorId: uuidv4(),
            recipeTitle,
            preperation,
            cals,
            recipeGroceriesList,
        };
        console.log("recepte noseivota");
        // BACKEND - SAVE REC
        setRecipeTitle("");
        setPreperation("");
        setCals("");
        setRecipeGroceriesList([]);
        setRecipeSaved(true);
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
