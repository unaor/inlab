package com.example.duobot.inlab.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "PROHIBITED_WORDS")
public class ProhibitedWord implements Serializable {


	private static final long serialVersionUID = -8044649736214087524L;
	
	@Id
	@NotNull
	private String word;

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}
	
	

}
