import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../../context/UserContext";
import { createSListContext } from "../../context/CreateSListContext";
import { useNavigate } from "react-router-dom";
import { createRecipeContext } from "../../context/CreateRecipeContext";
import { modalContext } from "../../context/ModalContext";
import { shoppingListsContext } from "../../context/ShoppingListsContext";
import { recipesContext } from "../../context/RecipesContext";

const Header = () => {
    const navigate = useNavigate();
    const [listIsPending, setListIsPending] = useState(false);
    const [recipeIsPending, setRecipeIsPending] = useState(false);

    const { user, activeLink, changeActiveLink, signout } = useContext(userContext);
    const { recipes } = useContext(recipesContext);
    const { shoppingLists } = useContext(shoppingListsContext);
    const { openModal } = useContext(modalContext);
    const { listTitle, groceriesList } = useContext(createSListContext);
    const { recipeTitle, preperation, cals, recipeGroceriesList } = useContext(createRecipeContext);

    useEffect(() => {
        if (listTitle.length > 0 || groceriesList.length > 0) {
            setListIsPending(true);
        } else {
            setListIsPending(false);
        }

        if (recipeTitle.length > 0 || preperation.length > 0 || cals.length > 0 || recipeGroceriesList.length > 0) {
            setRecipeIsPending(true);
        } else {
            setRecipeIsPending(false);
        }
    }, [listTitle, groceriesList, recipeTitle, preperation, cals, recipeGroceriesList]);

    const logOut = () => {
        signout();
        navigate("/");
    };

    return (
        <div>
            <div className="header">
                <div className="top">
                    <div></div>
                    <div>
                        <Link to="/" onClick={() => changeActiveLink("")}>
                            S-list{" "}
                            {(activeLink === "recipes" || activeLink === "shopping-list") && (
                                <span>
                                    <FontAwesomeIcon className="icon" icon={faCirclePlus} />
                                </span>
                            )}
                        </Link>
                    </div>
                    <div className="auth__false">
                        {user.status ? (
                            <Link
                                onClick={() => {
                                    logOut();
                                    changeActiveLink("");
                                }}
                                to="/"
                            >
                                Logout
                            </Link>
                        ) : // <Link to="auth">Sign in</Link>
                        null}
                    </div>
                </div>

                {user.status && (recipes.length > 0 || shoppingLists.length > 0) && (
                    <div className="bottom">
                        {recipes.length > 0 && (
                            <NavLink
                                onClick={() => changeActiveLink("recipes")}
                                className={`navLinks ${activeLink === "recipes" && "active__link"}`}
                                to="/recipes"
                            >
                                Recipes
                            </NavLink>
                        )}
                        {shoppingLists.length > 0 && (
                            <NavLink
                                onClick={() => changeActiveLink("shopping-list")}
                                className={`navLinks ${activeLink === "shopping-list" && "active__link"}`}
                                to="/shopping-list"
                            >
                                Shopping lists
                            </NavLink>
                        )}
                        {listIsPending && <button onClick={() => openModal("s-list")}>Finish your list</button>}
                        {recipeIsPending && <button onClick={() => openModal("recipe")}>Finish your recipe</button>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
