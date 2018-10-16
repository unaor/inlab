/* Funciones Vista Cliente   */


$(document).ready(function() {
	
	var starDate = 1;
	var endDate = 1;
	
	var urlVideo = "http://www.ustream.tv/embed/23615866?html5ui";
	$("#frameVideo").attr("src", urlVideo);
	
	var urlChat = "http://www.ustream.tv/socialstream/23609130?videos=0";
	
	var imgMediciones = "/img/encuestas/encuesta_demo03.jpg";
	var urlMediciones = "https://es.surveymonkey.com/results/SM-KF258B9HL/";
	$("#frameVisualCR").attr("src", imgMediciones);
	
	
	var urlInsight = 1;
	var urlVisualCR = "https://app.powerbi.com/view?r=eyJrIjoiNDhjOWQyZDEtOGZlZC00OTZkLWEzMWEtYjJlMjhiZjE2NDdjIiwidCI6IjEwYjFmZjIyLTExYTEtNDE1Mi05YWI1LTMxNzM1ZTVkMmQyNSIsImMiOjR9";
	$("#frameimgMediciones").attr("src", urlVisualCR);
	
	
	
	var urlRedes_timeline = "https://keyhole.co/embed/3rByew/timeline";
	var urlRedes_top_tweets = "https://keyhole.co/embed/3rByew/top_tweets";
	var urlRedes_topics = "https://keyhole.co/embed/3rByew/topics";
	var urlRedes_influencers = "https://keyhole.co/embed/3rByew/influencers";
	var urlRedes_top_domains = "https://keyhole.co/embed/3rByew/top_domains";
	var urlRedes_countries = "https://keyhole.co/embed/3rByew/countries";
	var urlRedes_demographics = "https://keyhole.co/embed/OjNl5X/demographics";
	var urlRedes_sources = "https://keyhole.co/embed/3rByew/sources";
	var urlRedes_posttype = "https://keyhole.co/embed/3rByew/posttype";
	
	var urlGaleria = 1;
	
	var imgEmociones = "https://www.youtube.com/embed/1PLhYHv8X-4?rel=0&amp;controls=0&amp;showinfo=0";
	var urlEmociones = "https://watson-visual-recognition-duo-dev.ng.bluemix.net/";
	$("#frameImgEmociones").attr("src", imgEmociones);
	$("#frameEmociones").attr("src", urlEmociones);	
	
	
	
}) // fin function



