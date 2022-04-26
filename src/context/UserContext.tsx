import { createContext, useState } from "react";
import { UserData } from "../models/models";
import { User } from "../models/models";

import axios from "axios";

const serverUrl = "http://localhost:3001/";

export const userContext = createContext({} as User);

function UserContextProvider({ children }: { children: any }) {
    const [user, setUser] = useState({
        id: "",
        email: "",
        password: "",
        status: false,
    });
    const [activeLink, setActiveLink] = useState("");
    const [authError, setauthError] = useState("");
    console.log(authError);

    const updateUser = async (user: UserData, login?: boolean) => {
        const res = await axios.post(`${serverUrl}user`, {
            user: {
                email: user.email,
                password: user.password,
                action: login,
            },
        });
        console.log(res);
        if (res.status === 200 && res.data.status) {
            setUser({
                id: res.data.userId, // get from db user ID
                email: user.email,
                password: user.password,
                status: res.data.status,
            });
        } else {
            setauthError(res.data.message);
        }
    };

    const signout = () => {
        setUser({
            id: "",
            email: "",
            password: "",
            status: false,
        });
        setauthError("");
    };

    const changeActiveLink = (type: string) => {
        setActiveLink(type);
    };

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
