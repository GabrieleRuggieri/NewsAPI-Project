package it.corso.service;

import it.corso.dto.UtenteDto;
import it.corso.dto.UtenteLoginRequestDto;
import it.corso.dto.UtenteRegistrazioneDto;
import it.corso.model.Utente;

public interface UtenteService {

	void registraUtente(UtenteRegistrazioneDto utente);

	boolean loginUtente(UtenteLoginRequestDto utente);

	boolean esisteUtenteMail(String email);

	Utente trovaUtenteMail(String email);
	
	UtenteDto getUserByEmail(String email);

}
