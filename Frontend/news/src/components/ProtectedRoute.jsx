import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkToken } from "./services/config/RESTConfig";

export function ProtectedRoute({ children }) {

    const navigateTo = useNavigate();

    useEffect(() => {

        if (!checkToken()) {
            navigateTo("/");
        }

    }, []);

    return <>{children}</>;

}