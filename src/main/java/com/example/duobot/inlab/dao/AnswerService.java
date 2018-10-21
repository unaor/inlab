package com.example.duobot.inlab.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.duobot.inlab.model.Answer;

public interface AnswerService extends CrudRepository<Answer, Integer> {
	
	public List<Answer> findByQuestionPollPollId(Integer pollId);

}
