import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export function checkToken() {

    const token = Cookies.get("token");

    if (!token) {
        return false;
    }

    try {

        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp; //scadenza
        const currentTime = decodedToken.iat; //emissione

        return currentTime < expirationTime; //true se non e' scaduto

    } catch (error) {
        console.error("Errore durante la decodifica del token", error);

        return false;

    }
}