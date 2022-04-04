import React, { useState } from "react";
import "./landing.css";
import CreateContent from "./components/CreateContent";

type Props = {};

const Landing = (props: Props) => {
    const [userIs, SetUserIs] = useState(true);

    return (
        <div className="landing">
            {userIs ? (
                <CreateContent />
            ) : (
                <div className="landing__container">
                    <div className="intro">
                        <div>
                            <h2>Create recipes</h2>
                        </div>
                        <div>
                            <h2>Create shopping lists</h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Landing;
