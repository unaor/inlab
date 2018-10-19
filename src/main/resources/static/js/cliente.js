/* Funciones Vista Cliente   */

let campaigns;

$(document).ready(function() {
	

	/* GET JSON CAMPAÑAS */

	$.ajax({
			type : "GET",
			dataType : "json",
			url : "/api/campaign",
			success : function(data) {

				campaigns = data;
				//console.log(data);

				var trHTML = '';
				$.each(
					data,
					function(i, item) {
						
						trHTML += '<tr id="'+ item.campaignId + '"><td>'
								+ item.campaignName
								+ '</td><td>'
								+ '<button id="btnCampaign" type="button" onclick="viewCampaign('+ item.campaignId +')" class="btn btn-info btn-icon btn-sm " data-original-title="Ver" title="Ver"><i class="fas fa-sign-in-alt"></i></button></td></tr>';
					});

				$('#tbCampaign').append(trHTML);
				

			},

		});

	
}) // fin function




	
// redirigir y cargar vista cliente
	
function viewCampaign(campaignId){
	
	const selectedCampaign = campaigns.filter(x => x.campaignId === campaignId)[0];
	document.location.href = "/homeCliente?cp=" + selectedCampaign.campaignId;
	
}	

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}



//function loadCampaign(){
//
//	//llenar iframe video
//	var urlVideo = "http://www.ustream.tv/embed/23615866?html5ui";
//	//$("#frameVideo").val(actualCampaign.videoUrl);
//	$("#frameVideo").attr("src", urlVideo);
//	
//	
//	//llenar iframe chat
//	var urlChat = "http://www.ustream.tv/socialstream/23609130?videos=0";
//	$("#frameChat").attr("src", urlChat);
//	
//	
//	//llenar iframe encuestas survey monkey
//	var imgMediciones = "/img/encuestas/encuesta_demo03.jpg";
//	var urlMediciones = "https://es.surveymonkey.com/results/SM-KF258B9HL/";
//	$("#frameimgMediciones").attr("src", imgMediciones);
//	$("#frameMediciones").attr("src", urlMediciones);
//	
//	
//	//llenar iframe Power BI
//	var urlVisualCR = "https://app.powerbi.com/view?r=eyJrIjoiNDhjOWQyZDEtOGZlZC00OTZkLWEzMWEtYjJlMjhiZjE2NDdjIiwidCI6IjEwYjFmZjIyLTExYTEtNDE1Mi05YWI1LTMxNzM1ZTVkMmQyNSIsImMiOjR9";
//	$("#frameVisualCR").attr("src", urlVisualCR);
//	
//	
//	//llenar iframe Redes Sociales Keyhole
//	var urlRedes_timeline = "https://keyhole.co/embed/3rByew/timeline";
//	$("#frameRedes_timeline").attr("src", urlRedes_timeline);
//	
//	var urlRedes_top_tweets = "https://keyhole.co/embed/3rByew/top_tweets";
//	$("#frameRedes_top_tweets").attr("src", urlRedes_top_tweets);
//	
//	var urlRedes_topics = "https://keyhole.co/embed/3rByew/topics";
//	$("#frameRedes_topics").attr("src", urlRedes_topics);
//	
//	var urlRedes_influencers = "https://keyhole.co/embed/3rByew/influencers";
//	$("#frameRedes_influencers").attr("src", urlRedes_influencers);
//	
//	var urlRedes_top_domains = "https://keyhole.co/embed/3rByew/top_domains";
//	$("#frameRedes_top_domains").attr("src", urlRedes_top_domains);
//	
//	var urlRedes_countries = "https://keyhole.co/embed/3rByew/countries";
//	$("#frameRedes_countries").attr("src", urlRedes_countries);
//	
//	var urlRedes_demographics = "https://keyhole.co/embed/OjNl5X/demographics";
//	$("#frameRedes_demographics").attr("src", urlRedes_demographics);
//	
//	var urlRedes_sources = "https://keyhole.co/embed/3rByew/sources";
//	$("#frameRedes_sources").attr("src", urlRedes_sources);
//	
//	var urlRedes_posttype = "https://keyhole.co/embed/3rByew/posttype";
//	$("#frameRedes_posttype").attr("src", urlRedes_posttype);
//	
//	
//	
//	//llenar iframe galería de imagenes
//		var urlGaleria = 1;
//	
//		
//		
//	//llenar iframe Emociones	
//	var imgEmociones = "https://www.youtube.com/embed/1PLhYHv8X-4?rel=0&amp;controls=0&amp;showinfo=0";
//	var urlEmociones = "https://watson-visual-recognition-duo-dev.ng.bluemix.net/";
//	$("#frameImgEmociones").attr("src", imgEmociones);
//	$("#frameEmociones").attr("src", urlEmociones);	
//	
//	
//	//llenar iframe nube insight
//	var urlInsight = 1;
//	
//	
//	
//	
//	
//	}	
	





//$("#btnCampaign").click(function(){
//
//	document.location.href = "/homeCliente?cp=" + item.campaignId + ";
//
//});
