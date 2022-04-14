export type Grocery = {
    id?: string;
    grocery: string;
    quantity: string;
    unit: string;
    checked: boolean;
};

export interface ShoppingList {
    authorId: string;
    id: string;
    title: string;
    groceries: object[];
    completed: boolean;
}

export interface CreateSList {
    listSaved: boolean;
    listTitle: string;
    groceriesList: object[];
    groceriesNameDB: string[];
    updateTitle: (title: string) => void;
    updateGroceries: (grocery: Grocery) => void;
    deleteGrocery: (id: string) => void;
    saveSList: () => void;
    hideListIsSavedView: () => void;
}

export type UserData = {
    id: string;
    username: string;
    email: string;
    password: string;
    status: boolean;
};
export interface User {
    user: UserData;
    updateUser: (user: UserData, login?: boolean) => void;
}

export interface Recipe {
    authorId?: string;
    id?: string;
    recipeTitle: string;
    preperation: string;
    cals: string;
    recipeGroceriesList: Grocery[];
}

export interface CreateRecipe extends Recipe {
    recipeSaved: boolean;
    updateRecipeTitle: (title: string) => void;
    updatePreperation: (title: string) => void;
    updateCals: (title: string) => void;
    updateRecipeGroceries: (grocery: Grocery) => void;
    saveRecipe: () => void;
    deleteGroceryFromRecipe: (id: string) => void;
    hideRecipeSavedView: () => void;
}
