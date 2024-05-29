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

### Backend
Il backend è sviluppato con Spring Boot e fornisce le seguenti funzionalità:
- Registrazione degli utenti.
- Autenticazione degli utenti mediante JWT (JSON Web Token).
- Gestione delle news, quindi ricerca, salvataggio e eliminazione.
- Gestione delle relazioni tra utenti e news.

### Frontend
Il frontend è sviluppato con React e offre le seguenti funzionalità:
- Form login e registrazione utente.
- Salvataggio del token nei Cookies.
- Interfaccia utente per la ricerca di notizie.
- Visualizzazione delle notizie salvate dall'utente.
- Visualizzazione dell'account utente.
