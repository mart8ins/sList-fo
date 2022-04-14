import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";
import { ShoppingList } from "../models/models";

interface ShoppingLists {
    shoppingLists: ShoppingList[];
    fetchUserShoppingLists: (id: string) => void;
}

export const shoppingListsContext = createContext({} as ShoppingLists);

const ShoppingListsContextProvider = ({ children }: { children: any }) => {
    const { user } = useContext(userContext);
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

    useEffect(() => {
        fetchUserShoppingLists(user.id);
    }, [user]);

    const fetchUserShoppingLists = (id: string) => {
        setShoppingLists([
            {
                authorId: "1",
                id: "2",
                title: "Mans pirmais shopping lists",
                groceries: [
                    {
                        id: "222",
                        grocery: "Maize",
                        quantity: "2",
                        unit: "pc",
                        checked: false,
                    },
                    {
                        id: "333",
                        grocery: "Piens",
                        quantity: "1",
                        unit: "l",
                        checked: false,
                    },
                    {
                        id: "444",
                        grocery: "Griķi",
                        quantity: "2",
                        unit: "pc",
                        checked: false,
                    },
                ],
                completed: false,
            },
            {
                authorId: "2",
                id: "4",
                title: "Piektdienai",
                groceries: [
                    {
                        id: "777",
                        grocery: "Alus",
                        quantity: "11",
                        unit: "pc",
                        checked: false,
                    },
                    {
                        id: "555",
                        grocery: "Sula",
                        quantity: "1",
                        unit: "l",
                        checked: false,
                    },
                ],
                completed: true,
            },
        ]);
        // call to backend with user id and returning users shopping lists
        console.log("Fetching users shopping lists");
    };
    return (
        <shoppingListsContext.Provider
            value={{ shoppingLists, fetchUserShoppingLists }}
        >
            {children}
        </shoppingListsContext.Provider>
    );
};

export default ShoppingListsContextProvider;
