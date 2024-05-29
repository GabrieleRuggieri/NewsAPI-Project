import css from "./NewsContent.module.css";
import { getAllNews } from "../services/RESTService";
import { NewsCard } from "../NewsCard/NewsCard";
import { useState, useEffect } from "react";

export function NewsContent() {
    const [news, setNews] = useState([]);

    const [theme, setTheme] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        if (theme && dateFrom && dateTo && filter) {
            fetchNews();
        }
        else if (!filter) {
            setNews([]); //pulisce news se il filtro viene impostato a select filter
        }
    }, [theme, dateFrom, dateTo, filter]);

    const fetchNews = async () => {
        try {
            const newsData = await getAllNews(theme, dateFrom, dateTo, filter);
            setNews(newsData.articles || []);
        } catch (error) {
            console.error('Errore durante il recupero delle news:', error);
        }
    };

    return (
        <div className={css.newsContainer}>

            <div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: "2rem", paddingTop: "2rem" }}>
                    <input type="text" placeholder="Enter theme" value={theme} onChange={(e) => setTheme(e.target.value)} />
                </div>

                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="">Select filter</option>
                    <option value="publishedAt">Published At</option>
                    <option value="relevancy">Relevancy</option>
                    <option value="popularity">Popularity</option>
                </select>
            </div>

            <p>Total results: {news.length}</p>

            <div className={css.cardContainer}>
                {news.map((article, index) => (
                    <NewsCard
                        key={index}
                        source_name={article.source.name || "N/A"}
                        author={article.author || "N/A"}
                        title={article.title || "N/A"}
                        description={article.description || "N/A"}
                        url={article.url || "#"}
                        url_to_image={article.urlToImage || "https://via.placeholder.com/150"}
                        published_at={article.publishedAt || "N/A"}
                        content={article.content || "N/A"}
                    />
                ))}
            </div>

        </div>
    );
}