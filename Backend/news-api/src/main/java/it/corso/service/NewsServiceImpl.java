package it.corso.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.corso.dao.NewsDao;
import it.corso.dao.UtenteDao;
import it.corso.dto.NewsDto;
import it.corso.dto.UtenteDto;
import it.corso.model.News;
import it.corso.model.Utente;

@Service
public class NewsServiceImpl implements NewsService {

	ModelMapper modelMapper = new ModelMapper();

	@Autowired
	NewsDao newsDao;

	@Autowired
	UtenteDao utenteDao;

	// oltre a salvare la news nel db, associa la news all'utente specificato
	@Override
	public void saveNewsUser(int userID, NewsDto newsDto) {

		Optional<Utente> userOptional = utenteDao.findById(userID);

		if (userOptional.isPresent()) {

			Utente user = userOptional.get();

			News news = modelMapper.map(newsDto, News.class);

			// Controlla se la news è già presente nel database
			News existingNews = newsDao.findByTitle(newsDto.getTitle());

			if (existingNews != null) {
				// Se la news esiste già, utilizza quella esistente
				news = existingNews;

			} else {
				// Altrimenti, salva la nuova news nel database
				newsDao.save(news);
			}

			// aggiorno la tabella di raccordo
			if (!user.getNewsList().contains(news)) {
				user.getNewsList().add(news);
				utenteDao.save(user);
			}

			else {
				throw new RuntimeException("News gia salvata");
			}

		}

		else {
			throw new RuntimeException("Utente non trovato");
		}

	}

	@Override
	public List<NewsDto> allUserNews(int userId) {

		Optional<Utente> userOptional = utenteDao.findById(userId);

		if (userOptional.isPresent()) {

			Utente utente = userOptional.get();

			List<News> news = utente.getNewsList();

//			List<News> news = (List<News>) newsDao.findAll(); in questo modo visualizzo tutte le news, anche degli altri utenti

			List<NewsDto> newsDto = new ArrayList<>();

			news.forEach(n -> newsDto.add(modelMapper.map(n, NewsDto.class)));

			return newsDto;

		} else {
			throw new RuntimeException("Utente non trovato");
		}
	}

	@Override
	public void deleteNewsUser(int userId, int newsId) {

		Optional<Utente> userOptional = utenteDao.findById(userId);

		if (userOptional.isPresent()) {

			Utente user = userOptional.get();

			Optional<News> newsOptional = newsDao.findById(newsId);

			if (newsOptional.isPresent()) {

				News news = newsOptional.get();

				// esito rimozione news dalla lista dell'utente
				boolean removed = user.getNewsList().removeIf(n -> n.getId() == newsId);

				if (removed) {
					// Save user dopo la rimozione della news dalla lista
					utenteDao.save(user);

					// ----------------
					// aggiornamento facoltativo
//					news.getUserList().remove(user);
//					newsDao.save(news);
					// ----------------

					// Check se la news e' ancora in altri user
					boolean isReferencedByOtherUsers = utenteDao.existsByNewsListContains(news);

					// Delete news dal db solo se nessun utente la ha
					if (!isReferencedByOtherUsers) {
						newsDao.delete(news);
					}

				} else {
					throw new RuntimeException("L'utente non ha questa news");
				}

			} else {
				throw new RuntimeException("News non trovata");
			}

		} else {
			throw new RuntimeException("Utente non trovato");
		}
	}

	// solo fatto per test, lista utenti che hanno salvato una news
	@Override
	public List<UtenteDto> allNewsUser(int newsId) {

		Optional<News> newsOptional = newsDao.findById(newsId);

		if (newsOptional.isPresent()) {

			News news = newsOptional.get();

			List<Utente> user = news.getUserList();

			List<UtenteDto> userDto = new ArrayList<>();

			user.forEach(n -> userDto.add(modelMapper.map(n, UtenteDto.class)));

			return userDto;

		} else {
			throw new RuntimeException("News non trovata");
		}
	}

}
