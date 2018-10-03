package com.example.duobot.inlab.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.duobot.inlab.dao.InlabUserService;
import com.example.duobot.inlab.model.User;

@RestController
public class UserController {

	@Autowired
	InlabUserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

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

	@PostMapping(value = "/api/user")
	public ResponseEntity<?> addUser(@RequestBody @Valid User user) {
		try {
			User dbUser = userService.findByEmail(user.getEmail());
			if (dbUser != null) {
				return ResponseEntity.badRequest().body("Ya existe un usuario con este email");
			}
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			userService.save(user);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

	@PutMapping(value = "/api/user")
	public ResponseEntity<?> editUser(@RequestBody @Valid User form) {

		try {
			User dbUser = userService.findById(form.getUserId()).get();
			if (dbUser == null) {

				return ResponseEntity.badRequest().body("No encontramos este usuario en el base de datos");
			}
			dbUser.setEmail(form.getEmail());
			dbUser.setEnabled(form.isEnabled());
			dbUser.setPassword(bCryptPasswordEncoder.encode(form.getPassword()));
			dbUser.setRoleName(form.getRoleName());
			dbUser.setUserName(form.getUsername());
			userService.save(dbUser);
			return ResponseEntity.noContent().build();

		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}
	
	@DeleteMapping(value = "/api/user")
	public ResponseEntity<?> deleteUser(@RequestParam Integer userId) {


		try {
			User dbUser = userService.findById(userId).get();
			if (dbUser == null) {

				return ResponseEntity.badRequest().body("No encontramos este usuario en el base de datos");
			}
			userService.delete(dbUser);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

}
