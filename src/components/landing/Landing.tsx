import { useContext } from "react";
import "./landing.css";
import CreateContent from "./components/CreateContent";
import { userContext } from "../../context/AuthContext";

type Props = {};

const Landing = (props: Props) => {
    const { user } = useContext(userContext);

    return (
        <div className="landing">
            {user.status ? (
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
