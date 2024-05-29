package it.corso.dto;

import java.util.Date;

public class UtenteLoginResponseDto {

	private String token;
	private Date ttl;
	private Date tokenCreationTime;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Date getTtl() {
		return ttl;
	}

	public void setTtl(Date ttl) {
		this.ttl = ttl;
	}

	public Date getTokenCreationTime() {
		return tokenCreationTime;
	}

	public void setTokenCreationTime(Date tokenCreationTime) {
		this.tokenCreationTime = tokenCreationTime;
	}

}
