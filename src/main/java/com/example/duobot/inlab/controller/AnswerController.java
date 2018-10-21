package com.example.duobot.inlab.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.duobot.inlab.controller.form.AnswerResponse;
import com.example.duobot.inlab.dao.ProhibitedWordService;
import com.example.duobot.inlab.dao.QuestionService;
import com.example.duobot.inlab.model.Answer;
import com.example.duobot.inlab.model.ProhibitedWord;
import com.example.duobot.inlab.model.Question;

@RestController
public class AnswerController {
	
	@Autowired
	QuestionService questionService;
	
	@Autowired
	ProhibitedWordService prohibitedWordService;

	@GetMapping(value = "/api/answer")
	public ResponseEntity<?> getPollAnswer(Authentication user, @RequestParam Integer pollId) {
		try {
			List<AnswerResponse> response = new ArrayList<AnswerResponse>();
//			List<Answer> answers = answerService.findByQuestionPollPollId(pollId);
//				return ResponseEntity.ok(answers);
			List<Question> questions = questionService.findByPollPollId(pollId);
			List<ProhibitedWord> badWords = prohibitedWordService.findAll();
			for(Question question : questions) {
				AnswerResponse answerResponse = new AnswerResponse();
				answerResponse.setQuestionId(question.getQuestionId());
				answerResponse.setQuestionName(question.getQuestion());
				for(Answer answer : question.getAnswers()) {
					answerResponse.getAnswers().add(answer.getAnswer());	
				}
				response.add(answerResponse);
			}
			return ResponseEntity.ok(response);

		} catch (Exception ex) {
			System.out.println(ex);
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

}
