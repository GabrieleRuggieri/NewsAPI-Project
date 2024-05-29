import { useEffect, useState } from "react";
import { getAllUserNews } from "../services/RESTService";
import { CardNewsSaved } from "../CardNewsSaved/CardNewsSaved";
import css from "./Saved.module.css"
import { useNavigate } from "react-router-dom";

export function Saved() {

    const navigateTo = useNavigate();

    const [news, setNews] = useState([]);

    // senza [] quando faccio la delete si aggiorna automaticamente
    useEffect(() => {

        getAllUserNews()
            .then(news => setNews(news))
            .catch(error => console.error('errore nella fetch get all news', error));

    }, []);

    const handleClick = () => {
        navigateTo("/news");
    }

    return (
        <div className={css.savedContainer}>

            {news.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <p>Nessuna notizia salvata al momento.</p>
                    <button className="btn btn-primary" onClick={handleClick}>Vai alle news</button>
                </div>
            ) : (
                <div className={css.cardContainer}>
                    {news.map((element, index) => (
                        <CardNewsSaved
                            key={index}
                            id={element.id}
                            source_name={element.source_name || "N/A"}
                            author={element.author || "N/A"}
                            title={element.title || "N/A"}
                            description={element.description || "N/A"}
                            url={element.url || "#"}
                            url_to_image={element.url_to_image || "https://via.placeholder.com/150"}
                            published_at={element.published_at || "N/A"}
                            content={element.content || "N/A"}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}