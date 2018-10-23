
//
//$(document).ready(function() {
//	
//
///* GET JSON RESPUESTAS PARA INSIGHT */
//
//		var vinsight = $("#hiddenInsightId").val();
//		var url= "/api/answer?pollId="+vinsight;
//		$.ajax({
//			type : "GET",
//			dataType : "json",
//			url : url,
//			success : function(data) {
//			
//				var tagsbox = '';
//				var f = 1;
//
//				
//
//					$('#tagCloud').jQCloud(data.tags);
//				
//				
//				
//				
//				
//				
////				$.each(
////						data,
////						function(i, item) {
////							var VquestionName = item.questionName;
////							console.log(VquestionName);
////							
////							var Vtags = item.tags;
////							console.log(Vtags);
////							
////							tagsbox += '<h2>' + VquestionName + '</h2><br><div class="col-md-10 col-centered justify-content-center demo'+ f +' jqcloud"></div><br><hr>';
////							
////							$(function() {
////								$('#demo'+ f +'').jqcloud(Vtags);
////						      });
////
////							f++;
////							
////						});
////				
////					$('#tagCloud').append(tagsbox);
//
//			},
//
//		});
//		
//})
//
//
////tagCloudHome

//$("#btnGenerateCloud").click(() => {
//
//	var words = [
//		  {word: "Lorem", weight: 13},
//		  {word: "Ipsum", weight: 10.5},
//		  {word: "Dolor", weight: 9.4},
//		  {word: "Sit", weight: 8},
//		  {word: "Amet", weight: 6.2},
//		  {word: "Consectetur", weight: 5},
//		  {word: "Adipiscing", weight: 5},
//		];
//
//		$('#wordcloud').jQCloud(words, {
//			width:500,
//			height:350
//		});
	
//});

