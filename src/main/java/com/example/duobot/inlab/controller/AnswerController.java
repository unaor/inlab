package com.example.duobot.inlab.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.duobot.inlab.controller.form.AnswerResponse;
import com.example.duobot.inlab.controller.form.Tag;
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
			List<Question> questions = questionService.findByPollPollId(pollId);
			List<ProhibitedWord> badWords = prohibitedWordService.findAll();
			for(Question question : questions) {
				Map<String, Integer> wordCounter = new HashMap<String, Integer>();
				AnswerResponse answerResponse = new AnswerResponse();
				answerResponse.setQuestionId(question.getQuestionId());
				answerResponse.setQuestionName(question.getQuestion());
				for(Answer answer : question.getAnswers()) {
					String [] wordsArray = answer.getAnswer().split(" ");
					for(String word : wordsArray) {
						boolean skipWord = false;
						for(ProhibitedWord prohibitedWord : badWords) {
							if(prohibitedWord.getWord().equals(word)) {
								skipWord = true;
								break;
							}
						}
						if(skipWord) {
							continue;
						}
						if(wordCounter.get(word) != null) {
							// existing word
							wordCounter.put(word, wordCounter.get(word) + 1);
						} else {
							wordCounter.put(word, 1);
						}
					}
					for(String key : wordCounter.keySet()) {
						Tag tag = new Tag();
						tag.setText(key);
						tag.setWeight(wordCounter.get(key));
						answerResponse.getTags().add(tag);
					}
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
