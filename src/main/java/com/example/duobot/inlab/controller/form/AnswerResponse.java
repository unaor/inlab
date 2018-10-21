package com.example.duobot.inlab.controller.form;

import java.util.ArrayList;
import java.util.List;

public class AnswerResponse {
	
	private Integer questionId;
	
	private String questionName;
	
	private List<Tag> tags = new ArrayList<Tag>();

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public String getQuestionName() {
		return questionName;
	}

	public void setQuestionName(String questionName) {
		this.questionName = questionName;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	
}
