import { useState, useEffect } from "react";
import "./newSList.css";
import TopShared from "../shared/TopShared";
import MiddleShared from "../shared/MiddleShared";
import BottomShared from "../shared/BottomShared";

type Props = {
    closeModal: () => void;
    modalContentType: string;
};

function NewSList({ closeModal, modalContentType }: Props) {
    const [canSave, setCanSave] = useState(false);
    const [title, setTitle] = useState("");
    const [groceries] = useState([]);

    const saveNew = () => {
        console.log("heiii");
    };

    const handleTitle = (e: any) => {
        setTitle(e.target.value);
    };

    useEffect(() => {
        if (title.length > 0 && groceries.length > 0) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [title, groceries]);

    return (
        <div className="add__new__container">
            <TopShared
                canSave={canSave}
                title={title}
                modalContentType={modalContentType}
                saveNew={saveNew}
                handleTitle={handleTitle}
                closeModal={closeModal}
            />

            {title && <MiddleShared />}

            {title && groceries.length > 0 && <BottomShared />}
        </div>
    );
}

export default NewSList;
