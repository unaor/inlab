package com.example.duobot.inlab.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.duobot.inlab.model.Poll;

public interface PollService extends CrudRepository<Poll, Integer> {
	
	public List<Poll> findAllByOrderByPollIdAscQuestions(); // shows multiple rows

}
