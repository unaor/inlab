package com.example.duobot.inlab.controller;

import java.io.File;
import java.security.Principal;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.duobot.inlab.dao.CampaignService;
import com.example.duobot.inlab.dao.GalleryService;
import com.example.duobot.inlab.model.Campaign;
import com.example.duobot.inlab.model.Gallery;

@RestController
public class CampaignController {

	@Autowired
	CampaignService campaignService;
	
	@Autowired
	GalleryService galleryService;

	@GetMapping(value = "/api/campaign")
	public ResponseEntity<?> getAllCampaigns(Authentication user) {
		try {
			String authority = null;
			for (GrantedAuthority auth : user.getAuthorities()) {
				authority = auth.getAuthority();
				break;
			}
			if (authority.equals("Admin")) {
				return ResponseEntity.ok(campaignService.findAll());
			} else {
				Long timestamp = new Date().getTime();
				timestamp = timestamp / 1000;
				List<Campaign> campaigns = campaignService.findByAssignedUserAndEndDateGreaterThanOrderByStartDateDesc(
						user.getName(), timestamp.intValue());
				return ResponseEntity.ok(campaigns);
			}

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

	@PutMapping(value = "/api/campaign")
	public ResponseEntity<?> editCampaign(@RequestBody @Valid Campaign form) {

		try {
			Campaign dbCampaign = campaignService.findById(form.getCampaignId()).get();
			if (dbCampaign == null) {

				return ResponseEntity.badRequest().body("No encontramos esta registro en el base de datos");
			}
			dbCampaign.setAssignedUser(form.getAssignedUser());
			dbCampaign.setCampaignName(form.getCampaignName());
			dbCampaign.setCampaignCustomer(form.getCampaignCustomer());
			dbCampaign.setCampaignProject(form.getCampaignProject());
			dbCampaign.setChatUrl(form.getChatUrl());
			dbCampaign.setCountries(form.getCountries());
			dbCampaign.setDemographics(form.getDemographics());
			dbCampaign.setEndDate(form.getEndDate());
			dbCampaign.setInfluenceUrl(form.getInfluenceUrl());
			dbCampaign.setInsightId(form.getInsightId());
			dbCampaign.setPollUrl(form.getPollUrl());
			dbCampaign.setPostType(form.getPostType());
			dbCampaign.setPowerBIUrl(form.getPowerBIUrl());
			dbCampaign.setSources(form.getSources());
			dbCampaign.setStartDate(form.getStartDate());
			dbCampaign.setTimelineUrl(form.getTimelineUrl());
			dbCampaign.setTopDomainsUrl(form.getTopDomainsUrl());
			dbCampaign.setTopicsUrl(form.getTopicsUrl());
			dbCampaign.setTweetsUrl(form.getTweetsUrl());
			dbCampaign.setVideoUrl(form.getVideoUrl());
			dbCampaign.setEmotionsUrl(form.getEmotionsUrl());
			dbCampaign.setEmotionsIA(form.getEmotionsIA());
			campaignService.save(dbCampaign);
			return ResponseEntity.noContent().build();

		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

	@DeleteMapping(value = "/api/campaign")
	public ResponseEntity<?> deleteCampaign(@RequestParam Integer campaignId) {

		try {
			Campaign dbCampaign = campaignService.findById(campaignId).get();
			if (dbCampaign == null) {
				return ResponseEntity.badRequest().body("No encontramos este registro en el base de datos");
			}
			campaignService.delete(dbCampaign);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}
	
	@PostMapping(value = "/api/campaign/image")
	public ResponseEntity<?> addCampaignImage( @RequestParam("file") MultipartFile file, @RequestParam("campaignId") Integer campaignId) {


		if (file.isEmpty()) {
			return ResponseEntity.badRequest().body("Empty file");
		}

		try {
			Campaign dbCampaign = campaignService.findById(campaignId).get();
			if(dbCampaign == null) {
				return ResponseEntity.badRequest().body("No encontramos este registro en el base de datos");
			}
			File dir = new File("c:\\inlab\\campaign\\");
			if(!dir.exists()) {
				dir.mkdirs();
			}
			File finalDestination = new File(dir.getAbsolutePath() + "\\" + campaignId + "-" + file.getOriginalFilename());
			file.transferTo(finalDestination);
			dbCampaign.setPollImageUrl("/images/" + campaignId + "-" + file.getOriginalFilename());
			campaignService.save(dbCampaign);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			System.out.println(ex);
			return ResponseEntity.badRequest().body("Error agregando un archivo");
		}
	}
	
	@PostMapping(value = "/api/campaign/galeria")
	public ResponseEntity<?> addGalleryImage( @RequestParam("file") MultipartFile file, @RequestParam("campaignId") Integer campaignId) {


		if (file.isEmpty()) {
			return ResponseEntity.badRequest().body("Empty file");
		}

		try {
			Campaign dbCampaign = campaignService.findById(campaignId).get();
			if(dbCampaign == null) {
				return ResponseEntity.badRequest().body("No encontramos este registro en el base de datos");
			}
			File dir = new File("c:\\inlab\\campaign\\");
			if(!dir.exists()) {
				dir.mkdirs();
			}
			Gallery gallery = new Gallery();
			gallery.setCampaign(dbCampaign);
			gallery = galleryService.save(gallery);
			String filePath = dir.getAbsolutePath() + "\\" + campaignId + "-" +gallery.getGalleryId() + "-" + file.getOriginalFilename();
			File finalDestination = new File(filePath);
			file.transferTo(finalDestination);
			gallery.setImage("/images/" + campaignId + "-" +gallery.getGalleryId() + "-" + file.getOriginalFilename());
			galleryService.save(gallery);
			dbCampaign.getGalleries().add(gallery);
			campaignService.save(dbCampaign);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			System.out.println(ex);
			return ResponseEntity.badRequest().body("Error agregando un archivo");
		}
	}
	
	@DeleteMapping(value = "/api/campaign/galeria")
	public ResponseEntity<?> deleteGalleryImage( @RequestParam("galleryId") Integer galleryId) {


		

		try {
			Gallery dbGallery = galleryService.findById(galleryId).get();
			if(dbGallery == null) {
				return ResponseEntity.badRequest().body("No encontramos este registro en el base de datos");
			}
			

			galleryService.delete(dbGallery);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			System.out.println(ex);
			return ResponseEntity.badRequest().body("Error borrando un archivo");
		}
	}

}
