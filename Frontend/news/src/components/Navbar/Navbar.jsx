import { NavLink } from "react-router-dom";
import css from "./Navbar.module.css";
// import "./Navbar.css"
import Cookies from 'js-cookie';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export function Navbar() {

    const navigateTo = useNavigate();

    const { user } = useContext(AuthContext);
    const { setTokenValid, tokenValid } = useContext(AuthContext)

    const handleLogout = () => {
        setTokenValid((validity) => !validity);
        Cookies.remove("token");
        navigateTo("/");
    };

    const handleNavigate = () => {
        navigateTo("profile");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav me-auto">
                        <li className={css.navItem}>
                            <NavLink className="nav-link" aria-current="page" to="home" style={{ color: "white" }}>Home</NavLink>
                        </li>


                        <li className={css.navItem}>
                            <NavLink className="nav-link" to="news" style={{ color: "white" }}>News</NavLink>
                        </li>

                        <li className={css.navItem}>
                            <NavLink className="nav-link" to="saved" style={{ color: "white" }}>Salvati</NavLink>
                        </li>

                    </ul>

                    <button style={{ background: "transparent", border: "none", color: "white" }} onClick={handleNavigate}>
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>

                    {/* <button type="button" className="btn btn-danger" onClick={handleLogout} style={{ margin: "0 1.5rem" }}>Log Out</button> */}
                    <button className={css.Btn} onClick={handleLogout} style={{ margin: "0 1.5rem" }}>

                        <div className={css.sign}><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

                        <div className={css.text}>Logout</div>
                    </button>


                </div>
            </div>
        </nav>
    );

}