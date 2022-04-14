import { useContext } from "react";
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
            {shoppingLists.map((item) => {
                return (
                    <div
                        onClick={() => openModal("list-details", item.id)}
                        key={item.id}
                        className={`shopping__list ${
                            !item.completed && "list__unfinished"
                        }`}
                    >
                        <div className="title">{item.title}</div>
                        <div className="options">
                            <div>
                                {item.completed ? "Completed" : "Pending"}
                            </div>
                            <div>{`Groceries in list: ${item.groceries.length}`}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SList;
