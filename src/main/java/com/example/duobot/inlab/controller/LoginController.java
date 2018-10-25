package com.example.duobot.inlab.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.duobot.inlab.controller.form.AnswerResponse;
import com.example.duobot.inlab.controller.form.Tag;
import com.example.duobot.inlab.dao.CampaignService;
import com.example.duobot.inlab.dao.InlabUserService;
import com.example.duobot.inlab.dao.ProhibitedWordService;
import com.example.duobot.inlab.dao.QuestionService;
import com.example.duobot.inlab.model.Answer;
import com.example.duobot.inlab.model.Campaign;
import com.example.duobot.inlab.model.ProhibitedWord;
import com.example.duobot.inlab.model.Question;
import com.example.duobot.inlab.model.User;

@Controller
public class LoginController {

	@Autowired
	InlabUserService userService;
	
	@Autowired
	CampaignService campaignService;
	
	@Autowired
	QuestionService questionService;
	
	@Autowired
	ProhibitedWordService prohibitedWordService;

	@RequestMapping(value = { "/", "/login" })
	public String login() {
		return "loginCliente";
	}

	@RequestMapping(value = "/homeAdmin")
	public String welcome(Authentication user, Model model) {
		String authority = null;
		for(GrantedAuthority auth : user.getAuthorities()) {
			authority = auth.getAuthority();
			break;
		}
		if(authority.equals("Admin") || authority.equals("Investigador") || authority.equals("Asistente")) {
			model.addAttribute("roleName", authority);
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
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("Admin")) {
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
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("Admin")) {
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
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("Admin")) {
				return "loginCliente";
			}
			model.addAttribute("campaign", dbCampaign);
			
			List<AnswerResponse> response = new ArrayList<AnswerResponse>();
			List<Question> questions = questionService.findByPollPollId(Integer.parseInt(dbCampaign.getInsightId()));
			List<ProhibitedWord> badWords = prohibitedWordService.findAll();
			for(Question question : questions) {
				Map<String, Integer> wordCounter = new HashMap<String, Integer>();
				AnswerResponse answerResponse = new AnswerResponse();
				answerResponse.setQuestionId(question.getQuestionId());
				answerResponse.setQuestionName(question.getQuestion());
				for(Answer answer : question.getAnswers()) {
					String [] wordsArray = answer.getAnswer().split(" ");
					for(String word : wordsArray) {
						boolean skipWord = false;
						for(ProhibitedWord prohibitedWord : badWords) {
							if(prohibitedWord.getWord().equals(word)) {
								skipWord = true;
								break;
							}
						}
						if(skipWord) {
							continue;
						}
						if(wordCounter.get(word) != null) {
							// existing word
							wordCounter.put(word, wordCounter.get(word) + 1);
						} else {
							wordCounter.put(word, 1);
						}
					}
					for(String key : wordCounter.keySet()) {
						Tag tag = new Tag();
						tag.setText(key);
						tag.setWeight(wordCounter.get(key));
						answerResponse.getTags().add(tag);
					}
				}
				response.add(answerResponse);
			}
			model.addAttribute("answers", response);
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
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("Admin")) {
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
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("Admin")) {
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
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("Admin")) {
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
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("Admin")) {
				return "loginCliente";
			}
			model.addAttribute("campaign", dbCampaign);
			return "emociones";
		} catch (Exception ex) {
			return "error";
		}
	}

	

	@RequestMapping(value = "/encuestas")
	public String encuestas(Authentication user, Model model) {
		String authority = null;
		for(GrantedAuthority auth : user.getAuthorities()) {
			authority = auth.getAuthority();
			break;
		}
		if(authority.equals("Admin") || authority.equals("Investigador") || authority.equals("Asistente")) {
			model.addAttribute("roleName", authority);
			return "encuestas";
	    } else {
	    	return "loginCliente";
	    }
		
	}
	
	@RequestMapping(value = "/campanas")
	public String campanas(Authentication user, Model model) {
		String authority = null;
		for(GrantedAuthority auth : user.getAuthorities()) {
			authority = auth.getAuthority();
			break;
		}
		if(authority.equals("Admin") || authority.equals("Investigador") || authority.equals("Asistente")) {
			model.addAttribute("roleName", authority);
			return "campanas";
	    } else {
	    	return "loginCliente";
	    }
	}
	
	@RequestMapping(value = "/respuestas")
	public String respuestas(Authentication user, Model model) {
		String authority = null;
		for(GrantedAuthority auth : user.getAuthorities()) {
			authority = auth.getAuthority();
			break;
		}
		if(authority.equals("Admin") || authority.equals("Investigador") || authority.equals("Asistente")) {
			model.addAttribute("roleName", authority);
			return "respuestas";
	    } else {
	    	return "loginCliente";
	    }
	}
	
	@RequestMapping(value = "/galerias")
	public String galerias(Authentication user, Model model) {
		String authority = null;
		for(GrantedAuthority auth : user.getAuthorities()) {
			authority = auth.getAuthority();
			break;
		}
		if(authority.equals("Admin") || authority.equals("Investigador") || authority.equals("Asistente")) {
			model.addAttribute("roleName", authority);
			return "galerias";
	    } else {
	    	return "loginCliente";
	    }
	}
	
	@RequestMapping(value = "/homeCliente")
	public String homeCliente(@RequestParam Integer cp, Authentication user, Model model) {
		try {
			Campaign dbCampaign = campaignService.findById(cp).get();
			if (dbCampaign == null) {
				return "error";
			}
			User client = userService.findByUsername(user.getName());
			if(!user.getName().equals(dbCampaign.getAssignedUser()) && !client.getRoleName().equals("Admin")) {
				return "loginCliente";
			}
			model.addAttribute("campaign", dbCampaign);
			List<AnswerResponse> response = new ArrayList<AnswerResponse>();
			List<Question> questions = questionService.findByPollPollId(Integer.parseInt(dbCampaign.getInsightId()));
			List<ProhibitedWord> badWords = prohibitedWordService.findAll();
			for(Question question : questions) {
				Map<String, Integer> wordCounter = new HashMap<String, Integer>();
				AnswerResponse answerResponse = new AnswerResponse();
				answerResponse.setQuestionId(question.getQuestionId());
				answerResponse.setQuestionName(question.getQuestion());
				for(Answer answer : question.getAnswers()) {
					String [] wordsArray = answer.getAnswer().split(" ");
					for(String word : wordsArray) {
						boolean skipWord = false;
						for(ProhibitedWord prohibitedWord : badWords) {
							if(prohibitedWord.getWord().equals(word)) {
								skipWord = true;
								break;
							}
						}
						if(skipWord) {
							continue;
						}
						if(wordCounter.get(word) != null) {
							// existing word
							wordCounter.put(word, wordCounter.get(word) + 1);
						} else {
							wordCounter.put(word, 1);
						}
					}
					for(String key : wordCounter.keySet()) {
						Tag tag = new Tag();
						tag.setText(key);
						tag.setWeight(wordCounter.get(key));
						answerResponse.getTags().add(tag);
					}
				}
				response.add(answerResponse);
			}
			model.addAttribute("answers", response);
			return "homeCliente";
		} catch (Exception ex) {
			return "error";
		}

	}
	
}
