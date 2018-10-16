package com.example.duobot.inlab.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.duobot.inlab.model.Campaign;

public interface CampaignService extends CrudRepository<Campaign, Integer> {
	
	public List<Campaign> findByAssignedUserAndEndDateGreaterThanOrderByStartDateDesc(String username, Integer endDate);

}
