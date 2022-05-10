import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { modalContext } from "../../context/ModalContext";
import { shoppingListsContext } from "../../context/ShoppingListsContext";
import ModalOutput from "../landing/components/components/ModalOutput";
import "./sList.css";

const SList = () => {
    const { modalIsOpen, openModal } = useContext(modalContext);
    const { shoppingLists } = useContext(shoppingListsContext);

    return (
        <div className="all__lists__container">
            {modalIsOpen && <ModalOutput />}

            {shoppingLists.length ? (
                shoppingLists.map((item, i) => {
                    const id = item._id;
                    console.log(id);
                    return (
                        <div
                            onClick={() => openModal("list-details", id)}
                            key={id}
                            className={`shopping__list ${!item.completed && "list__unfinished"}`}
                        >
                            <div className="title">{item.title}</div>
                            <div className="options">
                                <div>{item.completed ? "Completed" : "Pending"}</div>
                                <div>{`Groceries in list: ${item.groceries.length}`}</div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
};

export default SList;
