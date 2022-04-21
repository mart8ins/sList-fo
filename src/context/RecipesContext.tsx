import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";
import { Recipe } from "../models/models";

interface Recipes {
    recipes: Recipe[];
    fetchUserRecipes: (userId: string) => void;
    deleteRecipe: (recipeId: string) => void;
    updateRecipes: (recipe: Recipe) => void;
}

export const recipesContext = createContext({} as Recipes);

const RecipesContextProvider = ({ children }: { children: any }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { user } = useContext(userContext);

    useEffect(() => {
        fetchUserRecipes(user.id);
    }, [user]);

    const deleteRecipe = (recipeId: string) => {
        const recipesRef = [...recipes];
        const filtered = recipesRef.filter((recipe) => {
            return recipe.id !== recipeId;
        });
        setRecipes(filtered);
    };

    const updateRecipes = (recipe: Recipe) => {
        setRecipes([recipe, ...recipes]);
    };

    const fetchUserRecipes = (userId: string) => {
        // CALL TO BACKEND FOR USER RECIPES
        // setRecipes([
        //     {
        //         authorId: "1",
        //         id: "123",
        //         recipeTitle: "Piektdienas recepte ar saceptu galu",
        //         preperation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        //         molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        //         numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        //         optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        //         obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        //         nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        //         tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
        //         quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
        //         sapiente officiis modi at sunt excepturi expedita sint?`,
        //         cals: "1000",
        //         recipeGroceriesList: [
        //             {
        //                 id: "3210",
        //                 grocery: "Milk",
        //                 quantity: "1",
        //                 unit: "l",
        //                 checked: false,
        //                 recipeTitle: "Piektdienas recepte ar saceptu galu",
        //             },
        //             {
        //                 id: "3310",
        //                 grocery: "Bread",
        //                 quantity: "1",
        //                 unit: "pc",
        //                 checked: false,
        //                 recipeTitle: "Piektdienas recepte ar saceptu galu",
        //             },
        //         ],
        //     },
        //     {
        //         authorId: "1",
        //         id: "123ooo4",
        //         recipeTitle: "Pelmeņi",
        //         preperation: "Sagatavo",
        //         cals: "1300",
        //         recipeGroceriesList: [
        //             {
        //                 id: "32133",
        //                 grocery: "Gala",
        //                 quantity: "200",
        //                 unit: "gr",
        //                 checked: false,
        //                 recipeTitle: "Pelmeņi",
        //             },
        //             {
        //                 id: "331440",
        //                 grocery: "Udens",
        //                 quantity: "1",
        //                 unit: "l",
        //                 checked: false,
        //                 recipeTitle: "Pelmeņi",
        //             },
        //         ],
        //     },
        // ]);
    };

    return (
        <recipesContext.Provider
            value={{
                recipes,
                fetchUserRecipes,
                deleteRecipe,
                updateRecipes,
            }}
        >
            {children}
        </recipesContext.Provider>
    );
};

export default RecipesContextProvider;
