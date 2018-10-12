package com.example.duobot.inlab.controller.form;

import java.util.List;

import javax.validation.constraints.NotNull;

public class AddQuestionForm {

	@NotNull
	private Integer pollId;
	@NotNull
	private List<String> questions;

	public Integer getPollId() {
		return pollId;
	}

	public void setPollId(Integer pollId) {
		this.pollId = pollId;
	}

	public List<String> getQuestions() {
		return questions;
	}

	public void setQuestions(List<String> questions) {
		this.questions = questions;
	}

}
