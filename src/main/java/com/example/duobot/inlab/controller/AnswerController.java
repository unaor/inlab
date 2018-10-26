package com.example.duobot.inlab.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
			List<ProhibitedWord> badWords = prohibitedWordService.findAll();
			List<Question> questions = questionService.findByPollPollId(pollId);
			for(Question question : questions) {
				AnswerResponse answerResponse = new AnswerResponse();
				answerResponse.setQuestionId(question.getQuestionId());
				answerResponse.setQuestionName(question.getQuestion());
				String word = question.getAnswers().stream().map(answer -> answer.getAnswer()).collect(Collectors.joining(","));
				Map<String, Integer> counts = Arrays.asList(word.split(" ")).parallelStream().
			            collect(Collectors.toConcurrentMap(
			                w -> w.toString(), w -> 1, Integer::sum));
				
				for(String key : counts.keySet()) {
					boolean isBadWord = badWords.stream()
				            .anyMatch(badWord -> badWord.getWord().equals(key));
					if(isBadWord) {
						continue;
					}
					answerResponse.getTags().add(new Tag(key, counts.get(key)));
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
