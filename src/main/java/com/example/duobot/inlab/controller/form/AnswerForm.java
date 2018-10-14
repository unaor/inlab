package com.example.duobot.inlab.controller.form;

import javax.validation.constraints.NotNull;

public class AnswerForm {
	
	@NotNull
	private Integer questionId;
	
	private String answer;

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}
	
	
	

}
