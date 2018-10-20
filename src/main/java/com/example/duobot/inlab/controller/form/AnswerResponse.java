package com.example.duobot.inlab.controller.form;

import java.util.ArrayList;
import java.util.List;

public class AnswerResponse {
	
	private Integer questionId;
	
	private String questionName;
	
	private List<String> answers = new ArrayList<String>();

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

	public List<String> getAnswers() {
		return answers;
	}

	public void setAnswers(List<String> answers) {
		this.answers = answers;
	}
}
