import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";
import { ShoppingList, ShoppingLists, ListNames } from "../models/models";
import { serverUrl } from "../vars";

import axios from "axios";

export const shoppingListsContext = createContext({} as ShoppingLists);

const ShoppingListsContextProvider = ({ children }: { children: any }) => {
    const { user } = useContext(userContext);
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
    const [shoppingListNamesForChooseOption, setShoppingListNamesForChooseOption] = useState<ListNames[]>([]);

    useEffect(() => {
        fetchUserShoppingLists(user.id);
    }, [user]);

    useEffect(() => {
        const lists: ListNames[] = [];
        shoppingLists.forEach((item) => {
            lists.push({ listTitle: item.title, listId: item._id! });
        });
        setShoppingListNamesForChooseOption(lists);
    }, [user, shoppingLists]);

    const checkGrocery = async (groceryId: string, inListId?: string) => {
        let listCompleted = true;
        const allListsRef = [...shoppingLists];
        // CHANGE GROCERIES STATUS CHECKED/UNCHECKED
        const indexOfListNeedsUpdate = allListsRef.findIndex((item) => {
            return item._id === inListId;
        });

        const listToChange = allListsRef[indexOfListNeedsUpdate];

        if (listToChange.groceries) {
            listToChange.groceries.forEach((item) => {
                if (item.id === groceryId) {
                    item.checked = !item.checked;
                }
                if (!item.checked) listCompleted = false;
            });
        }

        // CHANGE LIST STATUS - COMPLETED/PENDING DEPENDING IF ALL GROCERIES AR CHECKED OR NOT
        listToChange.completed = listCompleted;
        // UPDATE STATE
        setShoppingLists(allListsRef);
        axios.post(`${serverUrl}sList/shoppingList/update`, { listToChange });
    };

    const checkUnckeckAllList = async (listId: string, toStatus: boolean) => {
        const allListsRef = [...shoppingLists];
        // CHANGE all GROCERIES STATUS TO CHECKED/UNCHECKED
        const indexOfListNeedsUpdate = allListsRef.findIndex((item) => {
            const id = item._id;
            return id === listId;
        });
        const listToChange = allListsRef[indexOfListNeedsUpdate];
        listToChange.groceries.forEach((item) => {
            toStatus ? (item.checked = true) : (item.checked = false);
        });
        // CHANGE LIST STATUS - COMPLETED/PENDING
        listToChange.completed = !listToChange.completed;
        // UPDATE Shopping lists
        setShoppingLists(allListsRef);
        axios.post(`${serverUrl}sList/shoppingList/update`, { listToChange });
    };

    const deleteShoppingList = async (listId: string) => {
        const res = await axios.post(`${serverUrl}sList/shoppingList/delete`, { listId, authorId: user.id });
        setShoppingLists(res.data.update.reverse());
    };

    const fetchUserShoppingLists = async (id: string) => {
        const res = await axios.get(`${serverUrl}sList/shoppingList`, {
            params: {
                authorId: id,
            },
        });
        setShoppingLists(res.data.lists.reverse());
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
