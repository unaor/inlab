package com.example.duobot.inlab.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="USERS",
uniqueConstraints=@UniqueConstraint(columnNames={"email"}))
@NoArgsConstructor
public class User implements Serializable, UserDetails, GrantedAuthority {

	private static final long serialVersionUID = -2970340426497543512L;
	
	@Id
	@GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
	@Getter
	@Setter
	private Integer userId;
	
	@Setter
	private String userName;
	
	@Getter
	@Setter
	@Email
	private String email;
	
	@Getter
	@Setter
	private String password;
	
	@Getter
	@Setter
	private String roleName;
	
	@Getter
	@Setter
	private boolean enable;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<User> roles = new ArrayList<User>();
		roles.add(this);
		return roles;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return enable;
	}

	@Override
	public String getAuthority() {
		return roleName;
	}
	
	

}
