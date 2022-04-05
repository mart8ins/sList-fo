import { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { userContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(userContext);

    const recipesLength = true;
    const shoppingListLength = true;
    const activeShoppingList = true;

    const signOut = () => {
        updateUser({
            username: "",
            email: "",
            password: "",
            status: false,
        });
        navigate("/");
    };

    return (
        <div className="header">
            <div className="top">
                <div></div>
                <div>
                    <Link to="/">S-list</Link>
                </div>
                <div className="auth__false">
                    {user.status ? (
                        <Link onClick={signOut} to="/">
                            Logout
                        </Link>
                    ) : (
                        <Link to="auth">Sign in</Link>
                    )}
                </div>
            </div>

            {user.status && (
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
