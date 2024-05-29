import css from "./LoginForm.module.css"
import { useState, useContext } from "react";
import { login } from "../../components/services/RESTService"
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function LoginForm() {

    const navigateTo = useNavigate();

    const { user, setUser, setTokenValid, tokenValid } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loginMessage, setLoginMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const userData = await login();

            if (userData && userData.token) {

                Cookies.set("token", userData.token);

                const token = Cookies.get("token");
                const decodedToken = jwtDecode(token);
                const { nome, cognome, email } = decodedToken

                // setUser({ ...userData }); cosi viene sovrasctitto user con token
                setUser({ nome, cognome, email });

                // console.log(user.nome);
                // console.log(user.cognome);
                // console.log(user.email);

                setLoginMessage("Login effettuato con successo!");
                navigateTo("/home");
                setTokenValid(true);
            }

            else {
                setLoginMessage("Errore durante il login!");
            }

        } catch (error) {
            console.error("Errore durante il login:", error);
            setLoginMessage("Credenziali non valide o utente non esistente");
        }

        setFormData({
            email: "",
            password: ""
        });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // const showPwd = () => {
    //     const input = document.getElementById('password');
    //     if (input.type === "password") {
    //         input.type = "text";
    //     } else {
    //         input.type = "password";
    //     }
    // };

    // onClick={showPwd}

    return (
        <>
            {/* <form className={css.formContainer} onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <hr></hr><br></br>
                <div className="mb-3">
                    <input type="email" className="form-control" style={{ textAlign: "center" }} name="email" id="email" aria-describedby="emailHelp" value={formData.email} onChange={handleChange} placeholder="Inserisci email" required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" style={{ textAlign: "center" }} name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Inserisci password" required />
                </div>
                <button type="submit" className={`btn btn-primary ${css.btn1}`}>Log in</button>
                <br></br>
                <p>Non sei ancora registrato? <NavLink to="/registrazione">Registrati</NavLink></p>
                <div>{loginMessage && <p>{loginMessage}</p>}</div>
            </form> */}

            <form className={css.form_main} onSubmit={handleSubmit}>
                <p className={css.heading}>Login</p>
                <div className={css.inputContainer}>
                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className={css.inputIcon}>
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                    </svg>
                    <input placeholder="Email" name="email" id="email" className={css.inputField} type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className={css.inputContainer}>
                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className={css.inputIcon}>
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    </svg>
                    <input placeholder="Password" name="password" id="password" className={css.inputField} type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required />
                </div>

                <div class={css.flex__row}>
                    <input type="checkbox" id="showPassword" onChange={togglePasswordVisibility} />
                    <label htmlFor="showPassword">Mostra password</label>
                </div>

                {/* <button type="button" onClick={togglePasswordVisibility} style={{ borderRadius: "2rem", border: "1px solid black" }}>Mostra/nascondi password</button> */}


                <button className={css.button}>Submit</button>


                <div className={css.signupContainer}>
                    <p>Non sei ancora registrato?</p>
                    <NavLink to="/registrazione" className={css.signupLink}>Sign up</NavLink>
                </div>

                <div className={css.message} style={{ textWrap: "balance" }}>{loginMessage && <p>{loginMessage}</p>}</div>
            </form>

        </>

    );
}