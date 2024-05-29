import { Footer } from "../../Footer/Footer";
import { Navbar } from "../../Navbar/Navbar"
import { useOutlet } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { useContext } from "react";

export function Layout() {

    const { user, tokenValid } = useContext(AuthContext);

    const outlet = useOutlet();

    return (
        <>
            {tokenValid && <Navbar />}
            {outlet}
            <Footer />
        </>
    )
}