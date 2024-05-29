import css from "./NewsCard.module.css";
import { postNews } from "../services/RESTService";

export function NewsCard(props) {

    const handleSaveNews = async () => {

        try {

            await postNews(props); // Invia la singola notizia al backend
            alert("Salvataggio con successo!");

        } catch (error) {

            console.error("Errore durante il salvataggio della news:", error);
            alert("Errore durante il salvataggio della news.");
        }
    };

    return (
        <div className={`card ${css.card} ${css.cardTransition}`}>
            <h5 className="card-header">{props.source_name}</h5>
            <div className="card-body">
                <h5 className="card-title">Autore: {props.author}</h5>
                <p className={`card-text ${css.balance}`}>{props.title}</p>
                <hr></hr>

                {/* <a href={props.url} target="_blank" rel="noopener noreferrer" className="card-text">Leggi l'articolo completo</a> */}
                {props.url_to_image && (
                    <div>
                        <img src={props.url_to_image} alt="Article" className={`card-img-top ${css.image}`} />
                    </div>
                )}

                <p className="card-text">Published at: {props.published_at}</p>
                <button onClick={() => window.open(props.url, '_blank')} className="btn btn-primary" style={{ marginRight: "1rem" }}>Read more</button>
                <button onClick={handleSaveNews} className="btn btn-success">Save news</button>

            </div>
        </div>
    );
}



// import css from "./NewsCard.module.css";

// export function NewsCard(props) {
//     return (
//         <div className={`card ${css.card} ${css.cardTransition}`}>
//             <h5 className="card-header">{props.source_name}</h5>
//             <div className="card-body">
//                 <h5 className="card-title">Autore: {props.author}</h5>
//                 <p className="card-text">{props.title}</p>
//                 <hr></hr>
//                 <p className="card-text">Url: {props.url}</p>
//                 <p className="card-text">Url image: {props.url_to_image}</p>
//                 <p className="card-text">Published at: {props.published_at}</p>
//                 <p className="card-text">{props.content}</p>
//             </div>
//         </div>
//     );
// }