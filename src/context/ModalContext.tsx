import { createContext, useState } from "react";

type ModalType = "s-list" | "recipe" | null;

interface Modal {
    modalIsOpen: boolean;
    modalType: ModalType;
    openModal: (type: ModalType) => void;
    closeModal: () => void;
}

export const modalContext = createContext({} as Modal);

function ModalContextProvider({ children }: { children: any }) {
    const [modalIsOpen, setIsModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);

    const openModal = (type: ModalType) => {
        setIsModalIsOpen(true);
        setModalType(type);
    };

    const closeModal = () => {
        setIsModalIsOpen(false);
        setModalType(null);
    };

    return (
        <modalContext.Provider
            value={{ modalIsOpen, modalType, openModal, closeModal }}
        >
            {children}
        </modalContext.Provider>
    );
}

export default ModalContextProvider;
