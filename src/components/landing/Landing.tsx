import { useContext } from "react";
import "./landing.css";
import SignIn from "../signin/SignIn";

import CreateContent from "./components/CreateContent";
import { userContext } from "../../context/UserContext";

type Props = {};

const Landing = (props: Props) => {
    const { user } = useContext(userContext);

    return <div className="landing">{user.status ? <CreateContent /> : <SignIn />}</div>;
};

export default Landing;
