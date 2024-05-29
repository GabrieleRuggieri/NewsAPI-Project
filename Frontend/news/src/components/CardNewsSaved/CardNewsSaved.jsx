import { deleteUserNews } from "../services/RESTService";
import css from "./CardNewsSaved.module.css";

export function CardNewsSaved(props){
    
    const handleDeleteNews = async () => {

        try {

            await deleteUserNews(props.id);
            alert("Eliminazione con successo!");

        } catch (error) {

            console.error("Errore durante la delete della news:", error);
            alert("Errore durante la delete della news.");
        }
    };

    return (
        <div className={`card ${css.card} ${css.cardTransition}`}>
            <h5 className="card-header">{props.source_name}</h5>
            <div className="card-body">
                <h5 className="card-title">Autore: {props.author}</h5>
                <p className={`card-text ${css.balance}`}>{props.title}</p>
                {/* <p>{props.id}</p> */}
                
                <hr></hr>
                
                {props.url_to_image && (
                    <div>
                        <img src={props.url_to_image} alt="Article" className={`card-img-top ${css.image}`} />
                    </div>
                )}

                <p className="card-text">Published at: {props.published_at}</p>
                <button onClick={() => window.open(props.url, '_blank')} className="btn btn-primary" style={{ marginRight: "1rem" }}>Read more</button>
                <button onClick={handleDeleteNews} className="btn btn-danger">Elimina</button>
                
            </div>
        </div>
    );

}