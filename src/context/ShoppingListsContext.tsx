import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";
import { ShoppingList } from "../models/models";

interface ShoppingLists {
    shoppingLists: ShoppingList[];
    fetchUserShoppingLists: (id: string) => void;
    checkGrocery: (groceryId: string, inListId?: string) => void;
    checkUnckeckAllList: (listId: string, toStatus: boolean) => void;
    deleteShoppingList: (listId: string) => void;
}

export const shoppingListsContext = createContext({} as ShoppingLists);

const ShoppingListsContextProvider = ({ children }: { children: any }) => {
    const { user } = useContext(userContext);
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

    useEffect(() => {
        fetchUserShoppingLists(user.id);
    }, [user]);

    const checkGrocery = (groceryId: string, inListId?: string) => {
        let listCompleted = true;
        const allListsRef = [...shoppingLists];

        // CHANGE GROCERIES STATUS CHECKED/UNCHECKED
        const indexOfListNeedsUpdate = allListsRef.findIndex((item) => {
            return item.id === inListId;
        });
        const listToChange = allListsRef.splice(indexOfListNeedsUpdate, 1);
        const groceriesInListToCheck = listToChange[0].groceries;

        groceriesInListToCheck.forEach((item) => {
            if (item.id === groceryId) {
                item.checked = !item.checked;
            }
            if (!item.checked) listCompleted = false;
        });
        // CHANGE LIST STATUS - COMPLETED/PENDING DEPENDING IF ALL GROCERIES AR CHECKED OR NOT
        listToChange[0].completed = listCompleted;

        // UPDATE STATE
        setShoppingLists([...allListsRef, listToChange[0]]);
    };

    const checkUnckeckAllList = (listId: string, toStatus: boolean) => {
        const allListsRef = [...shoppingLists];
        // CHANGE all GROCERIES STATUS TO CHECKED/UNCHECKED
        const indexOfListNeedsUpdate = allListsRef.findIndex((item) => {
            return item.id === listId;
        });
        const listToChange = allListsRef.splice(indexOfListNeedsUpdate, 1);
        const groceriesInListToCheck = listToChange[0].groceries;

        groceriesInListToCheck.forEach((item) => {
            toStatus ? (item.checked = true) : (item.checked = false);
        });
        // CHANGE LIST STATUS - COMPLETED/PENDING
        listToChange[0].completed = !listToChange[0].completed;
        // UPDATE STATE
        setShoppingLists([...allListsRef, listToChange[0]]);
    };

    const deleteShoppingList = (listId: string) => {
        const allListsRef = [...shoppingLists];
        const updatedList = allListsRef.filter((item) => {
            return item.id !== listId;
        });
        setShoppingLists(updatedList);
    };

    const fetchUserShoppingLists = (id: string) => {
        setShoppingLists([
            {
                authorId: "7",
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
                authorId: "7",
                id: "4",
                title: "Piektdienai",
                groceries: [
                    {
                        id: "777",
                        grocery: "Alus",
                        quantity: "11",
                        unit: "pc",
                        checked: true,
                    },
                    {
                        id: "555",
                        grocery: "Sula",
                        quantity: "1",
                        unit: "l",
                        checked: true,
                    },
                ],
                completed: true,
            },
        ]);
        // call to backend with user id and returning users shopping lists
        // console.log("Fetching users shopping lists");
    };
    return (
        <shoppingListsContext.Provider
            value={{
                shoppingLists,
                fetchUserShoppingLists,
                checkGrocery,
                checkUnckeckAllList,
                deleteShoppingList,
            }}
        >
            {children}
        </shoppingListsContext.Provider>
    );
};

export default ShoppingListsContextProvider;
