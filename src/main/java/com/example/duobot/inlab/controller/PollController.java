package com.example.duobot.inlab.controller;

import java.security.Principal;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.duobot.inlab.dao.PollService;
import com.example.duobot.inlab.model.Poll;

public class PollController {
	
	@Autowired
	PollService pollService;

	@GetMapping(value = "/api/poll")
	public ResponseEntity<?> getPolls() {
		try {
			Iterable<Poll> polls = pollService.findAll();
			return ResponseEntity.ok(polls);
		} catch (Exception ex) {
			System.out.println(ex);
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

	@PostMapping(value = "/api/poll")
	public ResponseEntity<?> addPoll(Principal user, @RequestBody @Valid Poll poll) {
		try {
			poll.setCreationUser(user.getName());
			pollService.save(poll);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

	@PutMapping(value = "/api/poll")
	public ResponseEntity<?> editUser(@RequestBody @Valid Poll form) {

		try {
			Poll dbPoll = pollService.findById(form.getPollId()).get();
			if (dbPoll == null) {

				return ResponseEntity.badRequest().body("No encontramos esta encuesta en el base de datos");
			}
			dbPoll.setPollName(form.getPollName());
			dbPoll.setStartDate(form.getStartDate());
			dbPoll.setEndDate(form.getEndDate());
			return ResponseEntity.noContent().build();

		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}
	
	@DeleteMapping(value = "/api/poll")
	public ResponseEntity<?> deleterPoll(@RequestParam Integer pollId) {


		try {
			Poll dbPoll = pollService.findById(pollId).get();
			if (dbPoll == null) {
				return ResponseEntity.badRequest().body("No encontramos esta encuesta en el base de datos");
			}
			pollService.delete(dbPoll);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

}
