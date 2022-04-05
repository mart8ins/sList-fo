import { useState, useContext, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import { userContext } from "../../context/AuthContext";

function SignIn() {
    const navigate = useNavigate();
    const { updateUser } = useContext(userContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login, setLogin] = useState(true); // choosen option for auth

    const canLogin = true; // all data is filled

    const error = false; // if data is not valid
    const errorMessage = "Invalid input, please check again!";

    const signInUser = () => {
        // CALL TO BACKEND
        const status = true;
        if (email && password) {
            if (login) {
                updateUser(
                    {
                        username: username,
                        email: email,
                        password: password,
                        status: status,
                    },
                    true
                );
                navigate("/");
            }
            if (!login && username) {
                updateUser(
                    {
                        username: username,
                        email: email,
                        password: password,
                        status: status,
                    },
                    false
                );
                navigate("/");
            }
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
