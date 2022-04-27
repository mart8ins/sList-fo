import { createContext, useState, useEffect, useContext } from "react";
import { Grocery, ShoppingList } from "../models/models";
import { v4 as uuidv4 } from "uuid";
import { CreateSList } from "../models/models";
import { userContext } from "./UserContext";
import { shoppingListsContext } from "./ShoppingListsContext";

import axios from "axios";
const serverUrl = "http://localhost:3001/";

export const createSListContext = createContext({} as CreateSList);

const CreateSListContextProvider = ({ children }: { children: any }) => {
    const { user } = useContext(userContext);
    const { updateShoppingLists } = useContext(shoppingListsContext);
    const [listSaved, setListSaved] = useState(false);
    const [listTitle, setListTitle] = useState("");
    const [groceriesList, setGroceriesList] = useState<Grocery[]>([]);
    const [groceriesNameDB, setGroceriesNameDB] = useState<string[]>([]);

    useEffect(() => {
        fetchGroceryNames();
    }, []);

    const fetchGroceryNames = async () => {
        const res = await axios.get(`${serverUrl}groceries`);
        if (res) {
            setGroceriesNameDB(res.data.allNames);
        }
    };

    const updateTitle = (title: string) => {
        setListTitle(title);
    };

    const updateGroceries = async (grocery: Grocery) => {
        const groc = {
            id: uuidv4(),
            ...grocery,
            checked: false,
            portions: 1,
        };

        // update groceries names
        const res = await axios.post(`${serverUrl}groceries`, { grocery: grocery.grocery });
        if (res.data.status) {
            setGroceriesNameDB(res.data.allNames);
        }
        setGroceriesList([groc, ...groceriesList]);
    };

    const deleteGrocery = (id: string) => {
        const newArr = groceriesList.filter((item) => {
            return item.id !== id;
        });
        setGroceriesList(newArr);
    };

    const saveSList = async () => {
        // SAVE LIST TO DB
        if (user.id && listTitle.length > 0 && groceriesList.length > 0) {
            const listToSave: ShoppingList = {
                authorId: user.id,
                title: listTitle,
                groceries: groceriesList,
                completed: false,
            };
            const res = await axios.post(`${serverUrl}shoppingList`, {
                list: listToSave,
                authorId: user.id,
            });
            updateShoppingLists(res.data.allLists.reverse());

            setListSaved(true); // set list as saved to render component after list is saved with options to choose - create more lists all show created list
            setListTitle("");
            setGroceriesList([]);
        }
    };

    // hide list creation success component when modal is closed
    const hideListIsSavedView = () => {
        setListSaved(false);
    };

    const clearInputs = () => {
        setListTitle("");
        setGroceriesList([]);
    };

    return (
        <createSListContext.Provider
            value={{
                listSaved,
                listTitle,
                groceriesList,
                groceriesNameDB,
                updateTitle,
                updateGroceries,
                deleteGrocery,
                saveSList,
                hideListIsSavedView,
                clearInputs,
            }}
        >
            {children}
        </createSListContext.Provider>
    );
};

export default CreateSListContextProvider;
