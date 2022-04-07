import { createContext, useState, useEffect } from "react";
import { Grocery, ShoppingList } from "../models/models";
import { v4 as uuidv4 } from "uuid";

interface CreateSList {
    listSaved: boolean;
    listTitle: string;
    groceriesList: object[];
    groceriesNameDB: string[];
    updateTitle: (title: string) => void;
    updateGroceries: (grocery: Grocery) => void;
    deleteGrocery: (id: string) => void;
    saveSList: () => void;
}

export const createSListContext = createContext({} as CreateSList);

const CreateSListContextProvider = ({ children }: { children: any }) => {
    const [listSaved, setlistSaved] = useState(false);
    const [listTitle, setListTitle] = useState("");
    const [groceriesList, setGroceriesList] = useState<Grocery[]>([]);
    const [groceriesNameDB, setGroceriesNameDB] = useState<string[]>([]);

    const updateTitle = (title: string) => {
        setListTitle(title);
    };

    const updateGroceries = (grocery: Grocery) => {
        const groc = {
            id: uuidv4(),
            ...grocery,
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

    // pirmais app renders
    useEffect(() => {
        // GET GROCERY NAMES FROM DB
        // **************************
        const result = ["Piens", "Maize", "Griķi", "Avokado"];
        setGroceriesNameDB(result);
    }, []);

    const saveSList = () => {
        // SAVE LIST TO DB
        // **************************
        const listToSave: ShoppingList = {
            id: uuidv4(),
            title: listTitle,
            groceries: groceriesList,
        };
        setlistSaved(true); // set list as saved to render component after list is saved with options to choose - create more lists all show created list
        setListTitle("");
        setGroceriesList([]);
        // CALL TO BACKEND
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
            }}
        >
            {children}
        </createSListContext.Provider>
    );
};

export default CreateSListContextProvider;
