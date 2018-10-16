package com.example.duobot.inlab.model;

import org.springframework.security.core.GrantedAuthority;

public class Role implements GrantedAuthority {

	private static final long serialVersionUID = -2433001772305548173L;
		
	public Role(String roleName) {
		this.roleName = roleName;
	}

	private String roleName;

	@Override
	public String getAuthority() {
		return roleName;
	}
	
	public Role() {}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

}
