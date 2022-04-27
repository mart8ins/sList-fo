import { createContext, useEffect, useState } from "react";
import { UserSignInData } from "../models/models";
import { User } from "../models/models";
import { setLocalStorage } from "../components/utils/setLocalStorage";

import axios from "axios";

type UserToSave = {
    id: string;
    email: string;
    status: boolean;
};

const serverUrl = "http://localhost:3001/";

export const userContext = createContext({} as User);

function UserContextProvider({ children }: { children: any }) {
    const [user, setUser] = useState({
        id: "",
        email: "",
        status: false,
    });
    const [activeLink, setActiveLink] = useState("");
    const [authError, setauthError] = useState("");
    const updateUser = async (user: UserSignInData, login?: boolean) => {
        const res = await axios.post(`${serverUrl}user`, {
            user: {
                email: user.email,
                password: user.password,
                action: login,
            },
        });

        if (res.status === 200 && res.data.status) {
            const userToSave: UserToSave = {
                id: res.data.userId, // get from db user ID
                email: user.email,
                status: res.data.status,
            };
            setUser(userToSave);
            setLocalStorage("set", "sUser", userToSave);
            // localStorage.setItem("sUser", JSON.stringify(userToSave));
        } else {
            setauthError(res.data.message);
        }
    };

    const signout = () => {
        setUser({
            id: "",
            email: "",
            status: false,
        });
        setLocalStorage("remove", "sUser");
        setauthError("");
    };

    const changeActiveLink = (type: string) => {
        setActiveLink(type);
    };

    useEffect(() => {
        // check local storage if there is user data - then set up state, on app refresh user auth is not lost
        const userExists = setLocalStorage("get", "sUser");
        if (userExists) {
            setUser({
                id: userExists.id,
                email: userExists.email,
                status: userExists.status,
            });
        }
    }, []);

    return (
        <userContext.Provider
            value={{
                user,
                updateUser,
                changeActiveLink,
                activeLink,
                authError,
                signout,
            }}
        >
            {children}
        </userContext.Provider>
    );
}

export default UserContextProvider;
