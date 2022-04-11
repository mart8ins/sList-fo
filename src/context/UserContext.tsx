import { createContext, useState } from "react";
import { UserData } from "../models/models";
import { User } from "../models/models";

export const userContext = createContext({} as User);

function UserContextProvider({ children }: { children: any }) {
    const [user, setUser] = useState({
        id: "",
        username: "",
        email: "",
        password: "",
        status: false,
    });

    const updateUser = (user: UserData, login?: boolean) => {
        if (login) {
            // call to backend un kontkstā nostoro tikai, ja ir ok response
            setUser({
                id: "1",
                username: "",
                email: user.email,
                password: user.password,
                status: user.status,
            });
        } else {
            // call to backend un kontkstā nostoro tikai, ja ir ok response
            setUser({
                id: "1",
                username: user.username,
                email: user.email,
                password: user.password,
                status: user.status,
            });
        }
    };
    console.log(user, "kontekstā user");
    return (
        <userContext.Provider
            value={{
                user,
                updateUser,
            }}
        >
            {children}
        </userContext.Provider>
    );
}

export default UserContextProvider;
