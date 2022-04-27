export type Grocery = {
    id?: string;
    grocery: string;
    quantity: string;
    unit: string;
    checked: boolean;
    recipeTitle?: string;
    portions: number;
};

export interface ShoppingList {
    authorId: string;
    id: string;
    title: string;
    groceries: Grocery[];
    completed: boolean;
}

export interface ShoppingLists {
    shoppingLists: ShoppingList[];
    shoppingListNamesForChooseOption: ListNames[];
    fetchUserShoppingLists: (id: string) => void;
    checkGrocery: (groceryId: string, inListId?: string) => void;
    checkUnckeckAllList: (listId: string, toStatus: boolean) => void;
    deleteShoppingList: (listId: string) => void;
    updateShoppingLists: (listsUpdate: ShoppingList[]) => void;
}

export type ListNames = {
    listTitle: string;
    listId: string;
};

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

export type UserSignInData = {
    email: string;
    password: string;
    status: boolean;
};
export interface User {
    user: {
        id: string;
        email: string;
        status: boolean;
    };
    updateUser: (user: UserSignInData, login?: boolean) => void;
    signout: () => void;
    changeActiveLink: (type: string) => void;
    activeLink: string;
    authError: string;
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
