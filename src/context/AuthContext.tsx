import { createContext, useState } from "react";

type UserData = {
    username: string;
    email: string;
    password: string;
    status: boolean;
};
interface User {
    user: UserData;
    updateUser: (user: UserData, login?: boolean) => void;
}

export const userContext = createContext({} as User);

function AuthContext({ children }: { children: any }) {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        status: true,
    });

    const updateUser = (user: UserData, login?: boolean) => {
        if (login) {
            // call to backend un kontkstā nostoro tikai, ja ir ok response
            setUser({
                username: "",
                email: user.email,
                password: user.password,
                status: user.status,
            });
        } else {
            // call to backend un kontkstā nostoro tikai, ja ir ok response
            setUser({
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

export default AuthContext;
