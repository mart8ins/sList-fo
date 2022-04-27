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

    // pirmais app renders
    useEffect(() => {
        // GET GROCERY NAMES FROM DB
        // **************************
        const result = ["Piens", "Maize", "Griķi", "Avokado"];
        setGroceriesNameDB(result);
    }, []);

    const updateTitle = (title: string) => {
        setListTitle(title);
    };

    const updateGroceries = (grocery: Grocery) => {
        const groc = {
            id: uuidv4(),
            ...grocery,
            checked: false,
            portions: 1,
        };
        // update groceries names
        const name = grocery.grocery;
        const newArr = [name, ...groceriesNameDB];
        setGroceriesNameDB([...new Set(newArr)]);
        // SET NEW GROCERIE NAME TO DB
        // *************************
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
            });
            updateShoppingLists(res.data.allLists.reverse());

            setListSaved(true); // set list as saved to render component after list is saved with options to choose - create more lists all show created list
            setListTitle("");
            setGroceriesList([]);
        } else {
            console.log("Cant save shopping list because data is missing");
        }
    };

    // hide list creation success component when modal is closed
    const hideListIsSavedView = () => {
        setListSaved(false);
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
            }}
        >
            {children}
        </createSListContext.Provider>
    );
};

export default CreateSListContextProvider;
