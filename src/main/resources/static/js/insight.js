/* funciones para crear nubes de palabras INSIGHT    */
let answers;

$(document).ready(function() {
	

/* GET JSON RESPUESTAS PARA INSIGHT */

		var vinsight = 6;
		var url= "/api/answer?pollId="+vinsight;
	
		$.ajax({
			type : "GET",
			dataType : "json",
			url : url,
			success : function(data) {
			
				var tagsbox = '';
				var f = 1;
				
				$.each(
						data,
						function(i, item) {
							var VquestionName = item.questionName;
							//console.log(VquestionName);
							var Vtags = item.tags;
							
							tagsbox += '<h2>' + VquestionName + '</h2><br><div class="col-md-10 col-centered justify-content-center demo'+ f +' jqcloud"></div><br><hr>';
							
							$('#demo'+ f +'').tagCloud(Vtags);

							f++;
							
						});
				
					$('#tagCloud').append(tagsbox);

			},

		});
		
})
