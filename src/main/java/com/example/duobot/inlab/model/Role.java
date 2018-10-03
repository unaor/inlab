package com.example.duobot.inlab.model;

import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;
import lombok.Setter;

public class Role implements GrantedAuthority {

	private static final long serialVersionUID = -2433001772305548173L;
	
	
	
	public Role(String roleName) {
		this.roleName = roleName;
	}

	@Getter
	@Setter
	private String roleName;

	@Override
	public String getAuthority() {
		return roleName;
	}

}
