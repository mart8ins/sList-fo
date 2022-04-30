import { useContext, useState, useEffect } from "react";
import { shoppingListsContext } from "../../../context/ShoppingListsContext";
import { ShoppingList } from "../../../models/models";
import SingleListItem from "../../landing/components/components/shared/singleListItem/SingleListItem";
import CloseModalButton from "../../landing/components/components/shared/closeModalButton/CloseModalButton";
import "./listDetails.css";
import { modalContext } from "../../../context/ModalContext";

function ListDetails({ listId }: { listId: string }) {
    const [listDetails, setListDetails] = useState({} as ShoppingList);
    const { shoppingLists, checkUnckeckAllList, deleteShoppingList } = useContext(shoppingListsContext);
    const { modalType, closeModal } = useContext(modalContext);

    useEffect(() => {
        const filtered = shoppingLists.filter((list) => {
            const id = list._id;
            return id === listId;
        });
        const obj = filtered[0];
        setListDetails(obj);
    }, [listId, shoppingLists]);

    return (
        <div className="list__details__container">
            {listDetails && listDetails.groceries ? (
                <>
                    <CloseModalButton />

                    <div className="option__buttons">
                        {modalType === "list-details" && (
                            <>
                                <button
                                    onClick={() => {
                                        !listDetails.completed ? checkUnckeckAllList(listId, true) : checkUnckeckAllList(listId, false);
                                    }}
                                >
                                    {!listDetails.completed ? "Check all groceries" : "Uncheck all groceries"}
                                </button>
                                <button
                                    className="delete__button"
                                    onClick={() => {
                                        deleteShoppingList(listId);
                                        closeModal();
                                    }}
                                >
                                    Delete list
                                </button>
                            </>
                        )}
                    </div>

                    <div className="title">
                        <div>Shopping list</div>
                        <div>{listDetails.title}</div>
                    </div>

                    <div className="groceries__list">
                        {listDetails.groceries.map((item: any, i) => {
                            console.log(item);
                            if (item) {
                                return (
                                    <SingleListItem
                                        key={i}
                                        grocery={item.grocery}
                                        quantity={item.quantity}
                                        unit={item.unit}
                                        id={item.id}
                                        modalType={"list-details"}
                                        checked={item.checked}
                                        listId={listDetails.id}
                                        recipeTitle={item.recipeTitle}
                                        portions={item.portions}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </>
            ) : (
                "Loading..."
            )}
        </div>
    );
}

export default ListDetails;
