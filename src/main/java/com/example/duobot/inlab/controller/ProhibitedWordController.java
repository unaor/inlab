package com.example.duobot.inlab.controller;

import java.security.Principal;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.duobot.inlab.dao.ProhibitedWordService;
import com.example.duobot.inlab.model.ProhibitedWord;

@RestController
public class ProhibitedWordController {

	@Autowired
	ProhibitedWordService prohibitedWordService;

	@GetMapping(value = "/api/word")
	public ResponseEntity<?> getProhibitedWords() {
		try {
			return ResponseEntity.ok(prohibitedWordService.findAll());
		} catch (Exception ex) {
			System.out.println(ex);
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

	@PostMapping(value = "/api/word")
	public ResponseEntity<?> addWord(Principal user, @RequestBody @Valid ProhibitedWord word) {
		try {
			prohibitedWordService.save(word);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

	@DeleteMapping(value = "/api/word")
	public ResponseEntity<?> deleteWord(@RequestParam String word) {

		try {
			ProhibitedWord dbWord = prohibitedWordService.findById(word).get();
			if (dbWord == null) {
				return ResponseEntity.badRequest().body("No encontramos esta palabra en el base de datos");
			}
			prohibitedWordService.delete(dbWord);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

}
