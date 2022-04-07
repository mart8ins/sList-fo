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
