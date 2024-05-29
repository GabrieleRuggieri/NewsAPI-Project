package it.corso.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

@Service
public class BlackList {

	private Set<String> tokens = new HashSet<>();

	public void invalidateToken(String token) {

		tokens.add(token);

	}

	public boolean isTokenRevoked(String token) {

		return tokens.contains(token);

	}

}
