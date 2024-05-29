# News Search Project

## Descrizione
Questo progetto utilizza una API per la ricerca di notizie secondo un tema e dei filtri scelti dall'utente. Gli utenti possono salvare le proprie notizie preferite e visualizzarle successivamente.

## API utilizzata
Link: https://newsapi.org/

## Struttura del Progetto

### Database
Il database è costruito utilizzando MySQL e contiene due entità principali:
- **Utente:** rappresenta gli utenti del sistema.
- **News:** rappresenta le notizie trovate tramite l'API.

Le entità Utente e News hanno una relazione molti a molti. Ogni utente può avere le proprie notizie salvate, e ogni notizia può essere associata a più utenti.


<br><br>


![Screenshot 2024-05-29 181508](https://github.com/GabrieleRuggieri/NewsAPI-Project/assets/125048968/fcf17149-9171-49dc-bc29-00eabecf5367)

<br><br>

### Backend
Il backend è sviluppato con Spring Boot e fornisce le seguenti funzionalità:
- Registrazione degli utenti.
- Autenticazione degli utenti mediante JWT (JSON Web Token).
- Gestione Logout utente
- Gestione delle news, quindi ricerca, salvataggio e eliminazione.
- Gestione delle relazioni tra utenti e news.

<br><br><br><br>

### Frontend
Il frontend è sviluppato con React e offre le seguenti funzionalità:
- Form login e registrazione utente.
- Salvataggio del token nei Cookies.
- Interfaccia utente per la ricerca di notizie.
- Visualizzazione delle notizie salvate dall'utente.
- Visualizzazione dell'account utente.
- Button per il logout dell'utente

<br><br>



![Screenshot 2024-05-29 181203](https://github.com/GabrieleRuggieri/NewsAPI-Project/assets/125048968/b356af63-548b-4b32-ac6f-4ec4a11517f1)


<br><br>


![Screenshot 2024-05-29 181210](https://github.com/GabrieleRuggieri/NewsAPI-Project/assets/125048968/97dd2f1a-788d-4eaa-9959-32de57241b01)


<br><br>


![Screenshot 2024-05-29 181227](https://github.com/GabrieleRuggieri/NewsAPI-Project/assets/125048968/8745cf88-b829-481b-ab33-294d205770c4)



<br><br>


![Screenshot 2024-05-29 181243](https://github.com/GabrieleRuggieri/NewsAPI-Project/assets/125048968/6d063186-f8e0-4439-88bc-3f3ed8c8f2d2)


<br><br>

![Screenshot 2024-05-29 181403](https://github.com/GabrieleRuggieri/NewsAPI-Project/assets/125048968/16e4ecfa-0bc1-4e05-ada1-02950686fe77)




<br><br>


![Screenshot 2024-05-29 181414](https://github.com/GabrieleRuggieri/NewsAPI-Project/assets/125048968/88eb8fcf-51dc-486a-90bd-6fe623b8c992)
