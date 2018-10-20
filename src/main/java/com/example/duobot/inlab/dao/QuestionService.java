package com.example.duobot.inlab.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.duobot.inlab.model.Question;

public interface QuestionService extends CrudRepository<Question, Integer> {
	
	public List<Question> findByPollPollId(Integer pollId);

}
