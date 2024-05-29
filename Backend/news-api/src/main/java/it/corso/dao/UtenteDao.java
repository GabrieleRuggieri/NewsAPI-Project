package it.corso.dao;

import org.springframework.data.repository.CrudRepository;

import it.corso.model.News;
import it.corso.model.Utente;

public interface UtenteDao extends CrudRepository<Utente, Integer> {

	boolean existsByEmail(String email);

	Utente findByEmail(String email);

	Utente findByEmailAndPassword(String email, String password);

	// true se un qualsiasi utente ha un riferimento all'elemento di news
	// specificato, altrimenti restituirà false
	boolean existsByNewsListContains(News news);

}
