import { createContext, useState } from "react";

type ModalType = "s-list" | "recipe" | "list-details" | "recipe-details" | null;

interface Modal {
    modalIsOpen: boolean;
    modalType: ModalType;
    openModal: (type: ModalType, listId?: string) => void;
    closeModal: () => void;
    listId: string;
}

export const modalContext = createContext({} as Modal);

function ModalContextProvider({ children }: { children: any }) {
    const [modalIsOpen, setIsModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [listId, setListId] = useState("");

    const openModal = (type: ModalType, listId?: string) => {
        if (listId) {
            setListId(listId);
        }
        setIsModalIsOpen(true);
        setModalType(type);
    };

    const closeModal = () => {
        setIsModalIsOpen(false);
        setModalType(null);
    };

    return (
        <modalContext.Provider
            value={{ modalIsOpen, modalType, openModal, closeModal, listId }}
        >
            {children}
        </modalContext.Provider>
    );
}

export default ModalContextProvider;
