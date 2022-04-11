import { useState, useContext, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import { userContext } from "../../context/UserContext";
import { ValidateForm } from "./Validate";

function SignIn() {
    const navigate = useNavigate();
    const { updateUser } = useContext(userContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login, setLogin] = useState(true); // choosen option for auth

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const canLogin = true; // all data is filled

    const signInUser = () => {
        // VALIDĀCIJA USERA INPUTAM, PĒC KURAS IR TRUE UN VAR IET TĀLĀK
        const inputValid = ValidateForm(username, email, password, login);

        // CALL TO BACKEND
        if (inputValid.isValid) {
            setError(false);
            setErrorMessage("");
            if (login) {
                // CALL TO BACKEND
                // ***************
                // CALL TO BACKEND
                // - RESPONSE .....
                updateUser(
                    {
                        id: "",
                        username: username,
                        email: email,
                        password: password,
                        status: true,
                    },
                    true
                );
                navigate("/");
            }
            if (!login && username) {
                // CALL TO BACKEND
                // ***************
                // CALL TO BACKEND
                // - RESPONSE .....
                updateUser(
                    {
                        id: "",
                        username: username,
                        email: email,
                        password: password,
                        status: true,
                    },
                    false
                );
                navigate("/");
            }
        } else {
            setError(true);
            setErrorMessage(inputValid.errorMessage);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "username") {
            setUsername(event.target.value);
        }
        if (event.target.name === "email") {
            setEmail(event.target.value);
        }
        if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    };

    return (
        <div className="signin__container">
            <div className="signin__form">
                <div className="signin__titles">
                    <div>
                        <button
                            className={`${login && "active__auth"}`}
                            onClick={() => setLogin(true)}
                        >
                            Login
                        </button>
                    </div>
                    <div>
                        <button
                            className={`${!login && "active__auth"}`}
                            onClick={() => setLogin(false)}
                        >
                            Signup
                        </button>
                    </div>
                </div>

                <form>
                    {login ? (
                        <div
                            className={`input__container ${
                                login && "active__auth"
                            }`}
                        >
                            <input
                                onChange={handleChange}
                                name="email"
                                type="email"
                                value={email}
                                placeholder="email"
                            />
                            <input
                                onChange={handleChange}
                                name="password"
                                type="password"
                                value={password}
                                placeholder="password"
                            />
                        </div>
                    ) : (
                        <div
                            className={`input__container ${
                                !login && "active__auth"
                            }`}
                        >
                            <input
                                onChange={handleChange}
                                name="username"
                                type="text"
                                value={username}
                                placeholder="username"
                            />
                            <input
                                onChange={handleChange}
                                name="email"
                                type="email"
                                value={email}
                                placeholder="email"
                            />
                            <input
                                onChange={handleChange}
                                name="password"
                                type="password"
                                value={password}
                                placeholder="password"
                            />
                        </div>
                    )}
                    <div className="button__container">
                        <div>{error && errorMessage}</div>
                        <button
                            className={`${canLogin && "inputs__are"}`}
                            disabled={!canLogin}
                            type="button"
                            onClick={signInUser}
                        >
                            Enter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
