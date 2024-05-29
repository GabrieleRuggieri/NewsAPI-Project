package it.corso.service;

import org.apache.commons.codec.digest.DigestUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.corso.dao.UtenteDao;
import it.corso.dto.UtenteDto;
import it.corso.dto.UtenteLoginRequestDto;
import it.corso.dto.UtenteRegistrazioneDto;

import it.corso.model.Utente;

@Service
public class UtenteServiceImpl implements UtenteService {

	ModelMapper modelMapper = new ModelMapper();

	@Autowired
	private UtenteDao utenteDao;

	@Override
	public void registraUtente(UtenteRegistrazioneDto utente) {

		String password = DigestUtils.sha256Hex(utente.getPassword());
		utente.setPassword(password);

		Utente u = new Utente();
		u.setNome(utente.getNome());
		u.setCognome(utente.getCognome());
		u.setEmail(utente.getEmail());
		u.setPassword(password);

		utenteDao.save(u);

	}

	@Override
	public boolean loginUtente(UtenteLoginRequestDto utente) {

		Utente u = new Utente();

		u.setEmail(utente.getEmail());
		u.setPassword(utente.getPassword());
		;

		String passwordHash = DigestUtils.sha256Hex(u.getPassword());

		Utente credenzialiUtente = utenteDao.findByEmailAndPassword(u.getEmail(), passwordHash);

		return credenzialiUtente != null ? true : false;

	}

	@Override
	public boolean esisteUtenteMail(String email) {

		return utenteDao.existsByEmail(email);
	}

	@Override
	public Utente trovaUtenteMail(String email) {

		return utenteDao.findByEmail(email);
	}

	@Override
	public UtenteDto getUserByEmail(String email) {

		Utente utente = utenteDao.findByEmail(email);

		UtenteDto user = modelMapper.map(utente, UtenteDto.class);

		return user;
	}

}
