package com.example.duobot.inlab.dao;

import com.example.duobot.inlab.model.Conference;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConferenceService extends JpaRepository<Conference, Integer> {
    
}