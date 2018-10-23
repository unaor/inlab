package com.example.duobot.inlab.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "CAMPAIGNS")
public class Campaign implements Serializable {

	private static final long serialVersionUID = -4473873499441843415L;

	@Id
	@GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
	private Integer campaignId;

	@NotNull
	private String campaignName;

	private Integer startDate;

	private Integer endDate;

	private String videoUrl;

	private String chatUrl;

	private String pollUrl;

	private String insightId;

	private String powerBIUrl;

	private String timelineUrl;

	private String tweetsUrl;

	private String topicsUrl;

	private String influenceUrl;

	private String topDomainsUrl;

	private String countries;

	private String demographics;

	private String postType;
	
	private String sources;

	private String assignedUser;
	
	private String pollImageUrl;
	
	private String emotionsUrl;

	public Campaign() {
	}

	public Integer getCampaignId() {
		return campaignId;
	}

	public void setCampaignId(Integer campaignId) {
		this.campaignId = campaignId;
	}

	public String getCampaignName() {
		return campaignName;
	}

	public void setCampaignName(String campaignName) {
		this.campaignName = campaignName;
	}

	public Integer getStartDate() {
		return startDate;
	}

	public void setStartDate(Integer startDate) {
		this.startDate = startDate;
	}

	public Integer getEndDate() {
		return endDate;
	}

	public void setEndDate(Integer endDate) {
		this.endDate = endDate;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public String getChatUrl() {
		return chatUrl;
	}

	public void setChatUrl(String chatUrl) {
		this.chatUrl = chatUrl;
	}

	public String getPollUrl() {
		return pollUrl;
	}

	public void setPollUrl(String pollUrl) {
		this.pollUrl = pollUrl;
	}

	public String getInsightId() {
		return insightId;
	}

	public void setInsightId(String insightId) {
		this.insightId = insightId;
	}

	public String getPowerBIUrl() {
		return powerBIUrl;
	}

	public void setPowerBIUrl(String powerBIUrl) {
		this.powerBIUrl = powerBIUrl;
	}

	public String getTimelineUrl() {
		return timelineUrl;
	}

	public void setTimelineUrl(String timelineUrl) {
		this.timelineUrl = timelineUrl;
	}

	public String getTweetsUrl() {
		return tweetsUrl;
	}

	public void setTweetsUrl(String tweetsUrl) {
		this.tweetsUrl = tweetsUrl;
	}

	public String getTopicsUrl() {
		return topicsUrl;
	}

	public void setTopicsUrl(String topicsUrl) {
		this.topicsUrl = topicsUrl;
	}

	public String getInfluenceUrl() {
		return influenceUrl;
	}

	public void setInfluenceUrl(String influenceUrl) {
		this.influenceUrl = influenceUrl;
	}

	public String getTopDomainsUrl() {
		return topDomainsUrl;
	}

	public void setTopDomainsUrl(String topDomainsUrl) {
		this.topDomainsUrl = topDomainsUrl;
	}

	public String getCountries() {
		return countries;
	}

	public void setCountries(String countries) {
		this.countries = countries;
	}

	public String getDemographics() {
		return demographics;
	}

	public void setDemographics(String demographics) {
		this.demographics = demographics;
	}

	public String getPostType() {
		return postType;
	}
	
	public void setPostType(String postType) {
		this.postType = postType;
	}
	
	public String getSources() {
		return sources;
	}
	
	public void setSources(String sources) {
		this.sources = sources;
	}

	public String getAssignedUser() {
		return assignedUser;
	}

	public void setAssignedUser(String assignedUser) {
		this.assignedUser = assignedUser;
	}

	public String getPollImageUrl() {
		return pollImageUrl;
	}

	public void setPollImageUrl(String pollImageUrl) {
		this.pollImageUrl = pollImageUrl;
	}

	public String getEmotionsUrl() {
		return emotionsUrl;
	}

	public void setEmotionsUrl(String emotionsUrl) {
		this.emotionsUrl = emotionsUrl;
	}
	
}
