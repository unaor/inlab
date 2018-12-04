package com.example.duobot.inlab.controller;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.duobot.inlab.controller.form.AddQuestionForm;
import com.example.duobot.inlab.controller.form.AnswerForm;
import com.example.duobot.inlab.dao.AnswerService;
import com.example.duobot.inlab.dao.PollService;
import com.example.duobot.inlab.dao.QuestionService;
import com.example.duobot.inlab.model.Answer;
import com.example.duobot.inlab.model.Poll;
import com.example.duobot.inlab.model.Question;

@RestController
public class PollController {
	
	@Autowired
	PollService pollService;
	
	@Autowired
	QuestionService questionService;
	
	@Autowired
	AnswerService answerService;

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
	public ResponseEntity<?> editPoll(@RequestBody @Valid Poll form) {

		try {
			Poll dbPoll = pollService.findById(form.getPollId()).get();
			if (dbPoll == null) {

				return ResponseEntity.badRequest().body("No encontramos esta encuesta en el base de datos");
			}
			dbPoll.setPollName(form.getPollName());
			dbPoll.setStartDate(form.getStartDate());
			dbPoll.setEndDate(form.getEndDate());
			pollService.save(dbPoll);
			return ResponseEntity.noContent().build();

		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}
	
	@PutMapping(value = "/api/poll/question")
	public ResponseEntity<?> addQuestionsToPoll(@RequestBody @Valid AddQuestionForm form) {

		try {
			Poll dbPoll = pollService.findById(form.getPollId()).get();
			if (dbPoll == null) {

				return ResponseEntity.badRequest().body("No encontramos esta encuesta en el base de datos");
			}
			// reset the existing questions
			if(dbPoll.getQuestions() == null) {
				dbPoll.setQuestions(new HashSet<Question>());
			}
			for(Question questionRequest : form.getQuestions()) {
				if(questionRequest.getQuestionId() == null) {
					Question question = new Question();
					question.setPoll(dbPoll);
					question.setQuestion(questionRequest.getQuestion());
					dbPoll.getQuestions().add(question);
				} else {
					for(Question dbQuestion : dbPoll.getQuestions()) {
						if(dbQuestion.getQuestionId() == questionRequest.getQuestionId()) {
							dbQuestion.setQuestion(questionRequest.getQuestion());
						}
					}
					
				}

			}
			pollService.save(dbPoll);
			return ResponseEntity.noContent().build();

		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}
	
	@DeleteMapping(value = "/api/poll")
	public ResponseEntity<?> deletePoll(@RequestParam Integer pollId) {


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
	
	@DeleteMapping(value = "/api/poll/question")
	public ResponseEntity<?> deletePollQuestion(@RequestParam Integer questionId) {


		try {
			Question dbQuestion = questionService.findById(questionId).get();
			if (dbQuestion == null) {
				return ResponseEntity.badRequest().body("No encontramos esta pregunta en el base de datos");
			}
			questionService.delete(dbQuestion);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}
	
	@PostMapping(value = "/api/poll/answer")
	public ResponseEntity<?> addAnswer(Principal user, @RequestBody @Valid List<AnswerForm> form) {
		try {
			for(AnswerForm answerRequest: form) {
				if(answerRequest.getAnswer() == null || !answerRequest.getAnswer().isEmpty()) {
					continue;
				}
				Question question = new Question();
				question.setQuestionId(answerRequest.getQuestionId());
				Answer answer = new Answer();
				answer.setQuestion(question);
				answer.setAnswer(answerRequest.getAnswer());
				answerService.save(answer);
			}
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

}
