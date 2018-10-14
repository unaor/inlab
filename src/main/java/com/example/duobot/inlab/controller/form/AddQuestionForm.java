package com.example.duobot.inlab.controller.form;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.example.duobot.inlab.model.Question;

public class AddQuestionForm {

	@NotNull
	private Integer pollId;
	@NotNull
	private List<Question> questions;

	public Integer getPollId() {
		return pollId;
	}

	public void setPollId(Integer pollId) {
		this.pollId = pollId;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

}
