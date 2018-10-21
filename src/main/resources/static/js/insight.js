/* funciones para crear nubes de palabras INSIGHT    */
let answers;

$(document).ready(function() {
	

/* GET JSON RESPUESTAS PARA INSIGHT */


		
		var vinsight = 6;
		var url= "/api/answer?pollId="+vinsight;
		
		var words = [
			  {text: "Lorem", weight: 13},
			  {text: "Ipsum", weight: 10.5},
			  {text: "Dolor", weight: 9.4},
			  {text: "Sit", weight: 8},
			  {text: "Amet", weight: 6.2},
			  {text: "Consectetur", weight: 5},
			  {text: "Adipiscing", weight: 5},
			  /* ... */
			];
		
		
		$.ajax({
			type : "GET",
			dataType : "json",
			url : url,
			success : function(data) {

				var trHTML = '';
				$.each(
						data,
						function(i, item) {
							
							
							$('#tagCloud').jQCloud(words);
							
							
						});

				

				
				

			},

		});
		


	
	
	
})


