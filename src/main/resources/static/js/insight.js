/* GET JSON ENCUESTAS */


	pollId = 

	$.ajax({
			type : "GET",
			dataType : "json",
			url : "/api/poll",
			success : function(data) {
				
				
				//const selectedPoll = data.filter(x => x.pollId === pollId)[0];
				//console.log(selectedPoll);
				
				//var insightId = selectedPoll.insightId
				//alert(insightId);
					
					
					
				


				
			},

		});
	
	
	
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/api/word",
		success : function(data) {

		

		},

	});
	
	
	
	






var text_string = "extragrande gigante extragrande azul gigante rojo gigante de gigante color extragrande gigante marron extragrande naranja azul verde amarillo mediano rojo grande palabra1 mediano grande palabra2 palabra3 palabra3 pequeño extragrande mediano grande extragrande ";

      drawWordCloud(text_string);

      function drawWordCloud(text_string){
        var common = "";

        var word_count = {};

        var words = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
          if (words.length == 1){
            word_count[words[0]] = 1;
          } else {
            words.forEach(function(word){
              var word = word.toLowerCase();
              if (word != "" && common.indexOf(word)==-1 && word.length>1){
                if (word_count[word]){
                  word_count[word]++;
                } else {
                  word_count[word] = 1;
                }
              }
              
            })
          }

        var svg_location = "#cloudContainer";
        var width = ($(document).width())/2;
        var height = ($(document).height())/2;

        var fill = d3.scale.category20();

        var word_entries = d3.entries(word_count);
        console.log(word_entries);

        var xScale = d3.scale.linear()
           .domain([0, d3.max(word_entries, function(d) {
              return d.value;
            })
           ])
           .range([1,100]);

        d3.layout.cloud().size([width, height])
          .timeInterval(20)
          .words(word_entries)
          .fontSize(function(d) { return xScale(+d.value); })
          .text(function(d) { return d.key; })
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .font("Impact")
          .on("end", draw)
          .start();

        function draw(words) {
          d3.select(svg_location).append("svg")
              .attr("width", width)
              .attr("height", height)
            .append("g")
              .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
            .selectAll("text")
              .data(words)
            .enter().append("text")
              .style("font-size", function(d) { return xScale(d.value) + "px"; })
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return fill(i); })
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .text(function(d) { return d.key; });
        }

        d3.layout.cloud().stop();
      }