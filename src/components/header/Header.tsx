import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

type Props = {};

const Header = (props: Props) => {
    const [auth, setAuth] = useState(true);
    // const auth = true;
    const recipesLength = true;
    const shoppingListLength = true;
    const activeShoppingList = true;

    const signIn = () => {
        setAuth(!auth);
    };

    return (
        <div className="header">
            <div className="top">
                <div></div>
                <div>
                    <Link to="/">S-list</Link>
                </div>
                <div className="auth__false">
                    {auth ? (
                        <Link onClick={signIn} to="/">
                            Logout
                        </Link>
                    ) : (
                        <Link to="auth">Sign in</Link>
                    )}
                </div>
            </div>

            {auth && (
                <div className="bottom">
                    {recipesLength && <Link to="recipes">Recipes</Link>}
                    {shoppingListLength && (
                        <Link to="s-list">Shopping list</Link>
                    )}
                    {activeShoppingList && (
                        <Link to="s-list">Active shopping list</Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;
