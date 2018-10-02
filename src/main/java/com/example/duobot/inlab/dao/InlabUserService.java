package com.example.duobot.inlab.dao;

import org.springframework.data.repository.CrudRepository;

import com.example.duobot.inlab.model.User;

public interface InlabUserService extends CrudRepository<User, Integer> {
	
	public User findByEmail(String email);

}
