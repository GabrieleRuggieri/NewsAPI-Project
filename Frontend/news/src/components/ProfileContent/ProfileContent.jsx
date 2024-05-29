import { useEffect } from "react";
import { UserCard } from "../UserCard/UserCard";
import css from "./ProfileContent.module.css"
import { getUser } from "../services/RESTService";
import { useState } from "react";

export function ProfileContent() {

    const [utente, setUtente] = useState({});

    useEffect(() => {

        getUser()

            .then(utente => setUtente(utente))
            .catch(error => console.error('errore nella fetch get user', error));

    }, []);

    return (
        <div className={css.container}>
            <UserCard
                nome={utente.nome}
                cognome={utente.cognome}
                email={utente.email}
            />
        </div>
    );
}