package com.example.duobot.inlab.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "ANSWERS")
public class Answer implements Serializable {

	private static final long serialVersionUID = -4190330873145765297L;

	@Id
	@GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
	private Integer answerId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "questionId", nullable = false)
	@JsonBackReference
	private Question question;

	@NotNull
	private String answer;

	public Answer() {
	}

	public Integer getAnswerId() {
		return answerId;
	}

	public void setAnswerId(Integer answerId) {
		this.answerId = answerId;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

}
