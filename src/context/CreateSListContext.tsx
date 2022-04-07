import { createContext, useState, useEffect } from "react";
import { Grocery } from "../models/models";

interface CreateSList {
    listTitle: string;
    groceriesList: object[];
    groceriesNameDB: string[];
    updateTitle: (title: string) => void;
    updateGroceries: (grocery: Grocery) => void;
}

export const createSListContext = createContext({} as CreateSList);

const CreateSListContextProvider = ({ children }: { children: any }) => {
    const [listTitle, setListTitle] = useState("");
    const [groceriesList, setGroceriesList] = useState<Grocery[]>([]);
    const [groceriesNameDB, setGroceriesNameDB] = useState<string[]>([]);

    const updateTitle = (title: string) => {
        setListTitle(title);
    };

    const updateGroceries = (grocery: Grocery) => {
        setGroceriesList([...groceriesList, grocery]);
    };

    // pirmais app renders
    useEffect(() => {
        setGroceriesNameDB(["Piens", "Maize", "Griķi", "Avokado"]);
    }, []);

    // update groceries name, pie katra jauna name
    useEffect(() => {
        // loģika lai updeitotu vārdu db
        setGroceriesNameDB(["Piens", "Maize", "Griķi", "Avokado"]);
    }, [groceriesList]);

    return (
        <createSListContext.Provider
            value={{
                listTitle,
                groceriesList,
                groceriesNameDB,
                updateTitle,
                updateGroceries,
            }}
        >
            {children}
        </createSListContext.Provider>
    );
};

export default CreateSListContextProvider;
