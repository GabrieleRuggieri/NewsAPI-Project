package it.corso.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;

//Rappresenta una data e ora con un offset dal tempo del tipo
// "1970-01-01T00:00:00Z"
//import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "news")
public class News {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_news")
	private int id;

	@Column(name = "source_name")
	private String source_name;

	@Column(name = "author")
	private String author;

	@Column(name = "title")
	private String title;

	@Lob
	@Column(name = "description", columnDefinition = "text")
	private String description;

	@Lob
	@Column(name = "url", columnDefinition = "text")
	private String url;

	@Lob
	@Column(name = "url_to_image", columnDefinition = "text")
	private String url_to_image;

	@Column(name = "published_at")
	private String published_at;

	@Lob
	@Column(name = "content", columnDefinition = "text")
	private String content;

//	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH }, fetch = FetchType.EAGER)
	@ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinTable(name = "utente_news", joinColumns = @JoinColumn(name = "news_id", referencedColumnName = "ID_news"), inverseJoinColumns = @JoinColumn(name = "utente_id", referencedColumnName = "ID_utente"))
	private List<Utente> userList = new ArrayList<>();

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSource_name() {
		return source_name;
	}

	public void setSource_name(String source_name) {
		this.source_name = source_name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrl_to_image() {
		return url_to_image;
	}

	public void setUrl_to_image(String url_to_image) {
		this.url_to_image = url_to_image;
	}

	public String getPublished_at() {
		return published_at;
	}

	public void setPublished_at(String published_at) {
		this.published_at = published_at;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<Utente> getUserList() {
		return userList;
	}

	public void setUserList(List<Utente> userList) {
		this.userList = userList;
	}

}
