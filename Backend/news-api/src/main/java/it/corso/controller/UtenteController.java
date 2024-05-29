package it.corso.controller;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import it.corso.dto.UtenteDto;
import it.corso.dto.UtenteLoginRequestDto;
import it.corso.dto.UtenteLoginResponseDto;
import it.corso.dto.UtenteRegistrazioneDto;
import it.corso.model.Utente;
import it.corso.service.BlackList;
import it.corso.service.UtenteService;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/utente")
public class UtenteController {

	@Autowired
	private UtenteService utenteService;

	@Autowired
	private BlackList blackList;

	@POST
	@Path("/registrazione")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response registraUtente(@Valid @RequestBody UtenteRegistrazioneDto utenteDto) {

		try {

			if (!Pattern.matches("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,20}",
					utenteDto.getPassword())) {
				return Response.status(Status.BAD_REQUEST).build();
			}

			if (utenteService.esisteUtenteMail(utenteDto.getEmail())) {
				return Response.status(Status.BAD_REQUEST).build();
			}

			utenteService.registraUtente(utenteDto);
			return Response.status(Status.OK).entity(utenteDto).build();

		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response loginUtente(@RequestBody UtenteLoginRequestDto utente) {

		try {

			if (utenteService.loginUtente(utente)) {
				return Response.status(Status.OK).entity(issueToken(utente.getEmail())).build();
			}

			return Response.status(Status.BAD_REQUEST).build();

		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}

	private UtenteLoginResponseDto issueToken(String email) {

		// cifratura attraverso l'algoritmo di cifratura HMAC
		byte[] secretKey = "iajwdawiduhadkjwddssdsdfdf8792133004".getBytes();

		// crittografia
		Key key = Keys.hmacShaKeyFor(secretKey);

		Utente informazioniUtente = utenteService.trovaUtenteMail(email);
		Map<String, Object> map = new HashMap<>();
		map.put("nome", informazioniUtente.getNome());
		map.put("cognome", informazioniUtente.getCognome());
		map.put("email", informazioniUtente.getEmail());
		map.put("id", informazioniUtente.getId());

		Date creation = new Date();
		Date end = java.sql.Timestamp.valueOf(LocalDateTime.now().plusMinutes(15L));

		String jwtToken = Jwts.builder().setClaims(map).setIssuer("http://localhost:8080").setIssuedAt(creation)
				.setExpiration(end).signWith(key).compact();

		UtenteLoginResponseDto token = new UtenteLoginResponseDto();
		token.setToken(jwtToken);
		token.setTtl(end);
		token.setTokenCreationTime(creation);
		return token;
	}

	@GET
	@Path("/logout")
	public Response logoutUtente(ContainerRequestContext requestContext) {

		try {

			String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
			String token = authorizationHeader.substring("Bearer".length()).trim();

			blackList.invalidateToken(token);

			return Response.status(Status.OK).build();

		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/getUser/{email}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUser(@PathParam(value = "email") String email) {

		try {

			if (email != null & !email.isEmpty()) {

				UtenteDto user = utenteService.getUserByEmail(email);
				return Response.status(Status.OK).entity(user).build();

			}

			return Response.status(Status.BAD_REQUEST).build();

		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}

}
