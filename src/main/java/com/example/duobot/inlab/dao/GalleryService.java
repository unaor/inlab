package com.example.duobot.inlab.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.duobot.inlab.model.Gallery;

public interface GalleryService extends CrudRepository<Gallery, Integer> {
	
	List<Gallery> findByCampaignCampaignId(Integer campaignId);

}
