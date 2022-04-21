import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";
import { ShoppingList, ShoppingLists, ListNames } from "../models/models";

export const shoppingListsContext = createContext({} as ShoppingLists);

const ShoppingListsContextProvider = ({ children }: { children: any }) => {
    const { user } = useContext(userContext);
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
    const [
        shoppingListNamesForChooseOption,
        setShoppingListNamesForChooseOption,
    ] = useState<ListNames[]>([]);

    useEffect(() => {
        fetchUserShoppingLists(user.id);
    }, [user]);

    useEffect(() => {
        const lists: ListNames[] = [];
        shoppingLists.forEach((item) => {
            lists.push({ listTitle: item.title, listId: item.id });
        });
        setShoppingListNamesForChooseOption(lists);
    }, [user, shoppingLists]);

    const checkGrocery = (groceryId: string, inListId?: string) => {
        let listCompleted = true;
        const allListsRef = [...shoppingLists];
        // CHANGE GROCERIES STATUS CHECKED/UNCHECKED
        const indexOfListNeedsUpdate = allListsRef.findIndex((item) => {
            return item.id === inListId;
        });
        const listToChange = allListsRef[indexOfListNeedsUpdate];
        listToChange.groceries.forEach((item) => {
            if (item.id === groceryId) {
                item.checked = !item.checked;
            }
            if (!item.checked) listCompleted = false;
        });
        // CHANGE LIST STATUS - COMPLETED/PENDING DEPENDING IF ALL GROCERIES AR CHECKED OR NOT
        listToChange.completed = listCompleted;
        // UPDATE STATE
        setShoppingLists([...allListsRef]);
    };

    const checkUnckeckAllList = (listId: string, toStatus: boolean) => {
        const allListsRef = [...shoppingLists];
        // CHANGE all GROCERIES STATUS TO CHECKED/UNCHECKED
        const indexOfListNeedsUpdate = allListsRef.findIndex((item) => {
            return item.id === listId;
        });
        const listToChange = allListsRef[indexOfListNeedsUpdate];
        listToChange.groceries.forEach((item) => {
            toStatus ? (item.checked = true) : (item.checked = false);
        });
        // CHANGE LIST STATUS - COMPLETED/PENDING
        listToChange.completed = !listToChange.completed;
        allListsRef[indexOfListNeedsUpdate] = listToChange;
        // UPDATE STATE
        setShoppingLists([...allListsRef]);
    };

    const deleteShoppingList = (listId: string) => {
        const allListsRef = [...shoppingLists];
        const updatedList = allListsRef.filter((item) => {
            return item.id !== listId;
        });
        setShoppingLists(updatedList);
    };

    const fetchUserShoppingLists = (id: string) => {
        // setShoppingLists([
        //     {
        //         authorId: "7",
        //         id: "2",
        //         title: "Mans pirmais shopping lists",
        //         groceries: [
        //             {
        //                 id: "222",
        //                 grocery: "Maize",
        //                 quantity: "2",
        //                 unit: "pc",
        //                 checked: false,
        //             },
        //             {
        //                 id: "333",
        //                 grocery: "Piens",
        //                 quantity: "1",
        //                 unit: "l",
        //                 checked: false,
        //             },
        //             {
        //                 id: "444",
        //                 grocery: "Griķi",
        //                 quantity: "2",
        //                 unit: "pc",
        //                 checked: false,
        //             },
        //             {
        //                 id: "333sdsd",
        //                 grocery: "Alus",
        //                 quantity: "1",
        //                 unit: "pc",
        //                 checked: false,
        //                 recipeTitle: "Pālis",
        //             },
        //             {
        //                 id: "4sdsd44",
        //                 grocery: "Šnabis",
        //                 quantity: "2",
        //                 unit: "pc",
        //                 checked: false,
        //                 recipeTitle: "Pālis",
        //             },
        //         ],
        //         completed: false,
        //     },
        //     {
        //         authorId: "7",
        //         id: "4",
        //         title: "Piektdienai",
        //         groceries: [
        //             {
        //                 id: "777",
        //                 grocery: "Alus",
        //                 quantity: "11",
        //                 unit: "pc",
        //                 checked: true,
        //             },
        //             {
        //                 id: "555",
        //                 grocery: "Sula",
        //                 quantity: "1",
        //                 unit: "l",
        //                 checked: true,
        //             },
        //         ],
        //         completed: true,
        //     },
        // ]);
        // call to backend with user id and returning users shopping lists
        // console.log("Fetching users shopping lists");
    };

    const updateShoppingLists = (listUpdate: ShoppingList[]) => {
        setShoppingLists(listUpdate);
    };
    return (
        <shoppingListsContext.Provider
            value={{
                shoppingLists,
                fetchUserShoppingLists,
                checkGrocery,
                checkUnckeckAllList,
                deleteShoppingList,
                shoppingListNamesForChooseOption,
                updateShoppingLists,
            }}
        >
            {children}
        </shoppingListsContext.Provider>
    );
};

export default ShoppingListsContextProvider;
