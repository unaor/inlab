package com.example.duobot.inlab.controller;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.duobot.inlab.dao.CampaignService;
import com.example.duobot.inlab.model.Campaign;

@RestController
public class CampaignController {
	
	@Autowired
	CampaignService campaignService;
	
	@GetMapping(value = "/api/campaign")
	public ResponseEntity<?> getCampaigns(Authentication user) {
		try {
			Long timestamp = new Date().getTime();
			timestamp = timestamp / 1000;
			List<Campaign> campaigns = campaignService.findByAssignedUserAndEndDateGreaterThanOrderByStartDateDesc(user.getName(), timestamp.intValue());
			return ResponseEntity.ok(campaigns);
		} catch (Exception ex) {
			System.out.println(ex);
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}
	
	@PostMapping(value = "/api/campaign")
	public ResponseEntity<?> addCampaign(Principal user, @RequestBody @Valid Campaign campaign) {
		try {
			campaignService.save(campaign);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

}
