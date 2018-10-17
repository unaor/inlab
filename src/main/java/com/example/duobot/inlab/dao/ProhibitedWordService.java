package com.example.duobot.inlab.dao;

import org.springframework.data.repository.CrudRepository;

import com.example.duobot.inlab.model.ProhibitedWord;

public interface ProhibitedWordService extends CrudRepository<ProhibitedWord, String> {

}
