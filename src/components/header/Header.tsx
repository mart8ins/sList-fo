import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { userContext } from "../../context/AuthContext";
import { createSListContext } from "../../context/CreateSListContext";
import { useNavigate } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
    const navigate = useNavigate();
    const [listIsPending, setListIsPending] = useState(false);

    const { user, updateUser } = useContext(userContext);
    const { listTitle, groceriesList, openCreateListModal } =
        useContext(createSListContext);

    useEffect(() => {
        if (listTitle.length > 0 || groceriesList.length > 0) {
            setListIsPending(true);
        } else {
            setListIsPending(false);
        }
    }, [listTitle, groceriesList]);

    const recipesLength = true;
    const shoppingListLength = true;

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
                        <Link to="s-list">Shopping lists</Link>
                    )}
                    {listIsPending && (
                        <button onClick={openCreateListModal}>
                            Finish your list
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;
