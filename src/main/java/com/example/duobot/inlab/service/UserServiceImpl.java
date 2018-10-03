package com.example.duobot.inlab.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.duobot.inlab.dao.InlabUserService;
import com.example.duobot.inlab.model.User;

@Component
public class UserServiceImpl implements UserDetailsService {
	
	@Autowired
	InlabUserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userService.findByUsername(username);
		return user;
	}

}
