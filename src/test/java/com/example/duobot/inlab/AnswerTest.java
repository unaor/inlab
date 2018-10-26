package com.example.duobot.inlab;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.example.duobot.inlab.controller.form.AnswerResponse;
import com.example.duobot.inlab.controller.form.Tag;
import com.example.duobot.inlab.dao.ProhibitedWordService;
import com.example.duobot.inlab.dao.QuestionService;
import com.example.duobot.inlab.model.ProhibitedWord;
import com.example.duobot.inlab.model.Question;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class AnswerTest {
	
	@Autowired
	QuestionService questionService;
	
	@Autowired
	ProhibitedWordService prohibitedWordService;
	
	@Test
	public void getAnswersForQuestions(){
		List<AnswerResponse> response = new ArrayList<AnswerResponse>();
		List<ProhibitedWord> badWords = prohibitedWordService.findAll();
		List<Question> questions = questionService.findByPollPollId(6);
		for(Question question : questions) {
			AnswerResponse answerResponse = new AnswerResponse();
			answerResponse.setQuestionId(question.getQuestionId());
			answerResponse.setQuestionName(question.getQuestion());
			String word = question.getAnswers().stream().map(answer -> answer.getAnswer()).collect(Collectors.joining(","));
			String badWordsAsString = badWords.stream().map(badWord -> badWord.getWord()).collect(Collectors.joining(","));
			Map<String, Integer> counts = Arrays.asList(word.split(" ")).parallelStream().
		            collect(Collectors.toConcurrentMap(
		                w -> w.toString(), w -> 1, Integer::sum));
			
			for(String key : counts.keySet()) {
				boolean isBadWord = badWords.stream()
			            .anyMatch(badWord -> badWord.getWord().equals(key));
				if(isBadWord) {
					continue;
				}
				answerResponse.getTags().add(new Tag(key, counts.get(key), word, badWordsAsString));
			}
			response.add(answerResponse);
		}

	}

}
