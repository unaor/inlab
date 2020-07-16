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

				$room = campaigns[0].conferences[0].conferenceUrl;
				$('#frameVidConf').attr('src', $room);


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




//<div class="carousel-item active">
//<img class="d-block w-80" src="../img/gallery/1.jpg"
//	alt="First slide">
//</div>
//<div class="carousel-item">
//<img class="d-block w-100" src="../img/gallery/2.jpg"
//	alt="Second slide">
//</div>



