import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { userContext } from "../../context/UserContext";
import { createSListContext } from "../../context/CreateSListContext";
import { useNavigate } from "react-router-dom";
import { createRecipeContext } from "../../context/CreateRecipeContext";
import { modalContext } from "../../context/ModalContext";
import { shoppingListsContext } from "../../context/ShoppingListsContext";

const Header = () => {
    // from db
    const recipesLength = true;
    const { shoppingLists } = useContext(shoppingListsContext);

    const navigate = useNavigate();
    const [listIsPending, setListIsPending] = useState(false);
    const [recipeIsPending, setRecipeIsPending] = useState(false);

    const { user, updateUser, activeLink, changeActiveLink } =
        useContext(userContext);
    const { openModal } = useContext(modalContext);
    const { listTitle, groceriesList } = useContext(createSListContext);
    const { recipeTitle, preperation, cals, recipeGroceriesList } =
        useContext(createRecipeContext);

    useEffect(() => {
        if (listTitle.length > 0 || groceriesList.length > 0) {
            setListIsPending(true);
        } else {
            setListIsPending(false);
        }

        if (
            recipeTitle.length > 0 ||
            preperation.length > 0 ||
            cals.length > 0 ||
            recipeGroceriesList.length > 0
        ) {
            setRecipeIsPending(true);
        } else {
            setRecipeIsPending(false);
        }
    }, [
        listTitle,
        groceriesList,
        recipeTitle,
        preperation,
        cals,
        recipeGroceriesList,
    ]);

    const signOut = () => {
        updateUser({
            id: "",
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
                    <Link to="/" onClick={() => changeActiveLink("")}>
                        S-list
                    </Link>
                </div>
                <div className="auth__false">
                    {user.status ? (
                        <Link
                            onClick={() => {
                                signOut();
                                changeActiveLink("");
                            }}
                            to="/"
                        >
                            Logout
                        </Link>
                    ) : (
                        <Link to="auth">Sign in</Link>
                    )}
                </div>
            </div>

            {user.status && (
                <div className="bottom">
                    {recipesLength && (
                        <NavLink
                            onClick={() => changeActiveLink("recipes")}
                            className={`navLinks ${
                                activeLink === "recipes" && "active__link"
                            }`}
                            to="/recipes"
                        >
                            Recipes
                        </NavLink>
                    )}
                    {shoppingLists.length > 0 && (
                        <NavLink
                            onClick={() => changeActiveLink("shopping-list")}
                            className={`navLinks ${
                                activeLink === "shopping-list" && "active__link"
                            }`}
                            to="/shopping-list"
                        >
                            Shopping lists
                        </NavLink>
                    )}
                    {listIsPending && (
                        <button onClick={() => openModal("s-list")}>
                            Finish your list
                        </button>
                    )}
                    {recipeIsPending && (
                        <button onClick={() => openModal("recipe")}>
                            Finish your recipe
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;
