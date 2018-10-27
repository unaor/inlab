package com.example.duobot.inlab.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "GALLERIES")
public class Gallery implements Serializable {


	private static final long serialVersionUID = 6451635782472896441L;
	
	@Id
	@GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
	private Integer galleryId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "campaignId", nullable = false)
	@JsonBackReference
	private Campaign campaign;
	
	String image;

	public Integer getGalleryId() {
		return galleryId;
	}

	public void setGalleryId(Integer galleryId) {
		this.galleryId = galleryId;
	}

	public Campaign getCampaign() {
		return campaign;
	}

	public void setCampaign(Campaign campaign) {
		this.campaign = campaign;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

}
