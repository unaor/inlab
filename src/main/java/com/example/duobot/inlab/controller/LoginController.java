package com.example.duobot.inlab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.duobot.inlab.dao.CampaignService;
import com.example.duobot.inlab.dao.InlabUserService;
import com.example.duobot.inlab.model.Campaign;
import com.example.duobot.inlab.model.User;

@Controller
public class LoginController {

	@Autowired
	InlabUserService userService;
	
	@Autowired
	CampaignService campaignService;

	@RequestMapping(value = { "/", "/login" })
	public String login() {
		return "loginCliente";
	}

	@RequestMapping(value = "/homeAdmin")
	public String welcome(Authentication user) {
		String authority = null;
		for(GrantedAuthority auth : user.getAuthorities()) {
			authority = auth.getAuthority();
			break;
		}
		if(authority.equals("ADMIN")) {
			return "homeAdmin";
	    } else {
	    	return "hello";
	    }
		
	}

	@RequestMapping(value = "/loginCliente")
	public String loginCliente() {
		return "loginCliente";
	}

	@RequestMapping(value = "/video")
	public String video(@RequestParam Integer cp, Authentication user, Model model) {
		
		try {
			Campaign dbCampaign = campaignService.findById(cp).get();
			if (dbCampaign == null) {
				return "error";
			}
			User client = userService.findByUsername(user.getName());
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("ADMIN")) {
				return "loginCliente";
			}
			model.addAttribute("campaign", dbCampaign);
			return "video";
		} catch (Exception ex) {
			return "error";
		}
	}

	@RequestMapping(value = "/mediciones")
	public String mediciones(@RequestParam Integer cp, Authentication user, Model model) {
		try {
			Campaign dbCampaign = campaignService.findById(cp).get();
			if (dbCampaign == null) {
				return "error";
			}
			User client = userService.findByUsername(user.getName());
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("ADMIN")) {
				return "loginCliente";
			}
			model.addAttribute("campaign", dbCampaign);
			return "mediciones";
		} catch (Exception ex) {
			return "error";
		}
	}

	@RequestMapping(value = "/insight")
	public String insight(@RequestParam Integer cp, Authentication user, Model model) {
		try {
			Campaign dbCampaign = campaignService.findById(cp).get();
			if (dbCampaign == null) {
				return "error";
			}
			User client = userService.findByUsername(user.getName());
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("ADMIN")) {
				return "loginCliente";
			}
			model.addAttribute("campaign", dbCampaign);
			return "insight";
		} catch (Exception ex) {
			return "error";
		}
	}

	@RequestMapping(value = "/social")
	public String social(@RequestParam Integer cp, Authentication user, Model model) {
		try {
			Campaign dbCampaign = campaignService.findById(cp).get();
			if (dbCampaign == null) {
				return "error";
			}
			User client = userService.findByUsername(user.getName());
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("ADMIN")) {
				return "loginCliente";
			}
			model.addAttribute("campaign", dbCampaign);
			return "social";
		} catch (Exception ex) {
			return "error";
		}
	}

	@RequestMapping(value = "/galeria")
	public String galeria(@RequestParam Integer cp, Authentication user, Model model) {
		try {
			Campaign dbCampaign = campaignService.findById(cp).get();
			if (dbCampaign == null) {
				return "error";
			}
			User client = userService.findByUsername(user.getName());
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("ADMIN")) {
				return "loginCliente";
			}
			model.addAttribute("campaign", dbCampaign);
			return "galeria";
		} catch (Exception ex) {
			return "error";
		}
	}

	@RequestMapping(value = "/bi")
	public String bi(@RequestParam Integer cp, Authentication user, Model model) {
		try {
			Campaign dbCampaign = campaignService.findById(cp).get();
			if (dbCampaign == null) {
				return "error";
			}
			User client = userService.findByUsername(user.getName());
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("ADMIN")) {
				return "loginCliente";
			}
			model.addAttribute("campaign", dbCampaign);
			return "bi";
		} catch (Exception ex) {
			return "error";
		}
	}
	
	@RequestMapping(value = "/emociones")
	public String emociones(@RequestParam Integer cp, Authentication user, Model model) {
		try {
			Campaign dbCampaign = campaignService.findById(cp).get();
			if (dbCampaign == null) {
				return "error";
			}
			User client = userService.findByUsername(user.getName());
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("ADMIN")) {
				return "loginCliente";
			}
			model.addAttribute("campaign", dbCampaign);
			return "emociones";
		} catch (Exception ex) {
			return "error";
		}
	}

	

	@RequestMapping(value = "/encuestas")
	public String encuestas() {
		return "encuestas";
	}
	
	@RequestMapping(value = "/campanas")
	public String campanas() {
		return "campanas";
	}
	
	@RequestMapping(value = "/homeCliente")
	public String homeCliente(@RequestParam Integer cp, Authentication user, Model model) {
		try {
			Campaign dbCampaign = campaignService.findById(cp).get();
			if (dbCampaign == null) {
				return "error";
			}
			User client = userService.findByUsername(user.getName());
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("ADMIN")) {
				return "loginCliente";
			}
			model.addAttribute("campaign", dbCampaign);
			return "homeCliente";
		} catch (Exception ex) {
			return "error";
		}

	}
	
}
