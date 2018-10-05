package com.example.duobot.inlab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.duobot.inlab.dao.InlabUserService;
import com.example.duobot.inlab.model.User;

@Controller
public class LoginController {

	@Autowired
	InlabUserService userService;

	@RequestMapping(value = { "/", "/login" })
	public String login() {
		return "loginCliente";
	}

	@RequestMapping(value = "/hello")
	public String welcome() {
		return "hello";
	}

	@RequestMapping(value = "/loginCliente")
	public String loginCliente() {
		return "loginCliente";
	}

	@RequestMapping(value = "/homeCliente")
	public String homeCliente() {
		return "homeCliente";
	}

	@RequestMapping(value = "/video")
	public String video() {
		return "video";
	}

	@RequestMapping(value = "/mediciones")
	public String mediciones() {
		return "mediciones";
	}

	@RequestMapping(value = "/insight")
	public String insight() {
		return "insight";
	}

	@RequestMapping(value = "/social")
	public String social() {
		return "social";
	}

	@RequestMapping(value = "/galeria")
	public String galeria() {
		return "galeria";
	}

	@RequestMapping(value = "/bi")
	public String bi() {
		return "bi";
	}

	@RequestMapping(value = "/emociones")
	public String emociones() {
		return "emociones";
	}

	@RequestMapping(value = "/homeAdmin")
	public String homeAdmin() {
		return "homeAdmin";
	}
	
	@RequestMapping(value = "/encuestas")
	public String encuestas() {
		return "encuestas";
	}
	
	@RequestMapping(value = "/campanas")
	public String campanas() {
		return "campanas";
	}
	
}
