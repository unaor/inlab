package com.example.duobot.inlab.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class InlabSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
				.antMatchers("/").permitAll().anyRequest().authenticated().and().formLogin().defaultSuccessUrl("/hello", true)
				.loginPage("/login").permitAll().and().logout().permitAll();
	}

	@Bean
	@Override
	public UserDetailsService userDetailsService() {
		UserDetails user = User.withDefaultPasswordEncoder().username("user").password("password").roles("USER")
				.build();

		return new InMemoryUserDetailsManager(user);
	}
	
}
