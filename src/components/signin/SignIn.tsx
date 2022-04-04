import React, { useState } from "react";
import "./signin.css";

function SignIn() {
    const [login, setLogin] = useState(true); // choosen option for auth

    const canLogin = false; // all data is filled

    const error = false; // if data is not valid
    const errorMessage = "Invalid input, please check again!";

    const signIn = () => {
        console.log("sign in");
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
                            <input type="email" placeholder="email" />
                            <input type="password" placeholder="password" />
                        </div>
                    ) : (
                        <div
                            className={`input__container ${
                                !login && "active__auth"
                            }`}
                        >
                            <input type="text" placeholder="username" />
                            <input type="email" placeholder="email" />
                            <input type="password" placeholder="password" />
                        </div>
                    )}
                    <div className="button__container">
                        <div>{error && errorMessage}</div>
                        <button
                            className={`${canLogin && "inputs__are"}`}
                            disabled={!canLogin}
                            type="button"
                            onClick={signIn}
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
