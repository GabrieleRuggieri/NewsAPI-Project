import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export async function registrazione() {

    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:8080/api/utente/registrazione', {
        method: 'POST', // Metodo HTTP per la richiesta POST
        headers: {
            'Content-Type': 'application/json', // Imposta l'intestazione del contenuto come JSON
        },
        body: JSON.stringify({
            "nome": nome,
            "cognome": cognome,
            "email": email,
            "password": password
        }),
    })

    //console.log(response)

    if (!response.ok) {
        throw new Error('Errore durante la registrazione');
    }

    console.log(response);
    console.log(response.status);

    return response;

    // const user = await response.json();
    // console.log(user);
    // return user;
}

export async function login() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:8080/api/utente/login', {
        method: 'POST', // Metodo HTTP per la richiesta POST
        headers: {
            'Content-Type': 'application/json', // Imposta l'intestazione del contenuto come JSON
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        }),
    })

    if (!response.ok) {
        throw new Error('Errore durante la login');
    }

    // .then(async response => await response.json()) // Converte la risposta in JSON
    // .then(data => console.log(data)) // Gestisce i dati della risposta
    // .catch((error) => console.error('Errore:', error)); // Gestisce eventuali errori

    const userToken = await response.json();
    console.log(userToken);

    // const decodedToken = jwtDecode(userToken.token);
    // const idUtente = decodedToken.id;
    // console.log(idUtente);

    return userToken;

}

// export async function getAllNews(theme, dateFrom, dateTo, filter) {

//     // 100 chiamate giornaliere (50 ogni 12h)

//     const api = {
//         key: "ecf9a14dbade4714accfb25af982f31b",
//         base: "https://newsapi.org/v2/"
//     }

//     try {

//         const response = await fetch(`${api.base}everything?q=${theme}&from=${dateFrom}&to=${dateTo}&sortBy=${filter}&apiKey=${api.key}`);

//         if (!response.ok) {
//             throw new Error('Errore durante la ricerca delle news');
//         }

//         const newsData = await response.json();
//         return newsData;

//     } catch (error) {
//         console.error('Errore: ', error);
//         throw error;

//     }
// }

export async function getAllNews(theme, dateFrom, dateTo, filter) {

    // 100 chiamate giornaliere (50 ogni 12h)

    const api = {
        key: "ecf9a14dbade4714accfb25af982f31b",
        base: "https://newsapi.org/v2/"
    }

    try {

        const response = await fetch(`${api.base}everything?q=${theme}&from=${dateFrom}&to=${dateTo}&sortBy=${filter}&apiKey=${api.key}`);

        if (!response.ok) {
            throw new Error('Errore durante la ricerca delle news');
        }

        const newsData = await response.json();
        return newsData;

    } catch (error) {
        console.error('Errore: ', error);
        throw error;

    }
}

export async function postNews(news) {

    // console.log("Source name:", news.source_name);
    // console.log("Payload:", news);

    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const response = await fetch(`http://localhost:8080/api/news/saveNews/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "source_name": news.source_name ?? "N/A",
            "author": news.author ?? "N/A",
            "title": news.title ?? "N/A",
            "description": news.description ?? "N/A",
            "url": news.url ?? "N/A",
            "url_to_image": news.url_to_image ?? "N/A",
            "published_at": news.published_at ?? "N/A",
            "content": news.content ?? "N/A"
        }),
    });

    if (!response.ok) {
        throw new Error('Errore durante la post delle news');
    }

    return response;
}

export async function getAllUserNews() {

    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {

        const response = await fetch(`http://localhost:8080/api/news/getAll/${userId}`, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'Application/json',
            // },
        });

        if (!response.ok) {
            throw new Error('Errore durante la get delle news');
        }

        const newsData = await response.json();
        // console.log(newsData);
        return newsData;

    } catch (error) {
        console.error('Errore: ', error);
        throw error;
    }

}

export async function deleteUserNews(newsId) {

    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {

        const response = await fetch(`http://localhost:8080/api/news/deleteNews/${userId}/${newsId}`, {
            method: 'DELETE',
            // headers: {
            //     'Content-Type': 'Application/json',
            // },
        });

        if (!response.ok) {
            throw new Error('Errore durante la delete delle news');
        }

        return response;


    } catch (error) {
        console.error('Errore: ', error);
        throw error;
    }

}

export async function getUser() {

    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email;

    try {

        const response = await fetch(`http://localhost:8080/api/utente/getUser/${email}`, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'Application/json',
            // },
        });

        if (!response.ok) {
            throw new Error('Errore durante la get dell\'utente');
        }

        const userData = await response.json();
        // console.log(newsData);
        return userData;


    } catch (error) {
        console.error('Errore: ', error);
        throw error;
    }
}