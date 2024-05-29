package it.corso.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import it.corso.dto.NewsDto;
import it.corso.dto.UtenteDto;
import it.corso.service.NewsService;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/news")
public class NewsController {

	@Autowired
	NewsService newsService;

//	@POST
//	@Path("/save")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response saveNews(NewsDto newsDto) {
//
//		try {
//			newsService.salvaDati(newsDto);
//			return Response.status(Status.OK).entity(newsDto).build();
//		} catch (Exception e) {
//			return Response.status(Status.BAD_REQUEST).build();
//		}
//	}

//	@DELETE
//	@Path("/delete")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response cancellaDati(NewsDto newsDto) {
//		try {
//			newsService.delete(11);
//			return Response.status(Status.OK).build();
//		} catch (Exception e) {
//			return Response.status(Status.BAD_REQUEST).build();
//		}
//	}

	@POST
	@Path("/saveNews/{userID}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response saveNewsUser(@PathParam(value = "userID") int userID, NewsDto newsDto) {

		try {
			newsService.saveNewsUser(userID, newsDto);

			return Response.status(Status.OK).entity(newsDto).build();

		} catch (Exception e) {

			return Response.status(Status.BAD_REQUEST).build();
		}
	}

	@GET
	@Path("/getAll/{userID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllUserNews(@PathParam(value = "userID") int userID) {

		try {
			List<NewsDto> userNews = newsService.allUserNews(userID);
			return Response.status(Status.OK).entity(userNews).build();

		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}

	@DELETE
	@Path("/deleteNews/{userId}/{newsId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteNews(@PathParam(value = "userId") int userId, @PathParam(value = "newsId") int newsId) {
		try {
			newsService.deleteNewsUser(userId, newsId);
			
			return Response.status(Status.OK).build();
			
			
		} catch (Exception e) {
		
			return Response.status(Status.BAD_REQUEST).build();
		}
	}
	
	//	per test
	@GET
	@Path("/getAllNewsUser/{newsID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllNewsUser(@PathParam(value = "newsID") int newsID) {

		try {
			List<UtenteDto> newsUser = newsService.allNewsUser(newsID);
			return Response.status(Status.OK).entity(newsUser).build();

		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}

}
