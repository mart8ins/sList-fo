import React from "react";
import "./landing.css";

type Props = {};

const Landing = (props: Props) => {
    return (
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
    );
};

export default Landing;
