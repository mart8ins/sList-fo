import { useState } from "react";
import "./newSList.css";
import TopShared from "../shared/TopShared";
import MiddleShared from "../shared/MiddleShared";
import BottomShared from "../shared/BottomShared";

type Props = {
    closeModal: () => void;
    modalContentType: string;
};

function NewSList({ closeModal, modalContentType }: Props) {
    const [canSave] = useState(false);
    const [title, setTitle] = useState("");
    const [groceries, setGroceries] = useState([]);

    const saveNew = () => {
        console.log("heiii");
    };

    const handleTitle = (e: any) => {
        setTitle(e.target.value);
    };

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
