import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";

function RouteGuard({ children }: { children: JSX.Element }) {
    const {
        user: { status },
    } = useContext(userContext);

    if (!status && window.location.pathname !== "/") {
        return <Navigate to="/" />;
    }

    return children;
}

export default RouteGuard;
