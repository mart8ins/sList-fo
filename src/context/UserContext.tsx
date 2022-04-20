import { createContext, useState, useEffect } from "react";
import { UserData } from "../models/models";
import { User } from "../models/models";
import { v4 as uuidv4 } from "uuid";

export const userContext = createContext({} as User);

function UserContextProvider({ children }: { children: any }) {
    const [user, setUser] = useState({
        id: "",
        username: "",
        email: "",
        password: "",
        status: true,
    });
    const [activeLink, setActiveLink] = useState("");

    const updateUser = (user: UserData, login?: boolean) => {
        if (login) {
            // call to backend un kontkstā nostoro tikai, ja ir ok response
            setUser({
                id: "1", // get from db user ID
                username: "", // exclude username if only log in
                email: user.email,
                password: user.password,
                status: user.status,
            });
        } else {
            // call to backend un kontkstā nostoro tikai, ja ir ok response
            setUser({
                id: uuidv4(), // set new user id
                username: user.username,
                email: user.email,
                password: user.password,
                status: user.status,
            });
        }
    };

    const changeActiveLink = (type: string) => {
        console.log(window.location.pathname);
        setActiveLink(type);
    };

    return (
        <userContext.Provider
            value={{
                user,
                updateUser,
                changeActiveLink,
                activeLink,
            }}
        >
            {children}
        </userContext.Provider>
    );
}

export default UserContextProvider;
