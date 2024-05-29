package it.corso.service;

import java.util.List;

import it.corso.dto.NewsDto;
import it.corso.dto.UtenteDto;

public interface NewsService {

	void saveNewsUser(int userID, NewsDto newsDto);

	List<NewsDto> allUserNews(int userId);

	List<UtenteDto> allNewsUser(int newsId);

	void deleteNewsUser(int userId, int newsId);

}
