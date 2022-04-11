export interface Grocery {
    id?: string;
    grocery: string;
    quantity: string;
    unit: string;
}

export interface ShoppingList {
    id: string;
    title: string;
    groceries: object[];
}

export interface CreateSList {
    createListModalIsOpen: boolean;
    listSaved: boolean;
    listTitle: string;
    groceriesList: object[];
    groceriesNameDB: string[];
    updateTitle: (title: string) => void;
    updateGroceries: (grocery: Grocery) => void;
    deleteGrocery: (id: string) => void;
    saveSList: () => void;
    hideListIsSavedView: () => void;
    openCreateListModal: () => void;
    closeCreateListModal: () => void;
}
