package com.example.duobot.inlab;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.example.duobot.inlab.dao.InlabUserService;
import com.example.duobot.inlab.model.User;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class UserTest {
	
	@Autowired
	InlabUserService userService;
	
	@Test
	public void getUsers(){
		Iterable<User> users = userService.findAll();
		assertNotNull(users);
		for(User user : users) {
			System.out.println(user.getUsername() + " role: " + user.getRoleName());
		}
	}

}
