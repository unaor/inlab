package com.example.duobot.inlab.controller.form;

public class Tag {
	
	private String text;
	
	private Integer weight;
	
	private String wholeWords;
	
	private String badWords;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Integer getWeight() {
		return weight;
	}

	public void setWeight(Integer weight) {
		this.weight = weight;
	}

	public String getWholeWords() {
		return wholeWords;
	}

	public void setWholeWords(String wholeWords) {
		this.wholeWords = wholeWords;
	}

	public String getBadWords() {
		return badWords;
	}

	public void setBadWords(String badWords) {
		this.badWords = badWords;
	}

	public Tag(String text, Integer weight, String wholeWords, String badWords) {
		this.text = text;
		this.weight = weight;
		this.wholeWords = wholeWords;
		this.badWords = badWords;
	}
	
	

	
	
	
	
	
	
	

}
