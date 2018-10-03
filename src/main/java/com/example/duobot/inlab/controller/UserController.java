package com.example.duobot.inlab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.duobot.inlab.dao.InlabUserService;
import com.example.duobot.inlab.model.User;

@RestController
public class UserController {
	
	@Autowired
	InlabUserService userService;
	
	@GetMapping(value = "/api/user")
	public ResponseEntity<?> getUsers() {
		try {
			Iterable<User> users = userService.findAll();
			return ResponseEntity.ok(users);
		} catch (Exception ex) {
			System.out.println(ex);
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

}
