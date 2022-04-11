import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const createRecipeContext = createContext({});

const CreateRecipeContextProvider = ({ children }: { children: any }) => {
    return (
        <createRecipeContext.Provider value={{}}>
            {children}
        </createRecipeContext.Provider>
    );
};

export default CreateRecipeContextProvider;
