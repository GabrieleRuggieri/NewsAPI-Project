import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { checkToken } from "../../components/services/config/RESTConfig";

export function AuthContextProvider({ children }) {

    const [tokenValid, setTokenValid] = useState(checkToken());

    const [user, setUser] = useState({
        nome: "",
        cognome: "",
        email: "",
    });

    return (
        <AuthContext.Provider value={{ user, setUser, tokenValid, setTokenValid }}>
            {children}
        </AuthContext.Provider>
    );
}