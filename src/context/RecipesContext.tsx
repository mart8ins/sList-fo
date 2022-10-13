import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";
import { Recipe } from "../models/models";
import { serverUrl } from "../vars";

import axios from "axios";

interface Recipes {
    recipes: Recipe[];
    fetchUserRecipes: (userId: string) => void;
    deleteRecipe: (recipeId: string) => void;
    updateRecipes: (recipes: Recipe[]) => void;
}

export const recipesContext = createContext({} as Recipes);

const RecipesContextProvider = ({ children }: { children: any }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { user } = useContext(userContext);

    useEffect(() => {
        fetchUserRecipes(user.id);
    }, [user]);

    const deleteRecipe = async (recipeId: string) => {
        const filtered = recipes.filter((rec) => {
            return rec._id !== recipeId;
        });
        setRecipes(filtered);
        axios.post(`${serverUrl}sList/recipe/delete`, {
            recipeId: recipeId,
            authorId: user.id,
        });
    };

    const updateRecipes = (recipes: Recipe[]) => {
        setRecipes(recipes);
    };

    const fetchUserRecipes = async (userId: string) => {
        const res = await axios.get(`${serverUrl}sList/recipe`, {
            params: {
                authorId: userId,
            },
        });
        setRecipes(res.data.update);
    };

    return (
        <recipesContext.Provider
            value={{
                recipes,
                fetchUserRecipes,
                deleteRecipe,
                updateRecipes,
            }}>
            {children}
        </recipesContext.Provider>
    );
};

export default RecipesContextProvider;
