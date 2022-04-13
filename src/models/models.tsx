export type Grocery = {
    id?: string;
    grocery: string;
    quantity: string;
    unit: string;
};

// export interface ShoppingList {
//     id: string;
//     title: string;
//     groceries: object[];
// }

export interface CreateSList {
    // createListModalIsOpen: boolean;
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

export type CreateNewProps = {
    closeModal: (type: string) => void;
    modalContentType: string;
};
